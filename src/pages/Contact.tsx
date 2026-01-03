const Contact = () => {
  return (
    <main className="bg-slate-950 pt-28 text-white">
      <section className="mx-auto w-full max-w-5xl px-6 pb-20">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">
              Contact
            </p>
            <h1 className="mt-6 text-4xl font-semibold">
              Plan Your PolarNav Deployment
            </h1>
            <p className="mt-6 text-white/70">
              Reach out to schedule a demo, review certification plans, or
              integrate PolarNav into your fleet operations.
            </p>
          </div>
          <form className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Name
              <input
                type="text"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white/80"
                placeholder="Captain Morgan"
              />
            </label>
            <label className="mt-4 block text-xs uppercase tracking-[0.3em] text-white/50">
              Email
              <input
                type="email"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white/80"
                placeholder="ops@carrier.com"
              />
            </label>
            <label className="mt-4 block text-xs uppercase tracking-[0.3em] text-white/50">
              Mission Profile
              <select className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white/80">
                <option>Commercial Aviation</option>
                <option>Research & Science</option>
                <option>Defense Operations</option>
              </select>
            </label>
            <label className="mt-4 block text-xs uppercase tracking-[0.3em] text-white/50">
              Message
              <textarea
                rows={4}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white/80"
                placeholder="Share your route plans and certification needs."
              />
            </label>
            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-cyan-300 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-cyan-200"
            >
              Send Request
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Contact
