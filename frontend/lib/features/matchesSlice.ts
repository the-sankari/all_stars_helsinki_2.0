import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Match, LoadingState } from "../types";
import { apiService } from "../api";

interface MatchesState extends LoadingState {
  matches: Match[];
  upcomingMatches: Match[];
  recentMatches: Match[];
  nextMatch: Match | null;
}

const initialState: MatchesState = {
  matches: [],
  upcomingMatches: [],
  recentMatches: [],
  nextMatch: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches",
  async (_, { rejectWithValue }) => {
    try {
      const matches = await apiService.getMatches();
      return matches;
    } catch (error) {
      return rejectWithValue("Failed to fetch matches");
    }
  }
);

export const fetchUpcomingMatches = createAsyncThunk(
  "matches/fetchUpcomingMatches",
  async (_, { rejectWithValue }) => {
    try {
      const matches = await apiService.getUpcomingMatches();
      return matches;
    } catch (error) {
      return rejectWithValue("Failed to fetch upcoming matches");
    }
  }
);

export const fetchRecentMatches = createAsyncThunk(
  "matches/fetchRecentMatches",
  async (_, { rejectWithValue }) => {
    try {
      const matches = await apiService.getRecentMatches();
      return matches;
    } catch (error) {
      return rejectWithValue("Failed to fetch recent matches");
    }
  }
);

export const fetchNextMatch = createAsyncThunk(
  "matches/fetchNextMatch",
  async (_, { rejectWithValue }) => {
    try {
      const match = await apiService.getNextMatch();
      return match;
    } catch (error) {
      return rejectWithValue("Failed to fetch next match");
    }
  }
);

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all matches
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMatches.fulfilled,
        (state, action: PayloadAction<Match[]>) => {
          state.loading = false;
          state.matches = action.payload;
        }
      )
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch upcoming matches
      .addCase(
        fetchUpcomingMatches.fulfilled,
        (state, action: PayloadAction<Match[]>) => {
          state.upcomingMatches = action.payload;
        }
      )
      // Fetch recent matches
      .addCase(
        fetchRecentMatches.fulfilled,
        (state, action: PayloadAction<Match[]>) => {
          state.recentMatches = action.payload;
        }
      )
      // Fetch next match
      .addCase(
        fetchNextMatch.fulfilled,
        (state, action: PayloadAction<Match | null>) => {
          state.nextMatch = action.payload;
        }
      );
  },
});

export const { clearError } = matchesSlice.actions;
export default matchesSlice.reducer;
