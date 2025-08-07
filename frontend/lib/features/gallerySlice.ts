import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GalleryItem, LoadingState } from "../types";
import { apiService } from "../api";

interface GalleryState extends LoadingState {
  gallery: GalleryItem[];
  featuredGallery: GalleryItem[];
}

const initialState: GalleryState = {
  gallery: [],
  featuredGallery: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchGallery = createAsyncThunk(
  "gallery/fetchGallery",
  async (_, { rejectWithValue }) => {
    try {
      const gallery = await apiService.getGallery();
      return gallery;
    } catch (error) {
      return rejectWithValue("Failed to fetch gallery");
    }
  }
);

export const fetchFeaturedGallery = createAsyncThunk(
  "gallery/fetchFeaturedGallery",
  async (_, { rejectWithValue }) => {
    try {
      const gallery = await apiService.getFeaturedGallery();
      return gallery;
    } catch (error) {
      return rejectWithValue("Failed to fetch featured gallery");
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch gallery
      .addCase(fetchGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchGallery.fulfilled,
        (state, action: PayloadAction<GalleryItem[]>) => {
          state.loading = false;
          state.gallery = action.payload;
        }
      )
      .addCase(fetchGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch featured gallery
      .addCase(
        fetchFeaturedGallery.fulfilled,
        (state, action: PayloadAction<GalleryItem[]>) => {
          state.featuredGallery = action.payload;
        }
      );
  },
});

export const { clearError } = gallerySlice.actions;
export default gallerySlice.reducer;
