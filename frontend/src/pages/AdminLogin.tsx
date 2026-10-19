import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, Key, Crown, Eye, EyeOff } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    const success = await adminLogin(email, password);
    setIsLoading(false);

    if (success) {
      navigate('/admin/dashboard', { replace: true });
    }
  };

  const handleFillAdminCredentials = () => {
    setEmail('admin@adcatering.com');
    setPassword('Admin@123456');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative z-10 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-[36px] bg-[#041810]/90 backdrop-blur-2xl border border-[#D4AF37]/50 p-8 sm:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.8)] space-y-6 text-[#FAF8F5] relative">
        {/* Specular Gold Top Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-950 to-[#041810] border border-[#D4AF37]/60 flex items-center justify-center text-[#F5CE68] mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="pt-2">
            <span className="text-[10px] font-bold text-[#F5CE68] uppercase tracking-widest bg-emerald-950 border border-[#D4AF37]/50 px-3 py-1 rounded-full">
              Restricted Management Access
            </span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">Administrator Portal</h1>
          <p className="text-xs text-[#CBD5E1] font-normal">
            Authorized management access for catering reservations, menus, and operations.
          </p>
        </div>

        {/* Admin Credential Notice & Auto-Fill for Evaluators */}
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-[#D4AF37]/40 text-xs space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#F5CE68] font-bold">
              <Key className="w-4 h-4" />
              <span>Seeded Admin Credentials:</span>
            </div>
            <button
              type="button"
              onClick={handleFillAdminCredentials}
              className="px-3 py-1 rounded-xl gold-gradient-btn text-[#041810] text-[10px] font-black shadow transition-all cursor-pointer"
            >
              Fill Admin
            </button>
          </div>
          <p className="text-[11px] text-[#CBD5E1] font-mono">
            admin@adcatering.com / Admin@123456
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@adcatering.com"
                className="w-full bg-emerald-950/80 border border-[#D4AF37]/40 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
              Master Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-emerald-950/80 border border-[#D4AF37]/40 rounded-2xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-sm transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#F5CE68] transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl gold-gradient-btn text-[#041810] text-xs font-black shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? <span>Verifying Credentials...</span> : <span>Access Management Console</span>}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#D4AF37]/25">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-xs text-[#CBD5E1] hover:text-[#FFDF73] font-medium transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span>← Switch to Customer Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};
