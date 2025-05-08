const upcomingMatches = [
  {
    opponent: "Helsinki United",
    date: "May 4, 2024",
    time: "15:00",
    location: "Stadium Name",
  },
];

const pastMatches = [
  {
    opponent: "Team A",
    date: "Apr 20, 2024",
    time: "13:30",
    result: "2 - 1",
    location: "Stadium Name",
  },
  {
    opponent: "FC City",
    date: "Apr 12, 2024",
    time: "18:00",
    result: "1 - 1",
    location: "Stadium Name",
  },
  {
    opponent: "Northern FC",
    date: "Mar 30, 2024",
    time: "16:45",
    result: "3 - 0",
    location: "Stadium Name",
  },
];

function Logo() {
  return (
    <div className="flex flex-col items-center mr-6">
      <svg
        width="70"
        height="70"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="60,10 75,50 115,50 82,70 97,110 60,85 23,110 38,70 5,50 45,50"
          fill="#FFD700"
          stroke="#FFD700"
          strokeWidth="4"
        />
      </svg>
      <div className="text-white text-xl font-bold leading-tight tracking-widest mt-1">
        ALL STARS
      </div>
      <div className="text-white text-xs tracking-widest">HELSINKI</div>
    </div>
  );
}

export default function Matches() {
  return (
    <section className="bg-[#0A2342] font-body min-h-screen py-12 text-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end mb-12 gap-4 md:gap-8">
          <Logo />
          <div className="flex-1 text-center md:text-left">
            <div className="text-4xl md:text-6xl font-heading font-extrabold leading-tight">
              MATCH
              <br className="hidden md:block" /> SCHEDULE
            </div>
          </div>
        </div>

        {/* Upcoming Matches */}
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Upcoming Matches
        </h2>
        <div className="mb-10">
          {upcomingMatches.map((match, idx) => (
            <div
              key={idx}
              className="border-2 border-yellow-400 rounded-xl px-6 py-6 flex flex-col md:flex-row items-center justify-between mb-6 bg-[#0A2342]"
            >
              <div className="flex-1 text-2xl font-bold mb-4 md:mb-0">
                {match.opponent}
              </div>
              <div className="flex flex-col md:items-end gap-2 min-w-[180px]">
                <div className="flex items-center gap-2 text-lg">
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="#FFD700"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 2v4M8 2v4M3 10h18"
                      stroke="#FFD700"
                      strokeWidth="2"
                    />
                    <circle cx="12" cy="16" r="2" fill="#FFD700" />
                  </svg>
                  <span className="text-lg">{match.date}</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#FFD700"
                      strokeWidth="2"
                    />
                    <path d="M12 6v6l4 2" stroke="#FFD700" strokeWidth="2" />
                  </svg>
                  <span>{match.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Past Matches */}
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Past Matches
        </h2>
        <div className="space-y-6">
          {pastMatches.map((match, idx) => (
            <div
              key={idx}
              className="border-2 border-yellow-400 rounded-xl px-6 py-6 flex flex-col md:flex-row items-center justify-between bg-[#0A2342]"
            >
              <div className="flex-1">
                <div className="text-2xl font-bold mb-1">{match.opponent}</div>
                <div className="text-base text-yellow-100 mb-1">
                  {match.date} &nbsp; {match.time}
                </div>
              </div>
              <div className="flex flex-col md:items-end gap-2 min-w-[180px]">
                <div className="flex items-center gap-2 text-2xl font-bold">
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="#FFD700"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 2v4M8 2v4M3 10h18"
                      stroke="#FFD700"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>{match.result}</span>
                </div>
                <div className="text-base text-yellow-100">
                  {match.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
