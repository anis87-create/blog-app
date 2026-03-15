import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { fetchFavorites } from '../features/favorites/favoritesSlice';
import ArticleList from '../components/articles/ArticleList';

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((s) => s.favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, []);

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">🔖 Mes favoris</h1>
        <p className="text-muted-foreground mt-1">{list.length} article(s) sauvegardé(s)</p>
      </div>
      <ArticleList articles={list} loading={loading} />
    </div>
  );
}
