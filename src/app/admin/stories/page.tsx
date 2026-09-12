import React from "react";
import Link from "next/link";
import { Plus, Search, Edit2, MoreVertical, BookOpen } from "lucide-react";

export default function StoriesPage() {
  // Mock data
  const stories = [
    { id: "1", title: "Ác Mộng Và Giấc Mơ Đẹp", status: "Published", chapters: 3, views: "12K", updated: "2 hrs ago" },
    { id: "2", title: "Biên Niên Sử Vùng Đất Chết", status: "Draft", chapters: 1, views: "-", updated: "1 day ago" },
    { id: "3", title: "Cô Bé Quàng Khăn Đỏ (Bản Ngược)", status: "Archived", chapters: 10, views: "45K", updated: "1 month ago" },
  ];

  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-6 flex flex-col h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stories</h1>
          <p className="text-zinc-400 mt-2">Manage your interactive stories and publications.</p>
        </div>
        <button className="bg-white text-black px-4 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 hover:bg-zinc-200 transition">
          <Plus className="w-4 h-4" />
          Create Story
        </button>
      </div>

      <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-2 rounded-lg">
        <Search className="w-5 h-5 text-zinc-500 ml-2" />
        <input 
          type="text" 
          placeholder="Search stories by title..." 
          className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-zinc-500"
        />
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex-1">
        <table className="w-full text-left text-sm text-zinc-300">
          <thead className="bg-zinc-800/50 text-zinc-400 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Chapters</th>
              <th className="px-6 py-4">Views</th>
              <th className="px-6 py-4">Last Updated</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {stories.map(story => (
              <tr key={story.id} className="hover:bg-zinc-800/50 transition group">
                <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-zinc-500" />
                  </div>
                  {story.title}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    story.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                    story.status === 'Draft' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                  }`}>
                    {story.status}
                  </span>
                </td>
                <td className="px-6 py-4">{story.chapters}</td>
                <td className="px-6 py-4">{story.views}</td>
                <td className="px-6 py-4">{story.updated}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link 
                    href={`/admin/stories/${story.id}/scenes/demo-scene`}
                    className="p-2 inline-flex text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button className="p-2 inline-flex text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
