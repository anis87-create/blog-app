import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../lib/axios';
import { Article, ArticleFilters, Category, Pagination } from '../../types/article.types';
import { MOCK_ARTICLES, MOCK_FEATURED, MOCK_TOP_RATED } from '../../mocks/articles.mock';

export interface ArticleFormData {
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  category: Category;
  tags: string[];
  status: 'draft' | 'published';
}

interface ArticlesState {
  list: Article[];
  topRated: Article[];
  featured: Article[];
  current: Article | null;
  pagination: Pagination;
  filters: ArticleFilters;
  loading: boolean;
  topRatedLoading: boolean;
  saving: boolean;
  deleting: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  list: [],
  topRated: [],
  featured: [],
  current: null,
  pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  filters: { category: '', search: '', sort: '-createdAt', page: 1 },
  loading: false,
  topRatedLoading: false,
  saving: false,
  deleting: false,
  error: null,
};

export const fetchArticles = createAsyncThunk(
  'articles/fetchAll',
  async (filters: ArticleFilters = {}) => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v) params.append(k, String(v)); });
      const { data } = await api.get(`/articles?${params}`);
      return data.data;
    } catch {
      let list = [...MOCK_ARTICLES];
      if (filters.category) list = list.filter((a) => a.category === filters.category);
      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter((a) => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q));
      }
      const page = filters.page ?? 1;
      const limit = 10;
      const total = list.length;
      const paginated = list.slice((page - 1) * limit, page * limit);
      return { articles: paginated, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
    }
  }
);

export const fetchTopRated = createAsyncThunk('articles/fetchTopRated', async () => {
  try {
    const { data } = await api.get('/articles/top-rated');
    return data.data.articles;
  } catch {
    return MOCK_TOP_RATED;
  }
});

export const fetchFeatured = createAsyncThunk('articles/fetchFeatured', async () => {
  try {
    const { data } = await api.get('/articles/featured');
    return data.data.articles;
  } catch {
    return MOCK_FEATURED;
  }
});

export const fetchArticleBySlug = createAsyncThunk(
  'articles/fetchBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/articles/${slug}`);
      return data.data.article;
    } catch {
      const found = MOCK_ARTICLES.find((a) => a.slug === slug);
      if (found) return found;
      return rejectWithValue('Article introuvable');
    }
  }
);

export const createArticle = createAsyncThunk(
  'articles/create',
  async (formData: ArticleFormData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/articles', formData);
      return data.data.article as Article;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Erreur lors de la création');
    }
  }
);

export const updateArticle = createAsyncThunk(
  'articles/update',
  async ({ id, formData }: { id: string; formData: ArticleFormData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/articles/${id}`, formData);
      return data.data.article as Article;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Erreur lors de la modification');
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/articles/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<ArticleFilters>) {
      state.filters = { ...state.filters, ...action.payload, page: 1 };
    },
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.articles;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchTopRated.pending, (state) => { state.topRatedLoading = true; })
      .addCase(fetchTopRated.fulfilled, (state, action) => {
        state.topRatedLoading = false;
        state.topRated = action.payload;
      })
      .addCase(fetchTopRated.rejected, (state) => { state.topRatedLoading = false; })

      .addCase(fetchFeatured.fulfilled, (state, action) => {
        state.featured = action.payload;
      })

      .addCase(fetchArticleBySlug.pending, (state) => { state.loading = true; state.current = null; })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createArticle.pending, (state) => { state.saving = true; state.error = null; })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.saving = false;
        state.current = action.payload;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload as string;
      })

      .addCase(updateArticle.pending, (state) => { state.saving = true; state.error = null; })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.saving = false;
        state.current = action.payload;
        state.list = state.list.map((a) => a._id === action.payload._id ? action.payload : a);
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload as string;
      })

      .addCase(deleteArticle.pending, (state) => { state.deleting = true; state.error = null; })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.deleting = false;
        state.list = state.list.filter((a) => a._id !== action.payload);
        if (state.current?._id === action.payload) state.current = null;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearCurrent } = articlesSlice.actions;
export default articlesSlice.reducer;
