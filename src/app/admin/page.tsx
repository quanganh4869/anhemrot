import React from "react";
import { Users, BookOpen, Eye, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Stories", value: "24", icon: BookOpen },
    { label: "Total Views", value: "1.2M", icon: Eye },
    { label: "Active Readers", value: "8,400", icon: Users },
    { label: "Completion Rate", value: "68%", icon: TrendingUp },
  ];

  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-zinc-400 mt-2">Welcome back to StoryAdmin. Here is what is happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-zinc-800 rounded-lg">
                <stat.icon className="w-6 h-6 text-zinc-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
