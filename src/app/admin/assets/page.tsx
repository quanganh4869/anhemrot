"use client";

import React, { useState, useCallback } from "react";
import { UploadCloud, FileType, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock types
type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';
interface ImportJob {
  id: string;
  filename: string;
  status: JobStatus;
  progress: number;
}

export default function AssetManagerPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [activeJobs, setActiveJobs] = useState<ImportJob[]>([]);
  const [assets, setAssets] = useState<any[]>([]);

  // We mock the polling mechanism for demonstration
  const simulateUploadAndProcessing = (file: File) => {
    const jobId = Math.random().toString(36).substring(7);
    const newJob: ImportJob = { id: jobId, filename: file.name, status: 'pending', progress: 0 };
    
    setActiveJobs(prev => [newJob, ...prev]);

    // Simulate Pipeline
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20);
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setActiveJobs(prev => prev.map(j => 
          j.id === jobId ? { ...j, status: 'completed', progress: 100 } : j
        ));

        // Mock extracting assets
        if (file.type === "application/pdf") {
          setAssets(prev => [
            { id: Date.now(), filename: `${file.name} - Page 1`, type: 'image/webp' },
            { id: Date.now() + 1, filename: `${file.name} - Page 2`, type: 'image/webp' },
            ...prev
          ]);
        } else {
          setAssets(prev => [
            { id: Date.now(), filename: file.name, type: file.type },
            ...prev
          ]);
        }
      } else {
        setActiveJobs(prev => prev.map(j => 
          j.id === jobId ? { ...j, status: 'processing', progress } : j
        ));
      }
    }, 500);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach(file => {
        simulateUploadAndProcessing(file);
      });
    }
  }, []);

  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-8 flex flex-col h-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Asset & Import Manager</h1>
        <p className="text-zinc-400 mt-2">Upload PDFs or Images. Our pipeline will automatically extract high-quality assets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Zone */}
        <div className="lg:col-span-2 space-y-6">
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center transition-colors cursor-pointer bg-zinc-900/50",
              isDragging ? "border-emerald-500 bg-emerald-500/5" : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
            )}
          >
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
              <UploadCloud className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Drag & Drop files here</h3>
            <p className="text-sm text-zinc-500 max-w-sm">
              Supported formats: PDF (auto-extracted to scenes), JPG, PNG, WebP. Maximum file size 50MB.
            </p>
            <input 
              type="file" 
              className="hidden" 
              id="file-upload" 
              multiple 
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={(e) => {
                if (e.target.files) {
                  Array.from(e.target.files).forEach(file => simulateUploadAndProcessing(file));
                }
              }}
            />
            <label htmlFor="file-upload" className="mt-6 px-4 py-2 bg-white text-black font-medium rounded text-sm hover:bg-zinc-200 cursor-pointer transition">
              Browse Files
            </label>
          </div>

          {/* Active Jobs */}
          {activeJobs.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Import Pipeline Jobs</h3>
              <div className="space-y-3">
                {activeJobs.map(job => (
                  <div key={job.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex items-center gap-4">
                    <div className="p-2 bg-zinc-800 rounded">
                       {job.filename.endsWith('.pdf') ? <FileType className="w-5 h-5 text-red-400" /> : <ImageIcon className="w-5 h-5 text-blue-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">{job.filename}</span>
                        <span className="text-xs text-zinc-500">{job.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full transition-all duration-300", job.status === 'failed' ? "bg-red-500" : "bg-emerald-500")} 
                          style={{ width: `${job.progress}%` }} 
                        />
                      </div>
                    </div>
                    <div>
                      {job.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {job.status === 'processing' && <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />}
                      {job.status === 'pending' && <div className="w-5 h-5 rounded-full border-2 border-zinc-600" />}
                      {job.status === 'failed' && <AlertCircle className="w-5 h-5 text-red-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Extracted Assets */}
        <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col h-[600px]">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Extracted Assets ({assets.length})</h3>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {assets.length === 0 ? (
              <div className="text-center text-sm text-zinc-500 mt-10">No assets extracted yet. Upload a file to begin.</div>
            ) : (
              assets.map(asset => (
                <div key={asset.id} className="group relative bg-zinc-950 border border-zinc-800 rounded-lg p-3 hover:border-zinc-700 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-800 rounded flex items-center justify-center shrink-0">
                      <ImageIcon className="w-5 h-5 text-zinc-500" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium truncate">{asset.filename}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{asset.type}</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-1 rounded hover:bg-emerald-500/20">
                      + Scene Bg
                    </button>
                    <button className="text-xs bg-zinc-800 text-zinc-300 border border-zinc-700 py-1 rounded hover:bg-zinc-700">
                      + Layer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
