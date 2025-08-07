export default function TeamStatsSection() {
  const stats = [
    { number: "25+", label: "Active Players" },
    { number: "18", label: "Matches Won" },
    { number: "3", label: "Tournaments" },
    { number: "5", label: "Years Active" },
  ];

  return (
    <section className="bg-purple-600 py-16 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 uppercase">
            Our Achievements
          </h2>
          <p className="text-purple-200 text-lg">
            Numbers that speak for our dedication and teamwork
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
