import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Article } from '../../types/article.types';
import CategoryBadge from '../articles/CategoryBadge';
import StarRating from '../ratings/StarRating';
import BookmarkButton from '../common/BookmarkButton';
import { formatDate } from '../../lib/utils';

interface HeroSectionProps {
  articles: Article[];
  loading?: boolean;
}

function HeroSkeleton() {
  return (
    <div className="relative h-[480px] rounded-2xl overflow-hidden bg-muted animate-pulse">
      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-3">
        <div className="h-4 w-20 bg-muted-foreground/20 rounded-full" />
        <div className="h-8 bg-muted-foreground/20 rounded" />
        <div className="h-6 w-2/3 bg-muted-foreground/20 rounded" />
      </div>
    </div>
  );
}

export default function HeroSection({ articles, loading }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!articles.length) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % articles.length), 5000);
    return () => clearInterval(t);
  }, [articles.length]);

  if (loading) return <HeroSkeleton />;
  if (!articles.length) return null;

  const article = articles[current];

  return (
    <section className="relative h-[480px] rounded-2xl overflow-hidden group">
      {/* Background image */}
      <div className="absolute inset-0">
        {article.coverImage ? (
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover transition-all duration-700" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center text-8xl">
            {article.category === 'tech-news' ? '💻' :
             article.category === 'history' ? '🏛️' :
             article.category === 'art' ? '🎨' :
             article.category === 'geography' ? '🌍' :
             article.category === 'training' ? '📚' : '🎭'}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CategoryBadge category={article.category} asLink={false} />
            <Link to={`/article/${article.slug}`}>
              <h1 className="mt-2 text-2xl md:text-3xl font-bold leading-tight hover:underline line-clamp-2">
                {article.title}
              </h1>
            </Link>
            <p className="mt-2 text-sm text-white/80 line-clamp-2 max-w-2xl">{article.summary}</p>
            <div className="mt-3 flex items-center gap-4 text-sm text-white/70">
              <StarRating value={article.averageRating} size="sm" />
              <span>{article.author.name}</span>
              <span>{formatDate(article.createdAt)}</span>
            </div>
          </div>
          <BookmarkButton articleId={article._id} className="text-white hover:text-white hover:bg-white/20" />
        </div>
      </div>

      {/* Navigation arrows */}
      {articles.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((c) => (c - 1 + articles.length) % articles.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % articles.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 right-8 flex gap-1.5">
            {articles.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-5' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
