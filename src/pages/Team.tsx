const Team = () => {
  return (
    <main className="bg-slate-950 pt-28 text-white">
      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">
              Team
            </p>
            <h1 className="mt-6 text-4xl font-semibold">
              Aerospace, Autonomy, and Safety Engineering
            </h1>
            <p className="mt-6 text-white/70">
              PolarNav is led by former flight test engineers, autonomy
              researchers, and avionics certification specialists with decades
              of polar operations experience.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Leadership Focus
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>Safety-critical navigation systems</li>
              <li>Regulatory compliance and validation</li>
              <li>Polar route operations</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              name: 'Dr. Keira Holm',
              role: 'CEO · Polar Ops',
            },
            {
              name: 'Soren Nakamoto',
              role: 'Chief Systems Architect',
            },
            {
              name: 'Adriana Volkov',
              role: 'Head of Safety Certification',
            },
          ].map((member) => (
            <div
              key={member.name}
              className="rounded-3xl border border-white/10 bg-slate-900/60 p-6"
            >
              <p className="text-lg font-semibold">{member.name}</p>
              <p className="mt-2 text-sm text-white/70">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Team
