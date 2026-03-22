import { TrendingUpIcon } from 'lucide-react';
import { Article } from '../../types/article.types';
import ArticleCard from './ArticleCard';

const RANK_STYLES: Record<number, { label: string; className: string }> = {
  0: { label: '#1', className: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' },
  1: { label: '#2', className: 'bg-slate-400/20 text-slate-300 border border-slate-400/30' },
  2: { label: '#3', className: 'bg-orange-700/20 text-orange-400 border border-orange-700/30' },
};

function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-muted" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 bg-muted rounded-full" />
        <div className="h-4 w-full bg-muted rounded-full" />
        <div className="h-4 w-3/4 bg-muted rounded-full" />
        <div className="h-3 w-full bg-muted rounded-full mt-4" />
        <div className="h-3 w-1/2 bg-muted rounded-full" />
      </div>
    </div>
  );
}

interface PopularArticlesSectionProps {
  articles: Article[];
  loading: boolean;
}

export default function PopularArticlesSection({ articles, loading }: PopularArticlesSectionProps) {
  const ratedArticles = articles.filter((a) => a.averageRating > 0).slice(0, 6);

  if (!loading && ratedArticles.length === 0) return null;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUpIcon className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Tendances
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Articles populaires</h2>
          <p className="text-sm text-white/35 mt-1">Plébiscités par la communauté</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : ratedArticles.map((article, index) => (
              <div key={article._id} className="relative">
                {index < 3 && (
                  <span
                    className={`absolute top-3 left-3 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full ${RANK_STYLES[index].className}`}
                  >
                    {RANK_STYLES[index].label}
                  </span>
                )}
                <ArticleCard article={article} />
              </div>
            ))}
      </div>
    </div>
  );
}
