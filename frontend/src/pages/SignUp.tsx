import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import toast from 'react-hot-toast';
import { ChefHat, Mail, Lock, User, Phone, ArrowRight, ShieldCheck, Crown } from 'lucide-react';

export const SignUp: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    // Phone validation
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      toast.error('Please provide a valid 10-digit Indian mobile number.');
      return;
    }

    setIsLoading(true);
    const success = await register(formData);
    setIsLoading(false);

    if (success) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative z-10 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-[36px] bg-[#041810]/90 backdrop-blur-2xl border border-[#D4AF37]/50 p-8 sm:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.8)] space-y-6 text-[#FAF8F5] relative">
        {/* Specular Gold Top Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F5CE68] p-[1.5px] mx-auto shadow-md">
            <div className="w-full h-full bg-[#041810] rounded-[14px] flex items-center justify-center">
              <ChefHat className="w-7 h-7 text-[#F5CE68]" />
            </div>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">Create Customer Account</h1>
          <p className="text-xs text-[#CBD5E1] font-normal">
            Join AD Catering to manage wedding feasts, book master cooks, and customize your menus.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Rohan Pattnaik"
                className="w-full bg-emerald-950/80 border border-[#D4AF37]/40 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="rohan@example.com"
                className="w-full bg-emerald-950/80 border border-[#D4AF37]/40 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
              Mobile Phone (WhatsApp) *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 99377 82778"
                className="w-full bg-emerald-950/80 border border-[#D4AF37]/40 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
              Create Password (min 6 chars) *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-emerald-950/80 border border-[#D4AF37]/40 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#F5CE68] mb-1.5">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-emerald-950/80 border border-[#D4AF37]/40 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl gold-gradient-btn text-xs font-black text-[#041810] shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? <span>Creating Account...</span> : <span>Create Account</span>}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#D4AF37]/25">
          <p className="text-xs text-[#CBD5E1]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#F5CE68] font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
