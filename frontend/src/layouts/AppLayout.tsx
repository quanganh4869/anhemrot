import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useEffect } from 'react';

export default function AppLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-paper relative selection:bg-story-gold selection:bg-opacity-30">
      <header className="sticky top-0 z-40 w-full bg-paper/80 backdrop-blur-md border-b border-ink/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-ink text-paper flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <BookOpen size={20} className="stroke-[2.5]" />
            </div>
            <span className="font-display font-bold text-xl tracking-wide text-ink">
              TaleWeaver
            </span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="text-sm font-medium text-ink hover:text-story-blue transition-colors">Library</Link>
            <a href="#" className="text-sm font-medium text-ink/60 hover:text-ink transition-colors">About</a>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="w-full border-t border-ink/10 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <BookOpen size={16} />
            <span className="font-display font-semibold tracking-wider text-sm">TaleWeaver</span>
          </div>
          <p className="text-sm text-ink/50">
            © {new Date().getFullYear()} TaleWeaver Demo. Crafted for storytelling.
          </p>
        </div>
      </footer>
    </div>
  );
}
