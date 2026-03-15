import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { postComment } from '../../features/comments/commentsSlice';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useNavigate } from 'react-router-dom';

interface CommentFormProps {
  articleId: string;
  parentCommentId?: string;
  onCancel?: () => void;
  placeholder?: string;
}

export default function CommentForm({ articleId, parentCommentId, onCancel, placeholder }: CommentFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const { posting } = useAppSelector((s) => s.comments);
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return navigate('/login');
    if (!content.trim()) return;
    await dispatch(postComment({ articleId, content, parentComment: parentCommentId }));
    setContent('');
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder ?? (isAuthenticated ? 'Écrire un commentaire...' : 'Connectez-vous pour commenter')}
        disabled={!isAuthenticated}
        rows={3}
        className="resize-none"
        maxLength={2000}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{content.length}/2000</span>
        <div className="flex gap-2">
          {onCancel && (
            <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
              Annuler
            </Button>
          )}
          <Button type="submit" size="sm" disabled={!content.trim() || posting || !isAuthenticated}>
            {posting ? 'Envoi...' : parentCommentId ? 'Répondre' : 'Commenter'}
          </Button>
        </div>
      </div>
    </form>
  );
}
