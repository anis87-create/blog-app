import { useEffect } from 'react';
import { MessageCircleIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { fetchComments } from '../../features/comments/commentsSlice';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';

export default function CommentSection({ articleId }: { articleId: string }) {
  const dispatch = useAppDispatch();
  const { byArticleId, loading } = useAppSelector((s) => s.comments);
  const comments = byArticleId[articleId] ?? [];

  useEffect(() => {
    dispatch(fetchComments(articleId));
  }, [dispatch, articleId]);

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
        <MessageCircleIcon className="w-5 h-5 text-primary" />
        Commentaires ({comments.length})
      </h2>

      <CommentForm articleId={articleId} />

      <div className="mt-8 divide-y">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="py-4 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))
        ) : comments.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground text-sm">
            Soyez le premier à commenter !
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="py-2">
              <CommentCard comment={comment} articleId={articleId} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
