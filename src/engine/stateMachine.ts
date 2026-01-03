export type SimulatorStatus =
  | 'IDLE'
  | 'CONFIGURED'
  | 'RUNNING'
  | 'PAUSED'
  | 'FINISHED'

export type NavState =
  | 'NOMINAL'
  | 'DEGRADED'
  | 'SIGNAL_LOST'
  | 'RECOVERING'
  | 'STABILIZED'

export type ComparisonMode = 'split' | 'with' | 'without'

export type MagneticInterference = 'normal' | 'distorted' | 'severe'
export type RouteId = 'transpolar' | 'research' | 'patrol'

export interface Vec2 {
  x: number
  y: number
}

export interface SimulationConfig {
  routeId: RouteId
  gnssEnabled: boolean
  spaceWeather: number
  magneticInterference: MagneticInterference
}

export interface SimSample {
  timeSec: number
  truePos: Vec2
  estPos: Vec2
  errVec: Vec2
  errMagnitude: number
  signalHealth: number
  navState: NavState
  recoveryProgress: number
  predictedRisk: number
}

export interface SimulationResult {
  samples: SimSample[]
  maxErrorKm: number
  recoveryTimeSec: number | null
  safetyStatus: 'maintained' | 'violated'
}

export interface RunningState {
  timeSec: number
  errVec: Vec2
  recoveryProgress: number
  navState: NavState
}

export const NAV_THRESHOLDS = {
  degraded: 0.75,
  lost: 0.45,
  recover: 0.6,
  stabilized: 0.85,
}

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export const deriveNavState = (
  mode: 'with' | 'without',
  signalHealth: number,
  prevState: NavState,
  recoveryProgress: number,
): NavState => {
  if (mode === 'without') {
    if (signalHealth < NAV_THRESHOLDS.lost) return 'SIGNAL_LOST'
    if (signalHealth < NAV_THRESHOLDS.degraded) return 'DEGRADED'
    return 'NOMINAL'
  }

  if (prevState === 'RECOVERING' && recoveryProgress >= 1) {
    return 'STABILIZED'
  }
  if (signalHealth < NAV_THRESHOLDS.lost) return 'SIGNAL_LOST'
  if (prevState === 'SIGNAL_LOST' && signalHealth >= NAV_THRESHOLDS.recover) {
    return 'RECOVERING'
  }
  if (signalHealth < NAV_THRESHOLDS.degraded) return 'DEGRADED'
  if (signalHealth >= NAV_THRESHOLDS.stabilized) return 'STABILIZED'
  return 'NOMINAL'
}
