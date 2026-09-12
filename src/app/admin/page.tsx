import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminDashboard() {
  const recentStories = [
    { id: "1", title: "A Nightmare That Wanted To Become A Beautiful Dream", status: "Published", lastEdited: "2 hours ago", chapters: 3 },
    { id: "2", title: "How Firefly Got His Light", status: "Draft", lastEdited: "1 day ago", chapters: 1 },
    { id: "3", title: "The Silent Echo", status: "In Progress", lastEdited: "3 days ago", chapters: 5 },
  ];

  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-8 font-sans">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">Workspace Overview</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage your active storytelling projects.</p>
        </div>
        <Link 
          href="/admin/stories/new" 
          className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-black text-sm font-medium hover:bg-zinc-300 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Story
        </Link>
      </div>

      <div>
        <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">Recent Projects</h2>
        <div className="w-full bg-zinc-900/50 border border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900 text-zinc-500 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Chapters</th>
                <th className="px-6 py-3 font-medium">Last Edited</th>
                <th className="px-6 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {recentStories.map((story) => (
                <tr key={story.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-100">{story.title}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium border border-zinc-700 bg-zinc-800/50 px-2 py-1 uppercase tracking-widest text-zinc-300">
                      {story.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{story.chapters}</td>
                  <td className="px-6 py-4 text-zinc-500">{story.lastEdited}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/stories/${story.id}`} className="text-blue-400 hover:text-blue-300 font-medium">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
