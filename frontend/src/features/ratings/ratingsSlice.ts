import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../lib/axios';

interface RatingsState {
  byArticleId: Record<string, number>;
  loading: boolean;
}

const initialState: RatingsState = { byArticleId: {}, loading: false };

export const submitRating = createAsyncThunk(
  'ratings/submit',
  async (payload: { articleId: string; value: number }, { rejectWithValue }) => {
    try {
      await api.post(`/ratings/${payload.articleId}`, { value: payload.value });
      return payload;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const fetchMyRating = createAsyncThunk(
  'ratings/fetchMy',
  async (articleId: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/ratings/${articleId}/me`);
      return { articleId, value: data.data.rating };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitRating.fulfilled, (state, action) => {
        state.byArticleId[action.payload.articleId] = action.payload.value;
      })
      .addCase(fetchMyRating.fulfilled, (state, action) => {
        if (action.payload.value !== null) {
          state.byArticleId[action.payload.articleId] = action.payload.value;
        }
      });
  },
});

export default ratingsSlice.reducer;
