import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { fetchArticles, fetchTopRated, setFilters } from '../features/articles/articlesSlice';
import { fetchFavorites } from '../features/favorites/favoritesSlice';
import HeroSection from '../components/hero/HeroSection';
import ArticleList from '../components/articles/ArticleList';
import SearchFilters from '../components/search/SearchFilters';
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
      ]);
      if (isAuthenticated) dispatch(fetchFavorites());
      // Show loader for at least 800ms for a nice UX
      setTimeout(() => setInitialLoading(false), 800);
    };
    init();
  }, []);

  useEffect(() => {
    if (!initialLoading) dispatch(fetchArticles(filters));
  }, [filters]);

  if (initialLoading) return <Loader />;

  return (
    <div className="container py-8 space-y-10">
      {/* Hero - Top rated articles */}
      <div>
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
          ⭐ Articles les mieux notés
        </h2>
        <HeroSection articles={topRated} loading={topRatedLoading} />
      </div>

      {/* Main articles */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Derniers articles</h2>
        </div>

        {/* Category filters */}
        <div className="mb-6">
          <SearchFilters
            activeCategory={filters.category}
            onSelect={(cat: Category | '') => dispatch(setFilters({ category: cat }))}
          />
        </div>

        <ArticleList articles={list} loading={loading} />

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => dispatch(setFilters({ page: pagination.page - 1 }))}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {pagination.page} / {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => dispatch(setFilters({ page: pagination.page + 1 }))}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
