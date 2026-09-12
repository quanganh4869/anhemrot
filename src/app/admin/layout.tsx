"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useAuthStore } from "@/features/auth/store";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && user && user.role !== 'admin') {
      router.push("/");
    }
  }, [user, isLoading, router]);

  const pathname = usePathname();
  
  // Hide standard sidebar for full-screen Visual Editors
  const isEditor = pathname.includes("/scenes/") || pathname.includes("/editor/");

  if (isLoading || (user && user.role !== 'admin')) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  if (isEditor) {
    return <div className="w-full h-screen bg-black text-white font-sans overflow-hidden">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-0">
        {children}
      </main>
    </div>
  );
}
