import { useMemo, useReducer } from 'react'
import ComparisonView from '../components/ComparisonView'
import ControlPanel from '../components/ControlPanel'
import MapView from '../components/MapView'
import MetricsPanel from '../components/MetricsPanel'
import SignalOverlay from '../components/SignalOverlay'
import { runSimulation } from '../engine/simulationStep'
import type {
  ComparisonMode,
  SimulationConfig,
  SimulatorStatus,
} from '../engine/stateMachine'

interface SimState {
  status: SimulatorStatus
  config: SimulationConfig
  comparisonMode: ComparisonMode
  results: ReturnType<typeof runSimulation>
}

type Action =
  | { type: 'updateConfig'; payload: Partial<SimulationConfig> }
  | { type: 'setComparison'; payload: ComparisonMode }
  | { type: 'applyResults'; payload: ReturnType<typeof runSimulation> }

const initialConfig: SimulationConfig = {
  routeId: 'transpolar',
  gnssEnabled: true,
  spaceWeather: 0.35,
  magneticInterference: 'normal',
}

const initState = (): SimState => ({
  status: 'IDLE',
  config: initialConfig,
  comparisonMode: 'split',
  results: runSimulation(initialConfig),
})

const reducer = (state: SimState, action: Action): SimState => {
  switch (action.type) {
    case 'updateConfig':
      return {
        ...state,
        status: 'CONFIGURED',
        config: { ...state.config, ...action.payload },
      }
    case 'setComparison':
      return { ...state, comparisonMode: action.payload }
    case 'applyResults':
      return { ...state, status: 'FINISHED', results: action.payload }
    default:
      return state
  }
}

const Simulator = () => {
  const [state, dispatch] = useReducer(reducer, undefined, initState)

  const handleRun = () => {
    const results = runSimulation(state.config)
    dispatch({ type: 'applyResults', payload: results })
  }

  const activeSample = useMemo(() => {
    const { withPolarNav, withoutPolarNav } = state.results
    if (state.comparisonMode === 'without') {
      return withoutPolarNav.samples[withoutPolarNav.samples.length - 1] ?? null
    }
    return withPolarNav.samples[withPolarNav.samples.length - 1] ?? null
  }, [state.results, state.comparisonMode])

  return (
    <main className="min-h-screen bg-slate-950 pt-24 text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-slate-900/60 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">
              Simulator
            </p>
            <p className="mt-2 text-lg font-semibold">
              PolarNav Recovery Scenario
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-white/60">
            <span>Status: {state.status}</span>
            <span>
              Mode:{' '}
              {state.comparisonMode === 'split'
                ? 'Split'
                : state.comparisonMode === 'with'
                  ? 'With PolarNav'
                  : 'Without PolarNav'}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-160px)]">
            <ControlPanel
              config={state.config}
              status={state.status}
              onConfigChange={(payload) =>
                dispatch({ type: 'updateConfig', payload })
              }
              onRun={handleRun}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
              <MapView
                config={state.config}
                withSamples={state.results.withPolarNav.samples}
                withoutSamples={state.results.withoutPolarNav.samples}
                mode={state.comparisonMode}
              />
              <SignalOverlay config={state.config} sample={activeSample} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-slate-900/60 px-6 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Comparison Mode
              </p>
              <ComparisonView
                mode={state.comparisonMode}
                onChange={(payload) =>
                  dispatch({ type: 'setComparison', payload })
                }
              />
            </div>
            <MetricsPanel
              mode={state.comparisonMode}
              withResult={state.results.withPolarNav}
              withoutResult={state.results.withoutPolarNav}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Simulator
