import type { SimSample, SimulationConfig } from '../engine/stateMachine'

interface SignalOverlayProps {
  config: SimulationConfig
  sample: SimSample | null
}

const SignalOverlay = ({ config, sample }: SignalOverlayProps) => {
  return (
    <div className="grid gap-3 rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-xs text-white/70">
      <div className="flex items-center justify-between">
        <span className="uppercase tracking-[0.3em] text-white/50">GNSS</span>
        <span className="text-white">
          {config.gnssEnabled ? 'ON' : 'OFF'}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="uppercase tracking-[0.3em] text-white/50">
          Magnetic
        </span>
        <span className="text-white">{config.magneticInterference}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="uppercase tracking-[0.3em] text-white/50">
          Space Weather
        </span>
        <span className="text-white">{config.spaceWeather.toFixed(2)}</span>
      </div>
      <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-white/60">
        Predicted Distortion Risk{' '}
        <span className="text-white">
          {sample ? sample.predictedRisk.toFixed(2) : '—'}
        </span>
      </div>
    </div>
  )
}

export default SignalOverlay
