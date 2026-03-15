import { Link } from 'react-router-dom';
import { EyeIcon, MessageCircleIcon } from 'lucide-react';
import { Article } from '../../types/article.types';
import { formatDate, truncate } from '../../lib/utils';
import CategoryBadge from './CategoryBadge';
import StarRating from '../ratings/StarRating';
import BookmarkButton from '../common/BookmarkButton';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group bg-card border rounded-xl overflow-hidden hover:shadow-md transition-shadow animate-fade-in">
      <Link to={`/article/${article.slug}`} className="block">
        {/* Cover image */}
        <div className="relative h-52 overflow-hidden bg-muted">
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-primary/10 to-primary/5">
              {article.category === 'tech-news' ? '💻' :
               article.category === 'history' ? '🏛️' :
               article.category === 'art' ? '🎨' :
               article.category === 'geography' ? '🌍' :
               article.category === 'training' ? '📚' : '🎭'}
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        {/* Top row: category + bookmark */}
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={article.category} />
          <BookmarkButton articleId={article._id} />
        </div>

        {/* Title */}
        <Link to={`/article/${article.slug}`}>
          <h2 className="text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h2>
        </Link>

        {/* Summary */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {truncate(article.summary || '', 150)}
        </p>

        {/* Footer */}
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
        <div className="mt-3 pt-3 border-t flex items-center gap-2">
          {article.author.avatar ? (
            <img src={article.author.avatar} alt={article.author.name} className="w-6 h-6 rounded-full object-cover" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              {article.author.name[0]}
            </div>
          )}
          <span className="text-xs text-muted-foreground">{article.author.name}</span>
        </div>
      </div>
    </article>
  );
}
