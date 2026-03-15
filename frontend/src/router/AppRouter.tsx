import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import ArticlePage from '../pages/ArticlePage';
import CategoryPage from '../pages/CategoryPage';
import SearchResultsPage from '../pages/SearchResultsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import FavoritesPage from '../pages/FavoritesPage';
import OAuthCallbackPage from '../pages/OAuthCallbackPage';
import ProtectedRoute from '../components/common/ProtectedRoute';
import ArticleFormPage from '../pages/ArticleFormPage';
import AuthorPage from '../pages/AuthorPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="article/:slug" element={<ArticlePage />} />
          <Route path="category/:category" element={<CategoryPage />} />
          <Route path="search" element={<SearchResultsPage />} />
          <Route path="author/:authorId" element={<AuthorPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="oauth-callback" element={<OAuthCallbackPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="articles/new" element={<ArticleFormPage />} />
            <Route path="articles/edit/:slug" element={<ArticleFormPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
