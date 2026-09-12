"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide standard sidebar for full-screen Visual Editors
  const isEditor = pathname.includes("/scenes/") || pathname.includes("/editor/");

  if (isEditor) {
    return <div className="w-full h-screen bg-zinc-950 text-white font-sans overflow-hidden">{children}</div>;
  }

  return (
    <div className="flex w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {children}
      </main>
    </div>
  );
}
