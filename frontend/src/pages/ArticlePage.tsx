import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { EyeIcon, MessageCircleIcon, ChevronLeftIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { fetchArticleBySlug, clearCurrent, deleteArticle } from '../features/articles/articlesSlice';
import { fetchMyRating, submitRating } from '../features/ratings/ratingsSlice';
import CategoryBadge from '../components/articles/CategoryBadge';
import StarRating from '../components/ratings/StarRating';
import BookmarkButton from '../components/common/BookmarkButton';
import CommentSection from '../components/comments/CommentSection';
import { Button } from '../components/ui/button';
import { formatDate } from '../lib/utils';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { current, loading, deleting } = useAppSelector((s) => s.articles);
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);
  const myRating = useAppSelector((s) =>
    current ? s.ratings.byArticleId[current._id] : undefined
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const canEditOrDelete = isAuthenticated && current;

  useEffect(() => {
    if (slug) dispatch(fetchArticleBySlug(slug));
    return () => { dispatch(clearCurrent()); };
  }, [slug]);

  useEffect(() => {
    if (current && isAuthenticated) {
      dispatch(fetchMyRating(current._id));
    }
  }, [current?._id, isAuthenticated]);

  const handleDelete = async () => {
    if (!current) return;
    const result = await dispatch(deleteArticle(current._id));
    if (deleteArticle.fulfilled.match(result)) {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="container py-8 max-w-4xl">
        <div className="space-y-4 animate-pulse">
          <div className="h-64 bg-muted rounded-xl" />
          <div className="h-8 bg-muted rounded w-2/3" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="container py-20 text-center">
        <p className="text-4xl mb-3">😕</p>
        <p className="text-lg font-medium">Article introuvable</p>
        <Link to="/" className="text-primary text-sm mt-2 inline-block hover:underline">← Retour à l'accueil</Link>
      </div>
    );
  }

  const handleRate = (value: number) => {
    if (!isAuthenticated) return;
    dispatch(submitRating({ articleId: current._id, value }));
  };

  return (
    <div className="container py-8 max-w-4xl">
      {/* Back + Actions */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeftIcon className="w-4 h-4" /> Retour aux articles
        </Link>
        {canEditOrDelete && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/articles/edit/${current.slug}`}>
                <PencilIcon className="w-4 h-4 mr-1" /> Modifier
              </Link>
            </Button>
            {!showDeleteConfirm ? (
              <Button variant="destructive" size="sm" onClick={() => setShowDeleteConfirm(true)}>
                <Trash2Icon className="w-4 h-4 mr-1" /> Supprimer
              </Button>
            ) : (
              <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-md px-3 py-1.5">
                <span className="text-sm text-destructive font-medium">Confirmer ?</span>
                <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting}>
                  {deleting ? '...' : 'Oui'}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                  Non
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cover */}
      {current.coverImage && (
        <img
          src={current.coverImage}
          alt={current.title}
          className="w-full h-72 object-cover rounded-xl mb-8"
        />
      )}

      {/* Meta */}
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <CategoryBadge category={current.category} />
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><EyeIcon className="w-4 h-4" /> {current.viewsCount}</span>
          <span className="flex items-center gap-1"><MessageCircleIcon className="w-4 h-4" /> {current.commentsCount}</span>
          <BookmarkButton articleId={current._id} />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{current.title}</h1>

      {/* Author + date */}
      <div className="flex items-center gap-3 mb-8 pb-8 border-b">
        {current.author.avatar ? (
          <img src={current.author.avatar} alt={current.author.name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
            {current.author.name[0]}
          </div>
        )}
        <div>
          <p className="font-semibold text-sm">{current.author.name}</p>
          <p className="text-xs text-muted-foreground">{formatDate(current.createdAt)}</p>
        </div>
      </div>

      {/* Content */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: current.content }}
      />

      {/* Rating */}
      <div className="mt-10 p-6 bg-muted/40 rounded-xl">
        <h3 className="font-semibold mb-3">Note de cet article</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Note globale</p>
            <StarRating value={current.averageRating} size="lg" />
            <p className="text-xs text-muted-foreground mt-1">{current.ratingsCount} votes</p>
          </div>
          {isAuthenticated && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Votre note</p>
              <StarRating value={myRating ?? 0} interactive onRate={handleRate} size="lg" />
            </div>
          )}
          {!isAuthenticated && (
            <p className="text-sm text-muted-foreground">
              <Link to="/login" className="text-primary hover:underline">Connectez-vous</Link> pour noter cet article.
            </p>
          )}
        </div>
      </div>

      {/* Comments */}
      <CommentSection articleId={current._id} />
    </div>
  );
}
