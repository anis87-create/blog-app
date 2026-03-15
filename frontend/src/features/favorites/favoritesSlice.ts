import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../lib/axios';
import { Article } from '../../types/article.types';

interface FavoritesState {
  list: Article[];
  favoriteIds: string[];
  loading: boolean;
}

const initialState: FavoritesState = { list: [], favoriteIds: [], loading: false };

export const fetchFavorites = createAsyncThunk('favorites/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/favorites');
    return data.data.articles as Article[];
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message);
  }
});

export const addFavorite = createAsyncThunk(
  'favorites/add',
  async (articleId: string, { rejectWithValue }) => {
    try {
      await api.post(`/favorites/${articleId}`);
      return articleId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'favorites/remove',
  async (articleId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/favorites/${articleId}`);
      return articleId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => { state.loading = true; })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.favoriteIds = action.payload.map((a) => a._id);
      })
      .addCase(fetchFavorites.rejected, (state) => { state.loading = false; })

      .addCase(addFavorite.fulfilled, (state, action) => {
        if (!state.favoriteIds.includes(action.payload)) {
          state.favoriteIds.push(action.payload);
        }
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload);
        state.list = state.list.filter((a) => a._id !== action.payload);
      });
  },
});

export default favoritesSlice.reducer;
