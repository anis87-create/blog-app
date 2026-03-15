import { useState } from 'react';
import { StarIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StarRatingProps {
  value: number;
  max?: number;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onRate?: (value: number) => void;
}

export default function StarRating({
  value,
  max = 5,
  interactive = false,
  size = 'md',
  onRate,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  const sizeClass = { sm: 'w-3.5 h-3.5', md: 'w-5 h-5', lg: 'w-6 h-6' }[size];

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const filled = hovered ? starValue <= hovered : starValue <= Math.round(value);
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            className={cn('transition-colors', interactive && 'cursor-pointer hover:scale-110')}
            onMouseEnter={() => interactive && setHovered(starValue)}
            onMouseLeave={() => interactive && setHovered(0)}
            onClick={() => interactive && onRate?.(starValue)}
          >
            <StarIcon
              className={cn(
                sizeClass,
                filled ? 'fill-yellow-400 text-yellow-400' : 'fill-none text-muted-foreground/40'
              )}
            />
          </button>
        );
      })}
      {value > 0 && (
        <span className="ml-1 text-xs text-muted-foreground">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
