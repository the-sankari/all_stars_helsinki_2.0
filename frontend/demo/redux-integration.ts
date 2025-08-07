// Demo script to show Redux integration with mock data
// Run: npm run dev to see the implementation

import { store } from "../lib/store";
import { fetchFeaturedPlayer } from "../lib/features/playersSlice";
import { fetchNextMatch } from "../lib/features/matchesSlice";
import { fetchLatestNews } from "../lib/features/newsSlice";
import { fetchTeamStats } from "../lib/features/teamStatsSlice";

console.log("🚀 All Stars Helsinki - Redux + Axios Integration Demo");

// Example of how to use the Redux store
export const demoReduxIntegration = async () => {
  try {
    console.log("📊 Initial State:", store.getState());

    // Fetch featured player
    console.log("🏃‍♂️ Fetching featured player...");
    await store.dispatch(fetchFeaturedPlayer());

    // Fetch next match
    console.log("⚽ Fetching next match...");
    await store.dispatch(fetchNextMatch());

    // Fetch latest news
    console.log("📰 Fetching latest news...");
    await store.dispatch(fetchLatestNews(3));

    // Fetch team stats
    console.log("📈 Fetching team stats...");
    await store.dispatch(fetchTeamStats());

    console.log("✅ Final State:", store.getState());
    console.log("🎉 Redux integration working with mock data!");
  } catch (error) {
    console.error("❌ Error in Redux integration:", error);
  }
};

// Example data structure for reference
export const dataStructureExample = {
  players: {
    featuredPlayer: "Mikael Virtanen - Forward with 12 goals",
    loading: false,
    error: null,
  },
  matches: {
    nextMatch: "All Stars Helsinki vs Helsinki United - Aug 15, 2025",
    recentMatches: "3 recent matches loaded",
    loading: false,
  },
  news: {
    latestNews: "3 latest articles loaded",
    loading: false,
  },
  teamStats: {
    season2024: "2nd place, 41 points, 20 matches played",
    loading: false,
  },
};

console.log("📋 Expected Data Structure:", dataStructureExample);
