export default function PlayerSpotlightSection() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-purple-700 py-20 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-yellow-400 text-purple-800 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
            Player of the Month
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 uppercase">
            August Spotlight
          </h2>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="w-32 h-32 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">
              ⭐
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Mikael Virtanen
            </h3>
            <p className="text-yellow-400 text-lg font-medium">Midfielder</p>
          </div>
          <p className="text-lg text-purple-100 mb-6 leading-relaxed max-w-2xl mx-auto">
            "Mikael has shown exceptional leadership and skill this month,
            scoring 4 goals and providing crucial assists. His dedication during
            training and positive attitude make him an inspiration to the entire
            team."
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">4</div>
              <div className="text-sm text-purple-200">Goals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">6</div>
              <div className="text-sm text-purple-200">Assists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">12</div>
              <div className="text-sm text-purple-200">Matches</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
