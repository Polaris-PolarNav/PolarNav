const Product = () => {
  return (
    <main className="bg-slate-950 pt-28 text-white">
      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">
              Product Overview
            </p>
            <h1 className="mt-6 text-4xl font-semibold">
              A Recovery System Built for Polar Routes
            </h1>
            <p className="mt-6 text-white/70">
              PolarNav continuously monitors GNSS, inertial, and magnetic
              conditions, predicting instability before it impacts position
              accuracy. When signals fail, the system blends sensor drift
              correction with adaptive recovery logic to keep aircraft within
              certified corridors.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Core Capabilities
            </p>
            <ul className="mt-4 space-y-4 text-sm text-white/70">
              <li>Autonomous GNSS loss detection within 2 seconds.</li>
              <li>Adaptive recovery tuned to polar storm signatures.</li>
              <li>Certified safety envelopes for commercial flight ops.</li>
              <li>Configurable for research and defense mission profiles.</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Cockpit-Ready',
              copy: 'Designed for quick crew comprehension with clear state transitions.',
            },
            {
              title: 'Deterministic Logic',
              copy: 'Predictable performance even in sensor-degraded conditions.',
            },
            {
              title: 'Fleet Analytics',
              copy: 'Compatible with existing avionics health monitoring systems.',
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

export default Product
