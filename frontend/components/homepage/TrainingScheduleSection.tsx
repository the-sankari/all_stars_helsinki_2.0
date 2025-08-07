export default function TrainingScheduleSection() {
  const weeklySchedule = [
    {
      day: "Tuesday",
      activity: "Technical Training",
      time: "18:00 - 20:00",
      highlight: false,
    },
    {
      day: "Thursday",
      activity: "Fitness & Conditioning",
      time: "19:00 - 20:30",
      highlight: false,
    },
    {
      day: "Saturday",
      activity: "Match Practice",
      time: "10:00 - 12:00",
      highlight: true,
    },
    {
      day: "Sunday",
      activity: "Team Building",
      time: "14:00 - 16:00",
      highlight: false,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-purple-600 mb-4 uppercase">
            Training Schedule
          </h2>
          <p className="text-gray-600 text-lg">
            Join us for our regular training sessions and improve your skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Weekly Schedule */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <h3 className="text-xl font-bold text-purple-800 mb-6 flex items-center">
              📅 Weekly Schedule
            </h3>
            <div className="space-y-4">
              {weeklySchedule.map((session, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center py-3 px-4 rounded-lg shadow-sm ${
                    session.highlight ? "bg-yellow-400" : "bg-white"
                  }`}
                >
                  <div>
                    <div
                      className={`font-medium ${
                        session.highlight ? "text-purple-800" : "text-gray-800"
                      }`}
                    >
                      {session.day}
                    </div>
                    <div
                      className={`text-sm ${
                        session.highlight ? "text-purple-700" : "text-gray-600"
                      }`}
                    >
                      {session.activity}
                    </div>
                  </div>
                  <div
                    className={`font-bold ${
                      session.highlight ? "text-purple-800" : "text-purple-600"
                    }`}
                  >
                    {session.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Training Info */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-xl font-bold text-purple-800 mb-6 flex items-center">
              ⚡ Next Training
            </h3>
            <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                Tomorrow - Tuesday
              </div>
              <div className="text-lg text-gray-700 mb-1">
                Technical Training Session
              </div>
              <div className="text-purple-600 font-medium mb-3">
                18:00 - 20:00
              </div>
              <div className="text-sm text-gray-600 mb-4">
                📍 Helsinki Sports Center, Field A<br />
                Focus: Ball control, passing drills, set pieces
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium inline-block">
                ✓ 18 players confirmed
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="mr-2">👕</span>
                Bring: Training kit, boots, water bottle
              </div>
              <div className="flex items-center">
                <span className="mr-2">🌡️</span>
                Weather: 18°C, partly cloudy
              </div>
              <div className="flex items-center">
                <span className="mr-2">🚗</span>
                Parking available on-site
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="/training"
            className="inline-block bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View Full Schedule
          </a>
        </div>
      </div>
    </section>
  );
}
