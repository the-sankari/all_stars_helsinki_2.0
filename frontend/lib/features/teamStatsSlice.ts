import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TeamStats, LoadingState } from "../types";
import { apiService } from "../api";

interface TeamStatsState extends LoadingState {
  stats: TeamStats | null;
}

const initialState: TeamStatsState = {
  stats: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchTeamStats = createAsyncThunk(
  "teamStats/fetchTeamStats",
  async (_, { rejectWithValue }) => {
    try {
      const stats = await apiService.getTeamStats();
      return stats;
    } catch (error) {
      return rejectWithValue("Failed to fetch team stats");
    }
  }
);

const teamStatsSlice = createSlice({
  name: "teamStats",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTeamStats.fulfilled,
        (state, action: PayloadAction<TeamStats>) => {
          state.loading = false;
          state.stats = action.payload;
        }
      )
      .addCase(fetchTeamStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = teamStatsSlice.actions;
export default teamStatsSlice.reducer;
