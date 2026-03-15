import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookmarkIcon, LogOutIcon, MenuIcon, MoonIcon, PencilIcon, SunIcon, UserIcon, XIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { logout } from '../../features/auth/authSlice';
import SearchBar from '../search/SearchBar';
import { CATEGORIES } from '../../constants/categories';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useTheme } from '../../hooks/useTheme';

function AZLogo({ size = 28 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-lg bg-primary flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
    >
      <span style={{ fontSize: size * 0.45 }} className="font-black text-white leading-none tracking-tighter">
        AZ
      </span>
    </div>
  );
}

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggle: toggleTheme } = useTheme();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <AZLogo size={32} />
          <span className="font-bold text-lg hidden sm:inline tracking-tight">AZ Blog</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-sm">
          <SearchBar />
        </div>

        {/* Nav desktop */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <Link
              key={cat.value}
              to={`/category/${cat.value}`}
              className="text-sm px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        {/* Auth + Theme */}
        <div className="flex items-center gap-2 shrink-0">
          {isAuthenticated && user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:flex text-muted-foreground hover:text-foreground hover:bg-accent gap-1.5 rounded-lg"
              >
                <Link to="/articles/new">
                  <PencilIcon className="w-3.5 h-3.5" />
                  <span>Écrire</span>
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-8 h-8 rounded-full ring-2 ring-primary/30 hover:ring-primary/70 transition-all overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {user.name[0].toUpperCase()}
                      </div>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl">
                  <div className="px-3 py-2 text-sm font-semibold">{user.name}</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 rounded-lg">
                      <UserIcon className="w-4 h-4" /> Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favorites" className="flex items-center gap-2 rounded-lg">
                      <BookmarkIcon className="w-4 h-4" /> Favoris
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/articles/new" className="flex items-center gap-2 rounded-lg">
                      <PencilIcon className="w-4 h-4" /> Écrire un article
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-destructive rounded-lg"
                  >
                    <LogOutIcon className="w-4 h-4" /> Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg"
              >
                <Link to="/login">Connexion</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-primary hover:bg-primary/90 text-white border-0 rounded-lg shadow-md shadow-primary/20"
              >
                <Link to="/register">S'inscrire</Link>
              </Button>
            </>
          )}

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Basculer le thème"
          >
            {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </Button>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container py-3 flex flex-col gap-0.5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                to={`/category/${cat.value}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
              >
                {cat.emoji} {cat.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
