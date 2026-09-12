import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, 
  Image as ImageIcon, 
  BarChart3, 
  Tags, 
  Settings, 
  LayoutDashboard,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Workspace", href: "/admin", icon: LayoutDashboard },
  { name: "Stories", href: "/admin/stories", icon: BookOpen },
  { name: "Assets", href: "/admin/assets", icon: ImageIcon },
  { name: "Categories", href: "/admin/categories", icon: Tags },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-900 h-screen flex flex-col sticky top-0 text-zinc-400 font-sans">
      <div className="h-14 flex items-center px-6 border-b border-zinc-900">
        <span className="font-bold text-sm text-zinc-100 uppercase tracking-widest">StoryAdmin</span>
      </div>

      <nav className="flex-1 py-4 flex flex-col overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-6 py-2 text-sm font-medium transition-colors border-l-2",
                isActive 
                  ? "border-zinc-100 bg-zinc-900/50 text-zinc-100" 
                  : "border-transparent hover:text-zinc-200"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-zinc-100" : "text-zinc-500")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-900 p-2">
        <button className="flex items-center gap-3 px-4 py-2 w-full text-sm font-medium text-zinc-500 hover:text-zinc-200 transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
