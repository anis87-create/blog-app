import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../constants/categories';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-xs font-black text-white tracking-tighter">AZ</span>
            </div>
            <h3 className="font-bold tracking-tight">AZ Blog</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Articles sur les nouvelles technologies, la culture générale et la formation.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-muted-foreground text-xs mb-4 uppercase tracking-widest">Catégories</h4>
          <ul className="space-y-2.5">
            {CATEGORIES.map((cat) => (
              <li key={cat.value}>
                <Link
                  to={`/category/${cat.value}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-muted-foreground text-xs mb-4 uppercase tracking-widest">Compte</h4>
          <ul className="space-y-2.5">
            <li>
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Connexion
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Inscription
              </Link>
            </li>
            <li>
              <Link to="/articles/new" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Écrire un article
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5">
        <div className="container flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AZ Blog. Tous droits réservés.
          </span>
          <span className="text-xs text-muted-foreground/50 font-medium tracking-wide">by Anis Zarrouk</span>
        </div>
      </div>
    </footer>
  );
}
