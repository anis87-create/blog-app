import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { fetchArticles, fetchAllArticles, fetchTopRated, setFilters } from '../features/articles/articlesSlice';
import { fetchFavorites } from '../features/favorites/favoritesSlice';
import HeroSection from '../components/hero/HeroSection';
import ArticleList from '../components/articles/ArticleList';
import SearchFilters from '../components/search/SearchFilters';
import AuthorsSection from '../components/authors/AuthorsSection';
import PopularArticlesSection from '../components/articles/PopularArticlesSection';
import Loader from '../components/ui/Loader';
import { Category } from '../types/article.types';
import { Button } from '../components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { list, topRated, topRatedLoading, loading, pagination, filters } = useAppSelector((s) => s.articles);
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await Promise.all([
        dispatch(fetchTopRated()),
        dispatch(fetchArticles(filters)),
        dispatch(fetchAllArticles()),
      ]);
      if (isAuthenticated) dispatch(fetchFavorites());
      setTimeout(() => setInitialLoading(false), 800);
    };
    init();
  }, []);

  useEffect(() => {
    if (!initialLoading) dispatch(fetchArticles(filters));
  }, [filters]);

  if (initialLoading) return <Loader />;

  return (
    <div className="container py-10 space-y-14">
      {/* Hero */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">
            Articles les mieux notés
          </span>
        </div>
        <HeroSection articles={topRated} loading={topRatedLoading} />
      </div>

      {/* Authors */}
      <AuthorsSection />

      {/* Popular articles */}
      <PopularArticlesSection articles={topRated} loading={topRatedLoading} />

      {/* Latest articles */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Derniers articles</h2>
            <p className="text-sm text-white/35 mt-1">Découvrez les publications récentes</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <SearchFilters
            activeCategory={filters.category}
            onSelect={(cat: Category | '') => dispatch(setFilters({ category: cat }))}
          />
        </div>

        <ArticleList articles={list} loading={loading} />

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => dispatch(setFilters({ page: pagination.page - 1 }))}
              className="border-white/8 bg-transparent text-white/50 hover:text-white hover:bg-white/[0.07] hover:border-white/15 rounded-lg"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <span className="text-sm text-white/35 font-medium tabular-nums">
              {pagination.page}
              <span className="text-white/15 mx-1">/</span>
              {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => dispatch(setFilters({ page: pagination.page + 1 }))}
              className="border-white/8 bg-transparent text-white/50 hover:text-white hover:bg-white/[0.07] hover:border-white/15 rounded-lg"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
