import { useState } from 'react';
import { ReplyIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { Comment } from '../../types/comment.types';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { deleteComment, editComment } from '../../features/comments/commentsSlice';
import { formatDate } from '../../lib/utils';
import ReactionBar from './ReactionBar';
import CommentForm from './CommentForm';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface CommentCardProps {
  comment: Comment;
  articleId: string;
  depth?: number;
}

export default function CommentCard({ comment, articleId, depth = 0 }: CommentCardProps) {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const isOwner = isAuthenticated && user?._id === comment.author._id;

  const handleDelete = () => {
    if (confirm('Supprimer ce commentaire ?')) {
      dispatch(deleteComment({ id: comment._id, articleId }));
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(editComment({ id: comment._id, content: editContent }));
    setEditing(false);
  };

  return (
    <div className={`flex gap-3 ${depth > 0 ? 'ml-8 mt-3' : 'mt-4'}`}>
      {/* Avatar */}
      <div className="shrink-0">
        {comment.author.avatar ? (
          <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
            {comment.author.name[0]}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm">{comment.author.name}</span>
          <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
          {comment.isEdited && <span className="text-xs text-muted-foreground italic">(modifié)</span>}
        </div>

        {/* Content */}
        {editing ? (
          <form onSubmit={handleEdit} className="mt-2 space-y-2">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <div className="flex gap-2">
              <Button size="sm" type="submit">Enregistrer</Button>
              <Button size="sm" variant="ghost" type="button" onClick={() => setEditing(false)}>Annuler</Button>
            </div>
          </form>
        ) : (
          <p className="mt-1 text-sm whitespace-pre-wrap break-words">{comment.content}</p>
        )}

        {/* Actions */}
        {!editing && (
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <ReactionBar commentId={comment._id} likesCount={comment.likesCount} dislikesCount={comment.dislikesCount} />
            {depth < 3 && (
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => setReplying(!replying)}>
                <ReplyIcon className="w-3 h-3 mr-1" /> Répondre
              </Button>
            )}
            {isOwner && (
              <>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => setEditing(true)}>
                  <PencilIcon className="w-3 h-3 mr-1" /> Modifier
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-destructive hover:text-destructive" onClick={handleDelete}>
                  <Trash2Icon className="w-3 h-3 mr-1" /> Supprimer
                </Button>
              </>
            )}
          </div>
        )}

        {/* Reply form */}
        {replying && (
          <div className="mt-3">
            <CommentForm
              articleId={articleId}
              parentCommentId={comment._id}
              onCancel={() => setReplying(false)}
              placeholder={`Répondre à ${comment.author.name}...`}
            />
          </div>
        )}

        {/* Nested replies */}
        {comment.replies?.map((reply) => (
          <CommentCard key={reply._id} comment={reply} articleId={articleId} depth={depth + 1} />
        ))}
      </div>
    </div>
  );
}
