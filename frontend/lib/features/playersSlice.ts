import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Player, LoadingState } from "../types";
import { apiService } from "../api";

interface PlayersState extends LoadingState {
  players: Player[];
  featuredPlayer: Player | null;
  selectedPlayer: Player | null;
}

const initialState: PlayersState = {
  players: [],
  featuredPlayer: null,
  selectedPlayer: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchPlayers = createAsyncThunk(
  "players/fetchPlayers",
  async (_, { rejectWithValue }) => {
    try {
      const players = await apiService.getPlayers();
      return players;
    } catch (error) {
      return rejectWithValue("Failed to fetch players");
    }
  }
);

export const fetchFeaturedPlayer = createAsyncThunk(
  "players/fetchFeaturedPlayer",
  async (_, { rejectWithValue }) => {
    try {
      const player = await apiService.getFeaturedPlayer();
      return player;
    } catch (error) {
      return rejectWithValue("Failed to fetch featured player");
    }
  }
);

export const fetchPlayerById = createAsyncThunk(
  "players/fetchPlayerById",
  async (id: string, { rejectWithValue }) => {
    try {
      const player = await apiService.getPlayerById(id);
      return player;
    } catch (error) {
      return rejectWithValue("Failed to fetch player");
    }
  }
);

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    clearSelectedPlayer: (state) => {
      state.selectedPlayer = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all players
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPlayers.fulfilled,
        (state, action: PayloadAction<Player[]>) => {
          state.loading = false;
          state.players = action.payload;
        }
      )
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch featured player
      .addCase(fetchFeaturedPlayer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFeaturedPlayer.fulfilled,
        (state, action: PayloadAction<Player | null>) => {
          state.loading = false;
          state.featuredPlayer = action.payload;
        }
      )
      .addCase(fetchFeaturedPlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch player by ID
      .addCase(fetchPlayerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPlayerById.fulfilled,
        (state, action: PayloadAction<Player | null>) => {
          state.loading = false;
          state.selectedPlayer = action.payload;
        }
      )
      .addCase(fetchPlayerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedPlayer, clearError } = playersSlice.actions;
export default playersSlice.reducer;
