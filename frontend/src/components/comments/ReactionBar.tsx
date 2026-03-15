import { useAppDispatch, useAppSelector } from '../../app/store';
import { upsertReaction, removeReaction } from '../../features/reactions/reactionsSlice';
import { ReactionType } from '../../types/comment.types';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

const REACTIONS: { type: ReactionType; emoji: string; label: string }[] = [
  { type: 'like', emoji: '👍', label: 'J\'aime' },
  { type: 'dislike', emoji: '👎', label: 'Je n\'aime pas' },
  { type: 'love', emoji: '❤️', label: 'J\'adore' },
  { type: 'laugh', emoji: '😂', label: 'Drôle' },
  { type: 'wow', emoji: '😮', label: 'Impressionnant' },
  { type: 'angry', emoji: '😡', label: 'En colère' },
];

interface ReactionBarProps {
  commentId: string;
  likesCount: number;
  dislikesCount: number;
}

export default function ReactionBar({ commentId, likesCount, dislikesCount }: ReactionBarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const myReaction = useAppSelector((s) => s.reactions.byCommentId[commentId]);

  const handleReact = (type: ReactionType) => {
    if (!isAuthenticated) return navigate('/login');
    if (myReaction === type) {
      dispatch(removeReaction(commentId));
    } else {
      dispatch(upsertReaction({ commentId, type }));
    }
  };

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {REACTIONS.map(({ type, emoji, label }) => (
        <button
          key={type}
          onClick={() => handleReact(type)}
          title={label}
          className={cn(
            'flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-all',
            myReaction === type
              ? 'bg-primary/15 text-primary ring-1 ring-primary/30'
              : 'text-muted-foreground hover:bg-muted'
          )}
        >
          <span>{emoji}</span>
          {type === 'like' && likesCount > 0 && <span>{likesCount}</span>}
          {type === 'dislike' && dislikesCount > 0 && <span>{dislikesCount}</span>}
        </button>
      ))}
    </div>
  );
}
