import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Testimonial, LoadingState } from "../types";
import { apiService } from "../api";

interface TestimonialsState extends LoadingState {
  testimonials: Testimonial[];
  featuredTestimonials: Testimonial[];
}

const initialState: TestimonialsState = {
  testimonials: [],
  featuredTestimonials: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const testimonials = await apiService.getTestimonials();
      return testimonials;
    } catch {
      return rejectWithValue("Failed to fetch testimonials");
    }
  }
);

export const fetchFeaturedTestimonials = createAsyncThunk(
  "testimonials/fetchFeaturedTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const testimonials = await apiService.getFeaturedTestimonials();
      return testimonials;
    } catch {
      return rejectWithValue("Failed to fetch featured testimonials");
    }
  }
);

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all testimonials
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTestimonials.fulfilled,
        (state, action: PayloadAction<Testimonial[]>) => {
          state.loading = false;
          state.testimonials = action.payload;
        }
      )
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch featured testimonials
      .addCase(fetchFeaturedTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFeaturedTestimonials.fulfilled,
        (state, action: PayloadAction<Testimonial[]>) => {
          state.loading = false;
          state.featuredTestimonials = action.payload;
        }
      )
      .addCase(fetchFeaturedTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
