import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/store';
import { fetchArticles } from '../features/articles/articlesSlice';
import ArticleList from '../components/articles/ArticleList';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const dispatch = useAppDispatch();
  const { list, loading, pagination } = useAppSelector((s) => s.articles);

  useEffect(() => {
    if (query) dispatch(fetchArticles({ search: query, page: 1 }));
  }, [query]);

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Résultats pour : <span className="text-primary">"{query}"</span>
        </h1>
        <p className="text-muted-foreground mt-1">{pagination.total} résultat(s) trouvé(s)</p>
      </div>

      <ArticleList articles={list} loading={loading} />
    </div>
  );
}
