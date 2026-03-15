import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../constants/categories';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40 mt-16">
      <div className="container py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3">📰 TechBlog</h3>
          <p className="text-sm text-muted-foreground">
            Articles sur les nouvelles technologies, la culture générale et la formation.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Catégories</h4>
          <ul className="space-y-1">
            {CATEGORIES.map((cat) => (
              <li key={cat.value}>
                <Link
                  to={`/category/${cat.value}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {cat.emoji} {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Liens</h4>
          <ul className="space-y-1">
            <li><Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Connexion</Link></li>
            <li><Link to="/register" className="text-sm text-muted-foreground hover:text-foreground">Inscription</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TechBlog. Tous droits réservés.
      </div>
    </footer>
  );
}
