import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from '../features/auth/authSlice';
import articlesReducer from '../features/articles/articlesSlice';
import commentsReducer from '../features/comments/commentsSlice';
import reactionsReducer from '../features/reactions/reactionsSlice';
import ratingsReducer from '../features/ratings/ratingsSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesReducer,
    comments: commentsReducer,
    reactions: reactionsReducer,
    ratings: ratingsReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);
