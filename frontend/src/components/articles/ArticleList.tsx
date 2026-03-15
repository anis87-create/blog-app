import { Article } from '../../types/article.types';
import ArticleCard from './ArticleCard';

interface ArticleListProps {
  articles: Article[];
  loading?: boolean;
}

function SkeletonCard() {
  return (
    <div className="bg-card border rounded-xl overflow-hidden">
      <div className="h-52 bg-muted animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-24 bg-muted rounded-full animate-pulse" />
        <div className="h-5 bg-muted rounded animate-pulse" />
        <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
        <div className="h-3 bg-muted rounded animate-pulse" />
        <div className="h-3 w-5/6 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}

export default function ArticleList({ articles, loading }: ArticleListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p className="text-4xl mb-3">📭</p>
        <p className="text-lg font-medium">Aucun article trouvé</p>
        <p className="text-sm mt-1">Essayez une autre recherche ou catégorie.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
}
