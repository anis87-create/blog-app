import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, BookOpenIcon, EyeIcon, MessageCircleIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { fetchAllArticles } from '../features/articles/articlesSlice';
import { MOCK_ARTICLES } from '../mocks/articles.mock';
import { Article } from '../types/article.types';
import ArticleCard from '../components/articles/ArticleCard';
import Loader from '../components/ui/Loader';

export default function AuthorPage() {
  const { authorId } = useParams<{ authorId: string }>();
  const dispatch = useAppDispatch();
  const { all, allLoading } = useAppSelector((s) => s.articles);

  useEffect(() => {
    if (!all.length) dispatch(fetchAllArticles());
  }, []);

  // Articles réels depuis la DB pour cet auteur
  const dbArticles = all.filter((a) => a.author._id === authorId);

  // Articles mock pour cet auteur (sans doublons avec la DB)
  const mockArticles: Article[] = MOCK_ARTICLES.filter(
    (m) => m.author._id === authorId && !dbArticles.some((db) => db.slug === m.slug)
  );

  const articles = [...dbArticles, ...mockArticles];

  // Auteur : depuis DB si dispo, sinon depuis les mocks
  const author = articles[0]?.author ?? null;

  if (allLoading) return <Loader />;

  if (!author) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Auteur introuvable.</p>
        <Link to="/" className="mt-4 inline-flex items-center gap-2 text-primary hover:underline text-sm">
          <ArrowLeftIcon className="w-4 h-4" /> Retour à l'accueil
        </Link>
      </div>
    );
  }

  const totalViews = articles.reduce((sum, a) => sum + a.viewsCount, 0);
  const totalComments = articles.reduce((sum, a) => sum + a.commentsCount, 0);
  const avgRating = articles.length
    ? (articles.reduce((sum, a) => sum + a.averageRating, 0) / articles.length).toFixed(1)
    : '0';

  return (
    <div className="container py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeftIcon className="w-4 h-4" /> Retour
      </Link>

      {/* Profil auteur */}
      <div className="bg-card border border-border rounded-2xl p-8 mb-10 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-primary/20"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center text-2xl font-bold text-primary">
              {author.name[0]}
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight">{author.name}</h1>
            <p className="text-muted-foreground text-sm mt-1">Auteur sur AZ Blog</p>

            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <BookOpenIcon className="w-4 h-4 text-primary" />
                <span><strong className="text-foreground">{articles.length}</strong> articles</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <EyeIcon className="w-4 h-4 text-primary" />
                <span><strong className="text-foreground">{totalViews.toLocaleString()}</strong> vues</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MessageCircleIcon className="w-4 h-4 text-primary" />
                <span><strong className="text-foreground">{totalComments}</strong> commentaires</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="text-primary">★</span>
                <span><strong className="text-foreground">{avgRating}</strong> note moyenne</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles */}
      <h2 className="text-xl font-bold mb-6 tracking-tight">
        Articles de {author.name}
        <span className="ml-2 text-sm font-normal text-muted-foreground">({articles.length})</span>
      </h2>

      {articles.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">Aucun article pour cet auteur.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
