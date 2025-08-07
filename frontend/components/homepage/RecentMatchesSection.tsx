export default function RecentMatchesSection() {
  const matches = [
    {
      date: "Aug 1, 2025",
      result: "WIN",
      resultStyle: "bg-green-100 text-green-800",
      homeTeam: "All Stars Helsinki",
      homeStatus: "Home",
      awayTeam: "Helsinki United",
      awayStatus: "Away",
      score: "3 - 1",
      goals: "M.Virtanen (2), A.Korhonen",
      venue: "Helsinki Sports Center",
    },
    {
      date: "Jul 25, 2025",
      result: "WIN",
      resultStyle: "bg-green-100 text-green-800",
      homeTeam: "Espoo FC",
      homeStatus: "Home",
      awayTeam: "All Stars Helsinki",
      awayStatus: "Away",
      score: "1 - 2",
      goals: "J.Mäkinen, S.Lindström",
      venue: "Espoo Stadium",
    },
    {
      date: "Jul 18, 2025",
      result: "DRAW",
      resultStyle: "bg-yellow-100 text-yellow-800",
      homeTeam: "All Stars Helsinki",
      homeStatus: "Home",
      awayTeam: "Vantaa Wolves",
      awayStatus: "Away",
      score: "2 - 2",
      goals: "A.Korhonen, M.Virtanen",
      venue: "Helsinki Sports Center",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-purple-50 to-purple-100 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-purple-600 mb-4 uppercase">
            Recent Match Results
          </h2>
          <p className="text-gray-600 text-lg">
            Our latest performances on the field
          </p>
        </div>

        <div className="space-y-6">
          {matches.map((match, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">
                      {match.date}
                    </div>
                    <div
                      className={`${match.resultStyle} px-3 py-1 rounded-full text-sm font-bold`}
                    >
                      {match.result}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-gray-800">
                      {match.homeTeam}
                    </div>
                    <div className="text-sm text-gray-600">
                      {match.homeStatus}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-purple-600">
                    {match.score}
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-gray-800">
                      {match.awayTeam}
                    </div>
                    <div className="text-sm text-gray-600">
                      {match.awayStatus}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4 text-sm text-gray-600">
                  <div>⚽ Goals: {match.goals}</div>
                  <div>📍 {match.venue}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/matches"
            className="inline-block bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View All Matches
          </a>
        </div>
      </div>
    </section>
  );
}
