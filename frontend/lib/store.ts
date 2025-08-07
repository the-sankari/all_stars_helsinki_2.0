import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "./features/playersSlice";
import matchesReducer from "./features/matchesSlice";
import newsReducer from "./features/newsSlice";
import teamStatsReducer from "./features/teamStatsSlice";
import galleryReducer from "./features/gallerySlice";
import sponsorsReducer from "./features/sponsorsSlice";
import socialMediaReducer from "./features/socialMediaSlice";
import testimonialsReducer from "./features/testimonialsSlice";
import trainingReducer from "./features/trainingSlice";

export const store = configureStore({
  reducer: {
    players: playersReducer,
    matches: matchesReducer,
    news: newsReducer,
    teamStats: teamStatsReducer,
    gallery: galleryReducer,
    sponsors: sponsorsReducer,
    socialMedia: socialMediaReducer,
    testimonials: testimonialsReducer,
    training: trainingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
