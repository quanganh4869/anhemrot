import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-twilight text-white py-12 mt-16 border-t-[16px] border-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold text-firefly-glow mb-4">
              Stories for Kids
            </h3>
            <p className="text-slate-300 mb-6 max-w-md">
              Free and original kids stories read online by kids, parents, teachers, and guardians all over the world!
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-3 bg-slate-800 rounded-full hover:bg-accent transition-colors font-bold text-xs flex items-center justify-center w-10 h-10">
                FB
              </Link>
              <Link href="#" className="p-3 bg-slate-800 rounded-full hover:bg-accent transition-colors font-bold text-xs flex items-center justify-center w-10 h-10">
                TW
              </Link>
              <Link href="#" className="p-3 bg-slate-800 rounded-full hover:bg-accent transition-colors font-bold text-xs flex items-center justify-center w-10 h-10">
                IG
              </Link>
              <Link href="#" className="p-3 bg-slate-800 rounded-full hover:bg-accent transition-colors font-bold text-xs flex items-center justify-center w-10 h-10">
                YT
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-300 hover:text-firefly-glow transition-colors">Home</Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-firefly-glow transition-colors">All Stories</Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-firefly-glow transition-colors">About the Author</Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-firefly-glow transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-300 hover:text-firefly-glow transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-firefly-glow transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 hover:text-firefly-glow transition-colors">Cookies Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-700 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Stories for Kids. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
