import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { News, LoadingState } from "../types";
import { apiService } from "../api";

interface NewsState extends LoadingState {
  news: News[];
  latestNews: News[];
  selectedNews: News | null;
}

const initialState: NewsState = {
  news: [],
  latestNews: [],
  selectedNews: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      const news = await apiService.getPublishedNews();
      return news;
    } catch (error) {
      return rejectWithValue("Failed to fetch news");
    }
  }
);

export const fetchLatestNews = createAsyncThunk(
  "news/fetchLatestNews",
  async (limit: number = 3, { rejectWithValue }) => {
    try {
      const news = await apiService.getLatestNews(limit);
      return news;
    } catch (error) {
      return rejectWithValue("Failed to fetch latest news");
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setSelectedNews: (state, action: PayloadAction<News>) => {
      state.selectedNews = action.payload;
    },
    clearSelectedNews: (state) => {
      state.selectedNews = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all news
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<News[]>) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch latest news
      .addCase(fetchLatestNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchLatestNews.fulfilled,
        (state, action: PayloadAction<News[]>) => {
          state.loading = false;
          state.latestNews = action.payload;
        }
      )
      .addCase(fetchLatestNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedNews, clearSelectedNews, clearError } =
  newsSlice.actions;
export default newsSlice.reducer;
