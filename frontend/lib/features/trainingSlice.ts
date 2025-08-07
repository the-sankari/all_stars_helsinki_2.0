import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TrainingSession, LoadingState } from "../types";
import { apiService } from "../api";

interface TrainingState extends LoadingState {
  sessions: TrainingSession[];
  upcomingSessions: TrainingSession[];
}

const initialState: TrainingState = {
  sessions: [],
  upcomingSessions: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchTrainingSessions = createAsyncThunk(
  "training/fetchTrainingSessions",
  async (_, { rejectWithValue }) => {
    try {
      const sessions = await apiService.getTrainingSessions();
      return sessions;
    } catch {
      return rejectWithValue("Failed to fetch training sessions");
    }
  }
);

export const fetchUpcomingTraining = createAsyncThunk(
  "training/fetchUpcomingTraining",
  async (_, { rejectWithValue }) => {
    try {
      const sessions = await apiService.getUpcomingTraining();
      return sessions;
    } catch {
      return rejectWithValue("Failed to fetch upcoming training");
    }
  }
);

const trainingSlice = createSlice({
  name: "training",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all training sessions
      .addCase(fetchTrainingSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTrainingSessions.fulfilled,
        (state, action: PayloadAction<TrainingSession[]>) => {
          state.loading = false;
          state.sessions = action.payload;
        }
      )
      .addCase(fetchTrainingSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch upcoming training
      .addCase(fetchUpcomingTraining.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUpcomingTraining.fulfilled,
        (state, action: PayloadAction<TrainingSession[]>) => {
          state.loading = false;
          state.upcomingSessions = action.payload;
        }
      )
      .addCase(fetchUpcomingTraining.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = trainingSlice.actions;
export default trainingSlice.reducer;
