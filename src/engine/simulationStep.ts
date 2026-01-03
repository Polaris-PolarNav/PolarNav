import { clamp01, deriveNavState } from './stateMachine'
import type {
  NavState,
  RunningState,
  SimSample,
  SimulationConfig,
  SimulationResult,
  Vec2,
} from './stateMachine'
import { computeSignalFactors } from './signalModel'
import { getTruePosition } from './routes'
import { updateErrorWith, updateErrorWithout } from './errorModel'

export const SIMULATION_CONSTANTS = {
  durationSec: 320,
  timeStepSec: 1,
  safetyErrorKm: 18,
  recoveryTargetKm: 4,
}

const createInitialState = (): RunningState => ({
  timeSec: 0,
  errVec: { x: 0, y: 0 },
  recoveryProgress: 0,
  navState: 'NOMINAL',
})

const applyEstPos = (truePos: Vec2, errVec: Vec2): Vec2 => ({
  x: truePos.x + errVec.x,
  y: truePos.y + errVec.y,
})

const computeRecoveryTime = (
  samples: SimSample[],
): number | null => {
  const lostIndex = samples.findIndex(
    (sample) => sample.navState === 'SIGNAL_LOST',
  )
  if (lostIndex === -1) return null

  const recoveredSample = samples.slice(lostIndex).find((sample) => {
    const stabilized = sample.navState === 'STABILIZED'
    const lowError = sample.errMagnitude <= SIMULATION_CONSTANTS.recoveryTargetKm
    return stabilized || lowError
  })

  return recoveredSample ? recoveredSample.timeSec - samples[lostIndex].timeSec : null
}

const computeSafetyStatus = (maxErrorKm: number): 'maintained' | 'violated' =>
  maxErrorKm <= SIMULATION_CONSTANTS.safetyErrorKm ? 'maintained' : 'violated'

export const runSimulation = (
  config: SimulationConfig,
): {
  withPolarNav: SimulationResult
  withoutPolarNav: SimulationResult
} => {
  const samplesWith: SimSample[] = []
  const samplesWithout: SimSample[] = []

  let stateWith = createInitialState()
  let stateWithout = createInitialState()

  const steps = Math.floor(
    SIMULATION_CONSTANTS.durationSec / SIMULATION_CONSTANTS.timeStepSec,
  )

  for (let step = 0; step <= steps; step += 1) {
    const timeSec = step * SIMULATION_CONSTANTS.timeStepSec
    const progress = clamp01(timeSec / SIMULATION_CONSTANTS.durationSec)
    const truePos = getTruePosition(config.routeId, progress)

    const {
      signalHealth,
      predictedRisk,
    } = computeSignalFactors(timeSec, config)
    // Placeholder: this deterministic risk model is where an ML predictor could attach later.
    const navStateWithout: NavState = deriveNavState(
      'without',
      signalHealth,
      stateWithout.navState,
      stateWithout.recoveryProgress,
    )
    const navStateWith: NavState = deriveNavState(
      'with',
      signalHealth,
      stateWith.navState,
      stateWith.recoveryProgress,
    )

    const updateWithout = updateErrorWithout(
      stateWithout.errVec,
      timeSec,
      SIMULATION_CONSTANTS.timeStepSec,
      signalHealth,
      predictedRisk,
      navStateWithout,
    )
    const updateWith = updateErrorWith(
      stateWith.errVec,
      timeSec,
      SIMULATION_CONSTANTS.timeStepSec,
      signalHealth,
      predictedRisk,
      navStateWith,
      stateWith.recoveryProgress,
    )

    stateWithout = {
      timeSec,
      errVec: updateWithout.errVec,
      recoveryProgress: updateWithout.recoveryProgress,
      navState: navStateWithout,
    }
    stateWith = {
      timeSec,
      errVec: updateWith.errVec,
      recoveryProgress: updateWith.recoveryProgress,
      navState: navStateWith,
    }

    samplesWithout.push({
      timeSec,
      truePos,
      errVec: updateWithout.errVec,
      errMagnitude: updateWithout.errMagnitude,
      estPos: applyEstPos(truePos, updateWithout.errVec),
      signalHealth,
      navState: navStateWithout,
      recoveryProgress: updateWithout.recoveryProgress,
      predictedRisk,
    })

    samplesWith.push({
      timeSec,
      truePos,
      errVec: updateWith.errVec,
      errMagnitude: updateWith.errMagnitude,
      estPos: applyEstPos(truePos, updateWith.errVec),
      signalHealth,
      navState: navStateWith,
      recoveryProgress: updateWith.recoveryProgress,
      predictedRisk,
    })
  }

  const maxErrorWith = Math.max(...samplesWith.map((s) => s.errMagnitude))
  const maxErrorWithout = Math.max(...samplesWithout.map((s) => s.errMagnitude))

  return {
    withPolarNav: {
      samples: samplesWith,
      maxErrorKm: maxErrorWith,
      recoveryTimeSec: computeRecoveryTime(samplesWith),
      safetyStatus: computeSafetyStatus(maxErrorWith),
    },
    withoutPolarNav: {
      samples: samplesWithout,
      maxErrorKm: maxErrorWithout,
      recoveryTimeSec: computeRecoveryTime(samplesWithout),
      safetyStatus: computeSafetyStatus(maxErrorWithout),
    },
  }
}
