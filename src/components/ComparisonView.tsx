import type { ComparisonMode } from '../engine/stateMachine'

interface ComparisonViewProps {
  mode: ComparisonMode
  onChange: (mode: ComparisonMode) => void
}

const buttonClass = (active: boolean) =>
  [
    'rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.26em] transition',
    active
      ? 'border-cyan-300 bg-cyan-300 text-slate-900'
      : 'border-white/10 text-white/70 hover:border-white/40',
  ].join(' ')

const ComparisonView = ({ mode, onChange }: ComparisonViewProps) => (
  <div className="flex flex-wrap gap-3">
    <button
      type="button"
      onClick={() => onChange('without')}
      className={buttonClass(mode === 'without')}
    >
      Without PolarNav
    </button>
    <button
      type="button"
      onClick={() => onChange('with')}
      className={buttonClass(mode === 'with')}
    >
      With PolarNav
    </button>
    <button
      type="button"
      onClick={() => onChange('split')}
      className={buttonClass(mode === 'split')}
    >
      Split View
    </button>
  </div>
)

export default ComparisonView
