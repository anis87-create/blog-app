import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../lib/axios';
import { ReactionType } from '../../types/comment.types';

interface ReactionsState {
  byCommentId: Record<string, ReactionType>;
  loading: boolean;
}

const initialState: ReactionsState = { byCommentId: {}, loading: false };

export const fetchMyReactions = createAsyncThunk(
  'reactions/fetchMy',
  async (commentIds: string[], { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/reactions/my?commentIds=${commentIds.join(',')}`);
      return data.data.reactions as Record<string, ReactionType>;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const upsertReaction = createAsyncThunk(
  'reactions/upsert',
  async (payload: { commentId: string; type: ReactionType }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/reactions/${payload.commentId}`, { type: payload.type });
      return { commentId: payload.commentId, type: payload.type, reaction: data.data.reaction };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const removeReaction = createAsyncThunk(
  'reactions/remove',
  async (commentId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/reactions/${commentId}`);
      return commentId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const reactionsSlice = createSlice({
  name: 'reactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyReactions.fulfilled, (state, action) => {
        Object.assign(state.byCommentId, action.payload);
      })
      .addCase(upsertReaction.fulfilled, (state, action) => {
        state.byCommentId[action.payload.commentId] = action.payload.type;
      })
      .addCase(removeReaction.fulfilled, (state, action) => {
        delete state.byCommentId[action.payload];
      });
  },
});

export default reactionsSlice.reducer;
