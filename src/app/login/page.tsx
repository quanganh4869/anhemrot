"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore(state => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      // OAuth2 uses form-urlencoded
      const formData = new URLSearchParams();
      formData.append('username', email); // email maps to username in OAuth2
      formData.append('password', password);

      const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to login');
      }

      const { access_token } = await response.json();

      // Fetch user profile
      const userRes = await fetch(`${apiUrl}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      const user = await userRes.json();

      setAuth(user, access_token);
      
      if (user.role === 'admin') {
        router.push('/admin/stories');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-2xl font-serif text-white mb-2">Welcome Back</h1>
        <p className="text-zinc-400 mb-8">Sign in to access your library and dashboard.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Email</label>
            <input 
              type="email"
              required
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-3 focus:outline-none focus:border-emerald-500 transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Password</label>
            <input 
              type="password"
              required
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded p-3 focus:outline-none focus:border-emerald-500 transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium p-3 rounded mt-4 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
