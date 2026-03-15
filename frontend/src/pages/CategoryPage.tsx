import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/store';
import { fetchArticles, setFilters } from '../features/articles/articlesSlice';
import ArticleList from '../components/articles/ArticleList';
import SearchFilters from '../components/search/SearchFilters';
import { getCategoryEmoji, getCategoryLabel } from '../constants/categories';
import { Category } from '../types/article.types';

export default function CategoryPage() {
  const { category } = useParams<{ category: Category }>();
  const dispatch = useAppDispatch();
  const { list, loading, pagination } = useAppSelector((s) => s.articles);

  useEffect(() => {
    if (category) {
      dispatch(setFilters({ category, page: 1 }));
      dispatch(fetchArticles({ category, page: 1 }));
    }
  }, [category]);

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {getCategoryEmoji(category as Category)} {getCategoryLabel(category as Category)}
        </h1>
        <p className="text-muted-foreground mt-1">{pagination.total} articles dans cette catégorie</p>
      </div>

      <SearchFilters activeCategory={category as Category} />

      <ArticleList articles={list} loading={loading} />
    </div>
  );
}
