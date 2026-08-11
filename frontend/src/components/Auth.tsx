import React, { useState } from 'react';
import { Mail, Lock, Building2, ArrowLeft } from 'lucide-react';
import { User } from '../types';
import api from '../api';

interface AuthProps {
  onLoginSuccess: (token: string, user: User) => void;
  onGoToLanding?: () => void;
  initialEmail?: string;
}

export default function Auth({ onLoginSuccess, onGoToLanding, initialEmail = '' }: AuthProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      onLoginSuccess(response.data.token, response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-md border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 relative">
        {onGoToLanding && (
          <button
            onClick={onGoToLanding}
            className="absolute top-6 left-6 text-xs text-slate-400 hover:text-white transition flex items-center space-x-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>
        )}

        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="p-3 bg-gradient-to-tr from-sky-500 to-blue-600 rounded-2xl shadow-xl shadow-sky-500/20">
            <Building2 className="w-8 h-8 text-white animate-bounce" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Fundsroom Wholesale ERP</h2>
            <p className="text-xs text-slate-400 mt-1">Please sign in to access your dashboard</p>
          </div>
        </div>

        {error && (
          <div className="bg-rose-950/40 border border-rose-800/50 text-rose-400 text-xs px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@fundsroom.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-850 hover:border-slate-750 focus:border-sky-500 focus:outline-none rounded-xl text-sm transition text-slate-200"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-850 hover:border-slate-750 focus:border-sky-500 focus:outline-none rounded-xl text-sm transition text-slate-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-sky-500/10 active:scale-[0.98] transition duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

      </div>
    </div>
  );
}
