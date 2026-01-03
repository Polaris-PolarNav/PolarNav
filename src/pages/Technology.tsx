const Technology = () => {
  return (
    <main className="bg-slate-950 pt-28 text-white">
      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">
              Technology
            </p>
            <h1 className="mt-6 text-4xl font-semibold">
              Deterministic Recovery with AI-Inspired Forecasting
            </h1>
            <p className="mt-6 text-white/70">
              PolarNav blends deterministic signal modeling with predictive risk
              assessment. The system continuously evaluates GNSS health, space
              weather conditions, and magnetic distortion to anticipate
              navigation failures.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              System Layers
            </p>
            <ol className="mt-4 space-y-3 text-sm text-white/70">
              <li>1. Signal Health Estimator</li>
              <li>2. Distortion Risk Predictor</li>
              <li>3. Recovery State Machine</li>
              <li>4. Stabilized Corridor Monitor</li>
            </ol>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            {
              title: 'Signal Model',
              copy: 'Combines GNSS availability, magnetic interference, and time-varying space weather waveforms.',
            },
            {
              title: 'Recovery Logic',
              copy: 'Exponential correction dampens drift while maintaining a stable trajectory envelope.',
            },
            {
              title: 'State Machine',
              copy: 'Transitions through NOMINAL, DEGRADED, SIGNAL_LOST, RECOVERING, and STABILIZED.',
            },
            {
              title: 'ML Attachment Point',
              copy: 'Deterministic risk heuristics are isolated for future ML inference integration.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-slate-900/60 p-6"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-4 text-sm text-white/70">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Technology
