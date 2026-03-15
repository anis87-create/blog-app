import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../lib/axios';
import { Comment } from '../../types/comment.types';

interface CommentsState {
  byArticleId: Record<string, Comment[]>;
  loading: boolean;
  posting: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  byArticleId: {},
  loading: false,
  posting: false,
  error: null,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (articleId: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/comments/${articleId}`);
      return { articleId, comments: data.data.comments };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const postComment = createAsyncThunk(
  'comments/post',
  async (
    payload: { articleId: string; content: string; parentComment?: string },
    { rejectWithValue }
  ) => {
    try {
      const { articleId, ...body } = payload;
      const { data } = await api.post(`/comments/${articleId}`, body);
      return { articleId, comment: data.data.comment };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const editComment = createAsyncThunk(
  'comments/edit',
  async (payload: { id: string; content: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/comments/${payload.id}`, { content: payload.content });
      return data.data.comment;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (payload: { id: string; articleId: string }, { rejectWithValue }) => {
    try {
      await api.delete(`/comments/${payload.id}`);
      return payload;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => { state.loading = true; })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.byArticleId[action.payload.articleId] = action.payload.comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(postComment.pending, (state) => { state.posting = true; })
      .addCase(postComment.fulfilled, (state, action) => {
        state.posting = false;
        const { articleId, comment } = action.payload;
        if (!state.byArticleId[articleId]) state.byArticleId[articleId] = [];
        if (comment.parentComment) {
          const parent = state.byArticleId[articleId].find((c) => c._id === comment.parentComment);
          if (parent) {
            if (!parent.replies) parent.replies = [];
            parent.replies.push(comment);
          }
        } else {
          state.byArticleId[articleId].push(comment);
        }
      })
      .addCase(postComment.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload as string;
      })

      .addCase(editComment.fulfilled, (state, action) => {
        const edited = action.payload;
        Object.keys(state.byArticleId).forEach((articleId) => {
          const list = state.byArticleId[articleId];
          const idx = list.findIndex((c) => c._id === edited._id);
          if (idx !== -1) list[idx] = edited;
          list.forEach((c) => {
            if (c.replies) {
              const ri = c.replies.findIndex((r) => r._id === edited._id);
              if (ri !== -1) c.replies[ri] = edited;
            }
          });
        });
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        const { id, articleId } = action.payload;
        if (state.byArticleId[articleId]) {
          state.byArticleId[articleId] = state.byArticleId[articleId].filter((c) => c._id !== id);
          state.byArticleId[articleId].forEach((c) => {
            if (c.replies) c.replies = c.replies.filter((r) => r._id !== id);
          });
        }
      });
  },
});

export default commentsSlice.reducer;
