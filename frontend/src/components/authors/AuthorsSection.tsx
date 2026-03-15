import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/store';

interface AuthorStats {
  _id: string;
  name: string;
  avatar: string;
  articleCount: number;
  totalViews: number;
}

function buildAuthorStats(articles: { author: { _id: string; name: string; avatar: string }; viewsCount: number }[]): AuthorStats[] {
  const map = new Map<string, AuthorStats>();
  for (const article of articles) {
    const { _id, name, avatar } = article.author;
    if (!map.has(_id)) {
      map.set(_id, { _id, name, avatar, articleCount: 0, totalViews: 0 });
    }
    const entry = map.get(_id)!;
    entry.articleCount += 1;
    entry.totalViews += article.viewsCount;
  }
  return [...map.values()].sort((a, b) => b.totalViews - a.totalViews);
}

export default function AuthorsSection() {
  const { all, allLoading } = useAppSelector((s) => s.articles);
  const authors = buildAuthorStats(all);

  if (allLoading) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">Nos auteurs</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5 animate-pulse">
              <div className="w-14 h-14 rounded-xl bg-muted mx-auto mb-3" />
              <div className="h-4 bg-muted rounded mx-auto w-2/3 mb-2" />
              <div className="h-3 bg-muted rounded mx-auto w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!authors.length) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="text-xs font-semibold text-primary uppercase tracking-widest">Nos auteurs</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {authors.map((author) => (
          <Link
            key={author._id}
            to={`/author/${author._id}`}
            className="group bg-card border border-border rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-200 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(124,92,252,0.08)]"
          >
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-14 h-14 rounded-xl object-cover ring-2 ring-border group-hover:ring-primary/30 transition-all mb-3"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center text-xl font-bold text-primary ring-2 ring-border group-hover:ring-primary/30 transition-all mb-3">
                {author.name[0]}
              </div>
            )}
            <p className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-1">
              {author.name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {author.articleCount} article{author.articleCount > 1 ? 's' : ''}
            </p>
            <p className="text-xs text-muted-foreground">
              {author.totalViews.toLocaleString()} vues
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
