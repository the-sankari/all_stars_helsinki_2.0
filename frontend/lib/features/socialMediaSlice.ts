import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SocialMediaPost, LoadingState } from "../types";
import { apiService } from "../api";

interface SocialMediaState extends LoadingState {
  posts: SocialMediaPost[];
  latestPosts: SocialMediaPost[];
}

const initialState: SocialMediaState = {
  posts: [],
  latestPosts: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchSocialMediaPosts = createAsyncThunk(
  "socialMedia/fetchSocialMediaPosts",
  async (_, { rejectWithValue }) => {
    try {
      const posts = await apiService.getSocialMediaPosts();
      return posts;
    } catch {
      return rejectWithValue("Failed to fetch social media posts");
    }
  }
);

export const fetchLatestSocialPosts = createAsyncThunk(
  "socialMedia/fetchLatestSocialPosts",
  async (limit: number = 6, { rejectWithValue }) => {
    try {
      const posts = await apiService.getLatestSocialPosts(limit);
      return posts;
    } catch {
      return rejectWithValue("Failed to fetch latest social posts");
    }
  }
);

const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all social media posts
      .addCase(fetchSocialMediaPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSocialMediaPosts.fulfilled,
        (state, action: PayloadAction<SocialMediaPost[]>) => {
          state.loading = false;
          state.posts = action.payload;
        }
      )
      .addCase(fetchSocialMediaPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch latest social posts
      .addCase(
        fetchLatestSocialPosts.fulfilled,
        (state, action: PayloadAction<SocialMediaPost[]>) => {
          state.latestPosts = action.payload;
        }
      );
  },
});

export const { clearError } = socialMediaSlice.actions;
export default socialMediaSlice.reducer;
