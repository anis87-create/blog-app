import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Article } from '../../types/article.types';
import { formatDate } from '../../lib/utils';
import BookmarkButton from '../common/BookmarkButton';

interface HeroSectionProps {
  articles: Article[];
  loading?: boolean;
}

const categoryEmoji: Record<string, string> = {
  'tech-news': '💻',
  'history': '🏛️',
  'art': '🎨',
  'geography': '🌍',
  'training': '📚',
};

const categoryLabel: Record<string, string> = {
  'tech-news': 'Tech',
  'history': 'Histoire',
  'art': 'Art',
  'geography': 'Géographie',
  'training': 'Formation',
};

function HeroSkeleton() {
  return (
    <div className="bg-[#131313] rounded-2xl overflow-hidden animate-pulse">
      <div className="grid md:grid-cols-[1fr_1.4fr] gap-0 min-h-[480px]">
        <div className="flex flex-col justify-center p-10 md:p-14 space-y-5">
          <div className="h-4 w-20 bg-white/10 rounded" />
          <div className="space-y-3">
            <div className="h-10 bg-white/10 rounded" />
            <div className="h-10 w-4/5 bg-white/10 rounded" />
            <div className="h-10 w-3/5 bg-white/10 rounded" />
          </div>
          <div className="h-4 w-48 bg-white/10 rounded" />
        </div>
        <div className="bg-white/5 min-h-[320px] md:min-h-0" />
      </div>
    </div>
  );
}

export default function HeroSection({ articles, loading }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!articles.length) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % articles.length), 6000);
    return () => clearInterval(t);
  }, [articles.length]);

  if (loading) return <HeroSkeleton />;
  if (!articles.length) return null;

  const article = articles[current];

  return (
    <section className="bg-[#131313] rounded-2xl overflow-hidden group">
      <div className="grid md:grid-cols-[1fr_1.4fr]">

        {/* ── LEFT: texte editorial ── */}
        <div className="flex flex-col justify-between p-8 md:p-12 lg:p-14 min-h-[320px] md:min-h-[500px]">
          <div className="flex-1 flex flex-col justify-center">
            {/* Catégorie */}
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
              {categoryEmoji[article.category]} {categoryLabel[article.category] || article.category}
            </span>

            {/* Titre */}
            <Link to={`/article/${article.slug}`}>
              <h1
                className="font-bold text-white leading-[1.1] hover:text-primary transition-colors duration-200"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
              >
                {article.title}
              </h1>
            </Link>

            {/* Résumé */}
            <p className="mt-4 text-white/45 leading-relaxed line-clamp-3 text-sm md:text-base max-w-sm">
              {article.summary}
            </p>
          </div>

          {/* Footer: auteur + date + bookmark + nav */}
          <div className="mt-8 pt-6 border-t border-white/[0.08]">
            <div className="flex items-center justify-between">
              <Link
                to={`/author/${article.author._id}`}
                className="flex items-center gap-3 group/author"
              >
                {article.author.avatar ? (
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-white/15"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/25 flex items-center justify-center text-sm font-bold text-primary">
                    {article.author.name[0]}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-white/80 group-hover/author:text-primary transition-colors">
                    {article.author.name}
                  </p>
                  <p className="text-xs text-white/35">{formatDate(article.createdAt)}</p>
                </div>
              </Link>

              <div className="flex items-center gap-2">
                <BookmarkButton
                  articleId={article._id}
                  className="text-white/40 hover:text-white transition-colors"
                />

                {/* Navigation */}
                {articles.length > 1 && (
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => setCurrent((c) => (c - 1 + articles.length) % articles.length)}
                      className="w-8 h-8 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/[0.07] flex items-center justify-center text-white/50 hover:text-white transition-all"
                    >
                      <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrent((c) => (c + 1) % articles.length)}
                      className="w-8 h-8 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/[0.07] flex items-center justify-center text-white/50 hover:text-white transition-all"
                    >
                      <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Dots */}
            {articles.length > 1 && (
              <div className="flex gap-1.5 mt-4">
                {articles.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === current ? 'bg-primary w-8' : 'bg-white/20 w-4 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: image grand format ── */}
        <Link
          to={`/article/${article.slug}`}
          className="block relative overflow-hidden min-h-[280px] md:min-h-0"
        >
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              style={{ aspectRatio: '16/9', minHeight: '100%' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl bg-gradient-to-br from-primary/15 to-primary/5 min-h-[280px]">
              {categoryEmoji[article.category] || '🎭'}
            </div>
          )}
        </Link>

      </div>
    </section>
  );
}
