export default function WelcomeSection() {
  return (
    <section className="bg-gray-50 py-20 font-body">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-6">
          <span className="inline-block bg-yellow-400 text-purple-800 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
            For the Love of the Game
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-purple-600 mb-6 uppercase leading-tight">
          Welcome to
          <br />
          All Stars Helsinki
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          All Stars Helsinki is an amateur football team driven by passion,
          teamwork, and the love of the game. Join our community of dedicated
          players and experience the thrill of competitive football in Helsinki.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/join"
            className="inline-block bg-purple-600 text-white font-bold py-4 px-10 rounded-full hover:bg-purple-700 transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            JOIN OUR TEAM
          </a>
          <a
            href="/matches"
            className="inline-block border-2 border-purple-600 text-purple-600 font-bold py-4 px-10 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 text-lg"
          >
            VIEW MATCHES
          </a>
        </div>
      </div>
    </section>
  );
}
