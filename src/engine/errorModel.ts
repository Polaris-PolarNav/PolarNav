import { clamp01 } from './stateMachine'
import type { NavState, Vec2 } from './stateMachine'

const DRIFT_BASE_KM_PER_SEC = 0.06
const DRIFT_RISK_WEIGHT = 0.7
const DRIFT_LOST_MULTIPLIER = 1.45
const RECOVERY_DECAY_RATE = 0.14
const RECOVERY_PROGRESS_RATE = 0.032

const vectorMagnitude = (vec: Vec2) => Math.hypot(vec.x, vec.y)

const driftDirection = (timeSec: number, bias: number): Vec2 => {
  const angle = timeSec * 0.12 + bias * 1.9
  return { x: Math.cos(angle), y: Math.sin(angle) }
}

export interface ErrorUpdate {
  errVec: Vec2
  recoveryProgress: number
  errMagnitude: number
}

export const updateErrorWithout = (
  prevErr: Vec2,
  timeSec: number,
  dtSec: number,
  signalHealth: number,
  predictedRisk: number,
  navState: NavState,
): ErrorUpdate => {
  const base = DRIFT_BASE_KM_PER_SEC * (0.4 + (1 - signalHealth) * 1.6)
  const riskAmplifier = 1 + predictedRisk * DRIFT_RISK_WEIGHT
  const lostAmplifier = navState === 'SIGNAL_LOST' ? DRIFT_LOST_MULTIPLIER : 1
  const driftMag = base * riskAmplifier * lostAmplifier
  const direction = driftDirection(timeSec, predictedRisk)

  const errVec = {
    x: prevErr.x + direction.x * driftMag * dtSec,
    y: prevErr.y + direction.y * driftMag * dtSec,
  }

  return {
    errVec,
    recoveryProgress: 0,
    errMagnitude: vectorMagnitude(errVec),
  }
}

export const updateErrorWith = (
  prevErr: Vec2,
  timeSec: number,
  dtSec: number,
  signalHealth: number,
  predictedRisk: number,
  navState: NavState,
  prevRecovery: number,
): ErrorUpdate => {
  const base = DRIFT_BASE_KM_PER_SEC * (0.35 + (1 - signalHealth) * 1.3)
  const riskAmplifier = 1 + predictedRisk * 0.5
  const lostAmplifier = navState === 'SIGNAL_LOST' ? 1.1 : 1
  const driftMag = base * riskAmplifier * lostAmplifier
  const direction = driftDirection(timeSec, predictedRisk + 0.3)

  let errVec = {
    x: prevErr.x + direction.x * driftMag * dtSec,
    y: prevErr.y + direction.y * driftMag * dtSec,
  }

  const recovering = navState === 'RECOVERING' || navState === 'STABILIZED'
  if (recovering) {
    const decay = Math.exp(-RECOVERY_DECAY_RATE * dtSec)
    errVec = { x: errVec.x * decay, y: errVec.y * decay }
  }

  const recoveryProgress = recovering
    ? clamp01(prevRecovery + dtSec * RECOVERY_PROGRESS_RATE * (1 + signalHealth))
    : 0

  return {
    errVec,
    recoveryProgress,
    errMagnitude: vectorMagnitude(errVec),
  }
}
