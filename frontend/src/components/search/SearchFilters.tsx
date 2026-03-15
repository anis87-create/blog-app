import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../../constants/categories';
import { cn } from '../../lib/utils';
import { Category } from '../../types/article.types';

interface SearchFiltersProps {
  activeCategory?: Category | '';
  onSelect?: (cat: Category | '') => void;
}

export default function SearchFilters({ activeCategory, onSelect }: SearchFiltersProps) {
  const location = useLocation();
  const isCategory = location.pathname.startsWith('/category');

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect?.('')}
        className={cn(
          'px-3 py-1.5 rounded-full text-sm font-medium transition-colors border',
          activeCategory === '' || !activeCategory
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-background text-foreground border-border hover:bg-accent'
        )}
      >
        Tous
      </button>
      {CATEGORIES.map((cat) => (
        isCategory ? (
          <Link
            key={cat.value}
            to={`/category/${cat.value}`}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors border',
              activeCategory === cat.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-foreground border-border hover:bg-accent'
            )}
          >
            {cat.emoji} {cat.label}
          </Link>
        ) : (
          <button
            key={cat.value}
            onClick={() => onSelect?.(cat.value)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors border',
              activeCategory === cat.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-foreground border-border hover:bg-accent'
            )}
          >
            {cat.emoji} {cat.label}
          </button>
        )
      ))}
    </div>
  );
}
