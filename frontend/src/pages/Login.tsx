import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import {
  ChefHat,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Crown,
  Key,
  User,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';

export const Login: React.FC = () => {
  const { login, adminLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Mode can be 'customer' or 'admin'
  const initialMode =
    searchParams.get('role') === 'admin' ||
    searchParams.get('mode') === 'admin' ||
    (location.state as any)?.admin
      ? 'admin'
      : 'customer';

  const [mode, setMode] = useState<'customer' | 'admin'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || (mode === 'admin' ? '/admin/dashboard' : '/dashboard');

  useEffect(() => {
    const roleParam = searchParams.get('role') || searchParams.get('mode');
    if (roleParam === 'admin') {
      setMode('admin');
    }
  }, [searchParams]);

  const switchMode = (newMode: 'customer' | 'admin') => {
    setMode(newMode);
    setEmail('');
    setPassword('');
    setSearchParams(newMode === 'admin' ? { role: 'admin' } : {});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);

    if (mode === 'admin') {
      const success = await adminLogin(email, password);
      setIsLoading(false);
      if (success) {
        navigate('/admin/dashboard', { replace: true });
      }
    } else {
      const success = await login(email, password);
      setIsLoading(false);
      if (success) {
        navigate(from, { replace: true });
      }
    }
  };

  const handleDemoCustomer = () => {
    setEmail('customer@gmail.com');
    setPassword('Customer@123');
  };

  const handleFillAdmin = () => {
    setEmail('admin@adcatering.com');
    setPassword('Admin@123456');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative z-10 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-[36px] bg-[#041810]/92 backdrop-blur-2xl border border-[#D4AF37]/50 p-6 sm:p-9 shadow-[0_24px_70px_rgba(0,0,0,0.85)] space-y-5 text-[#FAF8F5] relative transition-all duration-300">
        {/* Specular Gold Top Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        {/* Top Dual Segmented Role Switcher: Customer vs Admin */}
        <div className="p-1 rounded-2xl bg-[#02100A]/90 border border-[#D4AF37]/40 grid grid-cols-2 gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => switchMode('customer')}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              mode === 'customer'
                ? 'bg-gradient-to-r from-[#0B3D26] to-[#041A12] text-[#FFDF73] border border-[#D4AF37]/70 shadow-[0_2px_10px_rgba(212,175,55,0.25)]'
                : 'text-[#94A3B8] hover:text-[#FAF8F5] hover:bg-emerald-950/40 border border-transparent'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Customer Login</span>
          </button>

          <button
            type="button"
            onClick={() => switchMode('admin')}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              mode === 'admin'
                ? 'gold-gradient-btn text-[#041810] shadow-[0_2px_14px_rgba(212,175,55,0.4)] border border-[#FFE885]'
                : 'text-[#F5CE68] hover:text-white hover:bg-emerald-950/40 border border-transparent'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#041810]/20 font-black">
              PRO
            </span>
          </button>
        </div>

        {/* Brand header */}
        <div className="text-center space-y-2 pt-1">
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] p-[1.5px] mx-auto shadow-md">
            <div className="w-full h-full bg-[#041810] rounded-[14px] flex items-center justify-center">
              {mode === 'admin' ? (
                <ShieldCheck className="w-7 h-7 text-[#F5CE68]" />
              ) : (
                <ChefHat className="w-7 h-7 text-[#F5CE68]" />
              )}
            </div>
            {mode === 'admin' && (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFF3B0] flex items-center justify-center text-[#041810] shadow-sm">
                <Crown className="w-3 h-3" />
              </div>
            )}
          </div>

          <div>
            {mode === 'admin' && (
              <span className="inline-block text-[10px] font-extrabold text-[#F5CE68] uppercase tracking-wider bg-emerald-950/90 border border-[#D4AF37]/50 px-2.5 py-0.5 rounded-full mb-1">
                Restricted Admin Access
              </span>
            )}
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
              {mode === 'admin' ? 'Administrator Portal' : 'Customer Sign In'}
            </h1>
            <p className="text-xs text-[#CBD5E1] font-normal mt-1">
              {mode === 'admin'
                ? 'Authorized management console for reservations, food items, and settings.'
                : 'Sign in to track your event bookings, view menu quotes, and save dishes.'}
            </p>
          </div>
        </div>

        {/* Demo Fast Login Pill / Admin Seed Notice */}
        {mode === 'customer' ? (
          <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-[#D4AF37]/40 flex items-center justify-between text-xs shadow-sm">
            <div>
              <p className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F5CE68]" />
                <span>Test Customer Account</span>
              </p>
              <p className="text-[11px] text-[#F5CE68] font-semibold">customer@gmail.com</p>
            </div>
            <button
              type="button"
              onClick={handleDemoCustomer}
              className="px-3 py-1.5 rounded-xl gold-gradient-btn text-[#041810] text-[10px] font-black shadow transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              Auto Fill
            </button>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-[#D4AF37]/50 flex items-center justify-between text-xs shadow-sm">
            <div>
              <div className="flex items-center gap-1.5 text-[#F5CE68] font-bold">
                <Key className="w-3.5 h-3.5" />
                <span>Seeded Admin Credentials</span>
              </div>
              <p className="text-[11px] text-[#CBD5E1] font-mono mt-0.5">
                admin@adcatering.com
              </p>
            </div>
            <button
              type="button"
              onClick={handleFillAdmin}
              className="px-3 py-1.5 rounded-xl gold-gradient-btn text-[#041810] text-[10px] font-black shadow transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              Fill Admin
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
              {mode === 'admin' ? 'Administrator Email' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={mode === 'admin' ? 'admin@adcatering.com' : 'customer@gmail.com'}
                className="w-full bg-emerald-950/80 border border-[#D4AF37]/40 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-sm transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#F5CE68]">
                {mode === 'admin' ? 'Admin Master Password' : 'Password'}
              </label>
            </div>
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
            className="w-full py-3.5 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span>Verifying {mode === 'admin' ? 'Admin Access' : 'Credentials'}...</span>
            ) : (
              <span>{mode === 'admin' ? 'Access Admin Console' : 'Sign In to Account'}</span>
            )}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Bottom Switcher Card: Allows one-click switch between Customer and Admin */}
        {mode === 'customer' ? (
          <div className="pt-2 border-t border-[#D4AF37]/25 space-y-3">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-[#041810] to-[#08281B] border border-[#D4AF37]/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FFDF73]" />
                <span className="text-[11px] text-[#FAF8F5]">Are you an Administrator?</span>
              </div>
              <button
                type="button"
                onClick={() => switchMode('admin')}
                className="text-[11px] text-[#F5CE68] hover:text-white font-extrabold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Login as Admin</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <p className="text-center text-xs text-[#CBD5E1]">
              Don't have an account yet?{' '}
              <Link to="/signup" className="text-[#F5CE68] font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        ) : (
          <div className="pt-2 border-t border-[#D4AF37]/25 space-y-2 text-center">
            <button
              type="button"
              onClick={() => switchMode('customer')}
              className="text-xs text-[#CBD5E1] hover:text-[#FFDF73] font-medium transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <span>← Switch back to Customer Sign In</span>
            </button>
            <p className="text-[11px] text-[#94A3B8]">
              Protected AD Catering & Cook Services administrative environment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
