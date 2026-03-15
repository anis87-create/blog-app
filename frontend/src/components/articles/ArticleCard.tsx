import { Link } from 'react-router-dom';
import { EyeIcon, MessageCircleIcon } from 'lucide-react';
import { Article } from '../../types/article.types';
import { formatDate, truncate } from '../../lib/utils';
import CategoryBadge from './CategoryBadge';
import StarRating from '../ratings/StarRating';
import BookmarkButton from '../common/BookmarkButton';

const categoryEmoji: Record<string, string> = {
  'tech-news': '💻',
  'history': '🏛️',
  'art': '🎨',
  'geography': '🌍',
  'training': '📚',
};

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 card-glow animate-fade-in">
      <Link to={`/article/${article.slug}`} className="block">
        {/* Cover image */}
        <div className="relative h-48 overflow-hidden bg-muted">
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-primary/10 to-primary/5">
              {categoryEmoji[article.category] || '🎭'}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      <div className="p-5">
        {/* Category + bookmark */}
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={article.category} />
          <BookmarkButton articleId={article._id} />
        </div>

        {/* Title */}
        <Link to={`/article/${article.slug}`}>
          <h2 className="text-base font-semibold leading-snug mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {article.title}
          </h2>
        </Link>

        {/* Summary */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {truncate(article.summary || '', 120)}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <EyeIcon className="w-3.5 h-3.5" /> {article.viewsCount}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircleIcon className="w-3.5 h-3.5" /> {article.commentsCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <StarRating value={article.averageRating} size="sm" />
            <span>{formatDate(article.createdAt)}</span>
          </div>
        </div>

        {/* Author */}
        <div className="mt-3 pt-3 border-t border-border">
          <Link
            to={`/author/${article.author._id}`}
            className="flex items-center gap-2 group/author w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            {article.author.avatar ? (
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-border"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary ring-1 ring-primary/20">
                {article.author.name[0]}
              </div>
            )}
            <span className="text-xs text-muted-foreground group-hover/author:text-primary transition-colors">
              {article.author.name}
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
