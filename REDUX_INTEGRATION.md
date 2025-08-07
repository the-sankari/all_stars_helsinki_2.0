# Redux + Axios Integration - All Stars Helsinki

## 📊 Overview

This implementation integrates **Redux Toolkit** and **Axios** with the All Stars Helsinki homepage, using the `mock_database.json` file as the data source.

## 🗂️ File Structure

```
frontend/
├── lib/
│   ├── store.ts                 # Redux store configuration
│   ├── hooks.ts                 # Typed Redux hooks
│   ├── types.ts                 # TypeScript interfaces
│   ├── api.ts                   # Axios API service with mock data
│   └── features/                # Redux slices
│       ├── playersSlice.ts      # Player state management
│       ├── matchesSlice.ts      # Match state management
│       ├── newsSlice.ts         # News state management
│       ├── teamStatsSlice.ts    # Team stats state
│       ├── gallerySlice.ts      # Gallery state
│       ├── sponsorsSlice.ts     # Sponsors state
│       ├── socialMediaSlice.ts  # Social media state
│       ├── testimonialsSlice.ts # Testimonials state
│       └── trainingSlice.ts     # Training sessions state
├── app/
│   ├── layout.tsx               # Updated with Redux Provider
│   ├── page.tsx                 # Homepage with Redux data fetching
│   └── components/
│       └── ReduxProvider.tsx    # Redux provider wrapper
├── components/
│   └── homepage/
│       ├── HeroSection.tsx      # Updated with Redux (next match)
│       └── PlayerSpotlightSection.tsx # Updated with Redux (featured player)
└── mock_database.json           # Renamed from sample_data.json
```

## 🚀 Key Features

### 1. **Redux Store Configuration**

- **Redux Toolkit** for efficient state management
- **TypeScript** support with proper typing
- **Multiple slices** for different data domains
- **Async thunks** for API calls

### 2. **API Service with Mock Data**

- **Axios** instance configured for API calls
- **Mock responses** using `mock_database.json`
- **Simulated delays** for realistic loading states
- **Error handling** and response formatting

### 3. **Homepage Integration**

- **Automatic data fetching** on component mount
- **Loading states** and error handling
- **Real-time updates** from Redux store
- **TypeScript type safety**

## 📋 Available Data & API Endpoints

### Players

```typescript
// Redux Actions
dispatch(fetchPlayers()); // Get all players
dispatch(fetchFeaturedPlayer()); // Get featured player
dispatch(fetchPlayerById(id)); // Get specific player

// API Methods
apiService.getPlayers(); // All players
apiService.getFeaturedPlayer(); // Featured player
apiService.getPlayerById(id); // Player by ID
```

### Matches

```typescript
// Redux Actions
dispatch(fetchMatches())           // All matches
dispatch(fetchNextMatch())         // Next upcoming match
dispatch(fetchUpcomingMatches())   // All upcoming matches
dispatch(fetchRecentMatches())     // Recent completed matches

// API Methods
apiService.getMatches()            // All matches
apiService.getNextMatch()          // Next match
apiService.getUpcomingMatches()    // Upcoming matches
apiService.getRecentMatches())     // Recent matches
```

### News

```typescript
// Redux Actions
dispatch(fetchNews())              // All published news
dispatch(fetchLatestNews(3))       // Latest 3 articles

// API Methods
apiService.getPublishedNews()      // Published articles
apiService.getLatestNews(limit))   // Latest articles
```

### Team Stats

```typescript
// Redux Actions
dispatch(fetchTeamStats()); // Current season stats

// API Methods
apiService.getTeamStats(); // Team statistics
```

### Other Collections

- **Gallery**: `fetchGallery()`, `fetchFeaturedGallery()`
- **Sponsors**: `fetchSponsors()`
- **Social Media**: `fetchLatestSocialPosts()`
- **Testimonials**: `fetchFeaturedTestimonials()`
- **Training**: `fetchUpcomingTraining()`

## 🛠️ Usage Examples

### 1. **Component with Redux Data**

```typescript
"use client";

import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import { fetchFeaturedPlayer } from "../../lib/features/playersSlice";

export default function PlayerComponent() {
  const dispatch = useAppDispatch();
  const { featuredPlayer, loading, error } = useAppSelector(
    (state) => state.players
  );

  useEffect(() => {
    dispatch(fetchFeaturedPlayer());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!featuredPlayer) return <div>No player found</div>;

  return (
    <div>
      <h2>{featuredPlayer.name}</h2>
      <p>Position: {featuredPlayer.position}</p>
      <p>Goals: {featuredPlayer.stats.goals}</p>
    </div>
  );
}
```

### 2. **API Service Usage**

```typescript
import { apiService } from "../lib/api";

// Direct API calls (outside of Redux)
const players = await apiService.getPlayers();
const nextMatch = await apiService.getNextMatch();
const latestNews = await apiService.getLatestNews(5);
```

### 3. **Newsletter Subscription**

```typescript
const handleSubscribe = async (email: string) => {
  try {
    const result = await apiService.subscribeNewsletter(email);
    if (result.success) {
      toast.success(result.message);
    }
  } catch (error) {
    toast.error("Subscription failed");
  }
};
```

## 📊 Mock Data Structure

The `mock_database.json` contains realistic data for:

- **4 Players** including Mikael Virtanen (featured)
- **3 Matches** (1 upcoming championship final, 2 recent results)
- **3 News Articles** (championship prep, facility news, player spotlight)
- **Team Stats** (2024 season: 2nd place, 41 points)
- **2 Training Sessions** (championship prep, recovery)
- **2 Gallery Items** (training photos, match celebration)
- **2 Sponsors** (Helsinki Sports Store, Nordic Nutrition)
- **2 Social Media Posts** (Instagram training, Facebook announcement)
- **3 Testimonials** (fan reviews)
- **2 Newsletter Subscribers**

## 🎯 Homepage Components Using Redux

### 1. **HeroSection**

- Displays next match from Redux store
- Shows loading state while fetching
- Falls back to "No upcoming matches" if none available

### 2. **PlayerSpotlightSection**

- Shows featured player (Mikael Virtanen)
- Displays player stats, bio, and achievements
- Includes loading and error states

### 3. **Ready for Integration**

- **TeamStatsSection**: Use `teamStats` slice
- **NewsSection**: Use `latestNews` from news slice
- **RecentMatchesSection**: Use `recentMatches` slice
- **SocialMediaSection**: Use `latestPosts` slice
- **SponsorsSection**: Use `sponsors` slice
- **TestimonialsSection**: Use `featuredTestimonials` slice

## 🚧 Development Commands

```bash
# Install dependencies (already installed)
npm install

# Start development server
npm run dev

# Check TypeScript errors
npx tsc --noEmit

# Run linting
npm run lint
```

## 🔄 Data Flow

1. **Page Load**: Homepage component mounts
2. **Data Fetching**: Redux actions dispatched for all sections
3. **API Calls**: API service reads from `mock_database.json`
4. **State Updates**: Redux store updated with fetched data
5. **Component Renders**: Components re-render with new data
6. **Loading States**: Show loading indicators during fetch
7. **Error Handling**: Display error messages if requests fail

## 🎉 Benefits

- **Type Safety**: Full TypeScript support
- **Centralized State**: All data managed in Redux store
- **Reusable API**: Service can be used across components
- **Loading States**: Built-in loading and error handling
- **Mock Data**: Realistic data for development and testing
- **Scalable**: Easy to switch from mock to real API
- **Performance**: Efficient re-renders with Redux selectors

## 🔮 Next Steps

1. **Add More Components**: Update remaining homepage sections
2. **Real API Integration**: Replace mock service with actual backend
3. **Caching**: Add RTK Query for advanced caching
4. **Persistence**: Add Redux Persist for state persistence
5. **Real-time Updates**: Add WebSocket integration
6. **Optimizations**: Add memoization and performance optimizations

The Redux + Axios integration is now ready and working with realistic mock data from the `mock_database.json` file!
