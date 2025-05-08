export default function About() {
  return (
    <section className="bg-light text-dark font-body py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6 text-center">
          About All Stars Helsinki
        </h1>

        {/* Team History */}
        <div className="mb-10">
          <h2 className="text-2xl font-heading text-secondary mb-2">
            Our History
          </h2>
          <p className="text-md leading-relaxed">
            Founded in 2022, All Stars Helsinki was built on a shared love for
            football and community. What began as a grassroots team has grown
            into a competitive squad that represents talent, teamwork, and
            determination.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-10">
          <h2 className="text-2xl font-heading text-secondary mb-2">
            Our Mission
          </h2>
          <p className="text-md leading-relaxed">
            To provide a platform for aspiring footballers to train, grow, and
            succeed — both on and off the pitch. We value commitment, respect,
            and unity in everything we do.
          </p>
        </div>

        {/* Coaching Team */}
        <div>
          <h2 className="text-2xl font-heading text-secondary mb-4">
            Coaching & Staff
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded shadow p-4">
              <h3 className="text-xl font-semibold text-primary">Coach Mr X</h3>
              <p className="text-sm text-gray-700">
                Head Coach – Tactical specialist, 10+ years experience coaching
                amateur and semi-pro teams in Finland.
              </p>
            </div>
            <div className="bg-white rounded shadow p-4">
              <h3 className="text-xl font-semibold text-primary">
                Coach MRS X
              </h3>
              <p className="text-sm text-gray-700">
                Fitness Coach – Focuses on player endurance, injury prevention,
                and physical development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
