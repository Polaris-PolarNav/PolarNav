import { listRoutes } from '../engine/routes'
import type { SimulationConfig, SimulatorStatus } from '../engine/stateMachine'

interface ControlPanelProps {
  config: SimulationConfig
  status: SimulatorStatus
  onConfigChange: (next: Partial<SimulationConfig>) => void
  onRun: () => void
}

const ControlPanel = ({
  config,
  status,
  onConfigChange,
  onRun,
}: ControlPanelProps) => {
  const routes = listRoutes()

  return (
    <aside className="flex h-full flex-col gap-6 border-r border-white/10 bg-slate-950/70 px-5 py-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          Flight Route
        </p>
        <div className="mt-4 space-y-3">
          {routes.map((route) => (
            <label
              key={route.id}
              className="flex cursor-pointer items-center gap-3 text-sm text-white/80"
            >
              <input
                type="radio"
                name="route"
                value={route.id}
                checked={config.routeId === route.id}
                onChange={() => onConfigChange({ routeId: route.id })}
                className="h-4 w-4 accent-cyan-300"
              />
              <span>{route.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          GNSS Availability
        </p>
        <label className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
          <span>GNSS Signal</span>
          <input
            type="checkbox"
            checked={config.gnssEnabled}
            onChange={(event) =>
              onConfigChange({ gnssEnabled: event.target.checked })
            }
            className="h-4 w-8 accent-emerald-300"
          />
        </label>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          Space Weather
        </p>
        <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-4">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={config.spaceWeather}
            onChange={(event) =>
              onConfigChange({ spaceWeather: Number(event.target.value) })
            }
            className="w-full accent-cyan-300"
          />
          <div className="mt-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
            <span>Quiet</span>
            <span>{config.spaceWeather.toFixed(2)}</span>
            <span>Storm</span>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          Magnetic Interference
        </p>
        <select
          value={config.magneticInterference}
          onChange={(event) =>
            onConfigChange({
              magneticInterference: event.target
                .value as SimulationConfig['magneticInterference'],
            })
          }
          className="mt-3 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-3 text-sm text-white/80"
        >
          <option value="normal">normal</option>
          <option value="distorted">distorted</option>
          <option value="severe">severe</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onRun}
        className="mt-auto rounded-xl bg-cyan-300 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-cyan-200"
      >
        {status === 'RUNNING' ? 'Running…' : 'Run Simulation'}
      </button>
    </aside>
  )
}

export default ControlPanel
