const Impact = () => {
  return (
    <main className="bg-slate-950 pt-28 text-white">
      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">
              Impact
            </p>
            <h1 className="mt-6 text-4xl font-semibold">
              Polar Operations with Fewer Diversions
            </h1>
            <p className="mt-6 text-white/70">
              PolarNav helps airlines and mission operators retain safe
              navigation during geomagnetic storms, reducing reroutes and
              maintaining fuel and schedule efficiency.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Mission Outcomes
            </p>
            <div className="mt-4 space-y-4 text-sm text-white/70">
              <div className="flex items-center justify-between">
                <span>Corridor Compliance</span>
                <span className="text-emerald-300">+38%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Reroute Reduction</span>
                <span className="text-emerald-300">-27%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Recovery Time</span>
                <span className="text-emerald-300">-41%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Commercial Aviation',
              copy: 'Confidence for long-haul polar corridors during peak storm cycles.',
            },
            {
              title: 'Research Missions',
              copy: 'Reliable navigation for sensor payloads and Arctic field deployments.',
            },
            {
              title: 'Defense Patrols',
              copy: 'Extended situational awareness in low-signal environments.',
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

export default Impact
