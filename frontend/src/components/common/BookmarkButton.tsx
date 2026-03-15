import { BookmarkIcon, BookmarkCheckIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { addFavorite, removeFavorite } from '../../features/favorites/favoritesSlice';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

interface BookmarkButtonProps {
  articleId: string;
  className?: string;
}

export default function BookmarkButton({ articleId, className }: BookmarkButtonProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const { favoriteIds } = useAppSelector((s) => s.favorites);
  const isFav = favoriteIds.includes(articleId);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return navigate('/login');
    if (isFav) dispatch(removeFavorite(articleId));
    else dispatch(addFavorite(articleId));
  };

  return (
    <button
      onClick={toggle}
      title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className={cn(
        'p-1.5 rounded-md transition-colors',
        isFav
          ? 'text-primary bg-primary/10 hover:bg-primary/20'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted',
        className
      )}
    >
      {isFav ? <BookmarkCheckIcon className="w-5 h-5" /> : <BookmarkIcon className="w-5 h-5" />}
    </button>
  );
}
