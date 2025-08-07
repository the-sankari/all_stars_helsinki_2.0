"use client";

import { useAppSelector } from "../../lib/hooks";
import type { RootState } from "../../lib/store";
import type { Match } from "../../lib/types";

interface FormattedMatch {
  date: string;
  result: string;
  resultStyle: string;
  homeTeam: string;
  homeStatus: string;
  awayTeam: string;
  awayStatus: string;
  score: string;
  goals: string;
  venue: string;
}

interface MatchesState {
  recentMatches: Match[];
  loading: boolean;
  error: string | null;
}

export default function RecentMatchesSection() {
  const { recentMatches, loading, error } = useAppSelector(
    (state: RootState) => state.matches
  ) as MatchesState;

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Helper function to format match data for display
  const formatMatch = (match: Match) => {
    const isHomeGame = match.isHomeGame;
    const homeTeam = isHomeGame ? "All Stars Helsinki" : match.opponent;
    const awayTeam = isHomeGame ? match.opponent : "All Stars Helsinki";

    let result = "TBD";
    let resultStyle = "bg-gray-100 text-gray-800";
    let score = "- : -";

    if (match.result) {
      if (match.result.winner === "home") {
        result = isHomeGame ? "WIN" : "LOSS";
        resultStyle = isHomeGame
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800";
      } else if (match.result.winner === "away") {
        result = isHomeGame ? "LOSS" : "WIN";
        resultStyle = isHomeGame
          ? "bg-red-100 text-red-800"
          : "bg-green-100 text-green-800";
      } else {
        result = "DRAW";
        resultStyle = "bg-yellow-100 text-yellow-800";
      }
      score = match.result.finalScore;
    }

    // Extract goal scorers from events
    const goalEvents =
      match.events?.filter((event) => event.type === "goal") || [];
    const goals =
      goalEvents.length > 0
        ? goalEvents
            .map((event) => `${event.minute}' ${event.description}`)
            .join(", ")
        : "No goals recorded";

    return {
      date: formatDate(match.dateTime),
      result,
      resultStyle,
      homeTeam,
      homeStatus: "Home",
      awayTeam,
      awayStatus: "Away",
      score,
      goals,
      venue: match.venue?.name || match.location,
    };
  };

  // Use real data from Redux store
  const displayMatches = recentMatches.map(formatMatch);

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
          {loading ? (
            // Loading skeleton
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="animate-pulse">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center space-x-6 mb-4 md:mb-0">
                      <div className="text-center">
                        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                        <div className="h-6 bg-gray-300 rounded w-16"></div>
                      </div>
                      <div className="text-center">
                        <div className="h-5 bg-gray-300 rounded w-32 mb-1"></div>
                        <div className="h-3 bg-gray-300 rounded w-16"></div>
                      </div>
                      <div className="h-8 bg-gray-300 rounded w-16"></div>
                      <div className="text-center">
                        <div className="h-5 bg-gray-300 rounded w-32 mb-1"></div>
                        <div className="h-3 bg-gray-300 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="h-4 bg-gray-300 rounded w-32"></div>
                      <div className="h-4 bg-gray-300 rounded w-40"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 text-5xl mb-4">⚽</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Unable to Load Match Results
              </h3>
              <p className="text-gray-600 mb-4">
                We&apos;re having trouble loading recent matches right now.
              </p>
              <p className="text-sm text-red-600">Error: {error}</p>
            </div>
          ) : displayMatches.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Recent Matches
              </h3>
              <p className="text-gray-600">
                Check back soon for our latest match results!
              </p>
            </div>
          ) : (
            displayMatches.map((match: FormattedMatch, index: number) => (
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
            ))
          )}
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
