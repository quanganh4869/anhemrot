import Link from "next/link";
import { Menu, BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-firefly-glow p-2 rounded-full text-twilight group-hover:scale-110 transition-transform">
              <BookOpen size={24} />
            </div>
            <span className="font-display text-xl font-bold text-twilight sm:text-2xl tracking-wide">
              Stories for Kids
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold text-twilight hover:text-accent transition-colors">
            Home
          </Link>
          <Link href="#" className="text-sm font-semibold text-twilight hover:text-accent transition-colors">
            All Stories
          </Link>
          <Link href="#" className="text-sm font-semibold text-twilight hover:text-accent transition-colors">
            About the Author
          </Link>
          <Link href="#" className="text-sm font-semibold text-twilight hover:text-accent transition-colors">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="hidden md:block rounded-full bg-accent px-5 py-2 text-sm font-bold text-white hover:bg-sky-400 transition-colors shadow-sm">
            Subscribe
          </button>
          <button className="md:hidden p-2 text-twilight">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
