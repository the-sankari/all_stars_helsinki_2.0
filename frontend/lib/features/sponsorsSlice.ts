import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Sponsor, LoadingState } from "../types";
import { apiService } from "../api";

interface SponsorsState extends LoadingState {
  sponsors: Sponsor[];
}

const initialState: SponsorsState = {
  sponsors: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchSponsors = createAsyncThunk(
  "sponsors/fetchSponsors",
  async (_, { rejectWithValue }) => {
    try {
      const sponsors = await apiService.getSponsors();
      return sponsors;
    } catch (error) {
      return rejectWithValue("Failed to fetch sponsors");
    }
  }
);

const sponsorsSlice = createSlice({
  name: "sponsors",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSponsors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSponsors.fulfilled,
        (state, action: PayloadAction<Sponsor[]>) => {
          state.loading = false;
          state.sponsors = action.payload;
        }
      )
      .addCase(fetchSponsors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = sponsorsSlice.actions;
export default sponsorsSlice.reducer;
