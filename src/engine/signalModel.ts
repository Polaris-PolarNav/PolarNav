import { clamp01 } from './stateMachine'
import type { MagneticInterference, SimulationConfig } from './stateMachine'

const SPACE_WAVE_FREQ = 0.07
const SPACE_WAVE_OFFSET = 0.4
const SPACE_WAVE_AMPLITUDE = 0.6
const GNSS_DISABLED_FACTOR = 0.38

const MAGNETIC_FACTORS: Record<MagneticInterference, number> = {
  normal: 0.95,
  distorted: 0.72,
  severe: 0.48,
}

export interface SignalFactors {
  signalHealth: number
  stormWave: number
  gnssFactor: number
  magneticFactor: number
  predictedRisk: number
}

export const computeSignalFactors = (
  timeSec: number,
  config: SimulationConfig,
): SignalFactors => {
  const stormWave =
    SPACE_WAVE_OFFSET +
    SPACE_WAVE_AMPLITUDE * (0.5 + 0.5 * Math.sin(timeSec * SPACE_WAVE_FREQ))

  const gnssFactor = config.gnssEnabled ? 1 : GNSS_DISABLED_FACTOR
  const magneticFactor = MAGNETIC_FACTORS[config.magneticInterference]
  const spaceImpact = clamp01(config.spaceWeather * stormWave)

  const signalHealth = clamp01(
    gnssFactor * magneticFactor * (1 - spaceImpact),
  )

  const predictedRisk = clamp01(
    (1 - gnssFactor) * 0.6 +
      (1 - magneticFactor) * 0.5 +
      spaceImpact * 0.7,
  )

  return {
    signalHealth,
    stormWave,
    gnssFactor,
    magneticFactor,
    predictedRisk,
  }
}
