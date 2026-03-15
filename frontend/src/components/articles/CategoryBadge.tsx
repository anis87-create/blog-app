import { Link } from 'react-router-dom';
import { Category } from '../../types/article.types';
import { getCategoryEmoji, getCategoryLabel } from '../../constants/categories';
import { cn } from '../../lib/utils';

const COLORS: Record<string, string> = {
  'tech-news': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  history: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  art: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  geography: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  training: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  culture: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
};

export default function CategoryBadge({ category, asLink = true }: { category: Category; asLink?: boolean }) {
  const className = cn(
    'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
    COLORS[category] ?? 'bg-muted text-muted-foreground'
  );

  const content = <>{getCategoryEmoji(category)} {getCategoryLabel(category)}</>;

  if (asLink) {
    return <Link to={`/category/${category}`} className={className}>{content}</Link>;
  }
  return <span className={className}>{content}</span>;
}
