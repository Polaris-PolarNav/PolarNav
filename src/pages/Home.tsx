import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main className="relative overflow-hidden bg-slate-950 pt-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(125,211,252,0.12),_transparent_50%)]" />
      <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">
              PolarNav Navigation Recovery System
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              Safe Polar Aviation. No Signals Required.
            </h1>
            <p className="mt-6 text-lg text-white/70">
              AI-powered navigation recovery for polar routes when GNSS and
              magnetic signals fail.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/simulator"
                className="rounded-full bg-cyan-300 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-cyan-200"
              >
                Launch Simulator
              </Link>
              <Link
                to="/technology"
                className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white/80 transition hover:border-white/60"
              >
                Technology
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Polar Flight Path
            </p>
            <div className="mt-4 h-64 w-full rounded-2xl bg-slate-950/80 p-4">
              <svg className="h-full w-full" viewBox="0 0 360 240">
                <circle
                  cx="180"
                  cy="120"
                  r="86"
                  fill="none"
                  stroke="rgba(148,163,184,0.2)"
                  strokeWidth="2"
                />
                <path
                  className="flight-path"
                  d="M 48 168 C 120 40, 220 40, 312 120"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="3"
                />
                <circle cx="180" cy="120" r="6" fill="#22d3ee" />
              </svg>
            </div>
            <div className="mt-5 grid gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span>GNSS Loss</span>
                <span className="text-rose-300">Detected</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span>Recovery</span>
                <span className="text-emerald-300">Stabilized</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Signal-Loss Prediction',
              copy: 'Forecasts distortion risk with deterministic AI models tuned to polar weather.',
            },
            {
              title: 'Inertial Recovery',
              copy: 'Reconstructs aircraft position using onboard sensors and learned bias correction.',
            },
            {
              title: 'Safety Envelope',
              copy: 'Maintains corridor compliance with real-time recovery verification.',
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

export default Home
