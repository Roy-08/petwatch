/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Icons = {
  Paw: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M8.5 3.5c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zm7 0c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zM5 10c1.1 0 2 1.1 2 2.5S6.1 15 5 15s-2-1.1-2-2.5S3.9 10 5 10zm14 0c1.1 0 2 1.1 2 2.5s-.9 2.5-2 2.5-2-1.1-2-2.5.9-2.5 2-2.5zm-7 2c2.2 0 4 2.2 4 5 0 1.7-1.3 3-3 3h-2c-1.7 0-3-1.3-3-3 0-2.8 1.8-5 4-5z"/>
    </svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  Lock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Eye: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  EyeOff: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Loader: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  ),
  Heart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  ),
};

// Password strength checker
function getPasswordStrength(password: string): { level: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: 'Weak', color: 'bg-red-500' };
  if (score <= 2) return { level: 2, label: 'Fair', color: 'bg-orange-500' };
  if (score <= 3) return { level: 3, label: 'Good', color: 'bg-yellow-500' };
  if (score <= 4) return { level: 4, label: 'Strong', color: 'bg-emerald-500' };
  return { level: 5, label: 'Very Strong', color: 'bg-green-500' };
}

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const passwordStrength = getPasswordStrength(password);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    setMounted(true);
    const user = localStorage.getItem('pawmatch_user');
    if (user) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        localStorage.setItem('pawmatch_user', JSON.stringify(data.data));
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0c0a09] text-white overflow-hidden">
      <style jsx>{`
        @keyframes float-up {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.1; }
          90% { opacity: 0.1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 146, 60, 0.2); }
          50% { box-shadow: 0 0 40px rgba(251, 146, 60, 0.4), 0 0 80px rgba(244, 63, 94, 0.15); }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-10px) rotate(0deg) scale(0); opacity: 0; }
          20% { transform: translateY(0) rotate(90deg) scale(1); opacity: 1; }
          100% { transform: translateY(100px) rotate(720deg) scale(0); opacity: 0; }
        }
        @keyframes success-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.2); }
          50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.4); }
        }
        .animate-float-up { animation: float-up linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-slide-left { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-slide-right { animation: slide-in-right 0.8s ease-out forwards; }
        .animate-fade-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-gentle-float { animation: gentle-float 4s ease-in-out infinite; }
        .animate-confetti { animation: confetti-fall 2s ease-out forwards; }
        .animate-success-pulse { animation: success-pulse 2s ease-in-out infinite; }
        .shimmer-line {
          background: linear-gradient(90deg, transparent, rgba(244, 63, 94, 0.15), transparent);
          background-size: 200% 100%;
          animation: shimmer 4s linear infinite;
        }
        .glass-effect {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .input-glow:focus-within {
          box-shadow: 0 0 0 1px rgba(244, 63, 94, 0.3), 0 0 20px rgba(244, 63, 94, 0.08);
        }
      `}</style>

      {/* Left Side - Signup Form */}
      <div className={`w-full lg:w-[45%] flex items-center justify-center px-6 sm:px-10 py-8 relative ${mounted ? 'animate-slide-left' : 'opacity-0'}`}>
        {/* Background accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-rose-500/[0.04] rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-orange-500/[0.04] rounded-full blur-[100px]" />
        </div>

        <div className="w-full max-w-[420px] relative z-10">
          {/* Mobile Logo */}
          <div className="text-center mb-6 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/20">
                <Icons.Paw />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                PawMatch
              </span>
            </Link>
          </div>

          {/* Form Card */}
          <div className="glass-effect bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            {/* Top shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-px shimmer-line" />

            {success ? (
              <div className="text-center py-8 relative">
                {/* Confetti particles */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-confetti"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: '30%',
                      animationDelay: `${Math.random() * 0.5}s`,
                      width: '8px',
                      height: '8px',
                      borderRadius: i % 2 === 0 ? '50%' : '2px',
                      backgroundColor: ['#f43f5e', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7'][i % 6],
                    }}
                  />
                ))}
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white shadow-lg animate-success-pulse">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-3 text-white tracking-tight">Welcome to PawMatch! 🎉</h2>
                <p className="text-gray-400 mb-2 leading-relaxed">
                  Your account has been created successfully.
                </p>
                <p className="text-gray-600 text-sm mb-6">A verification email has been sent to your inbox.</p>
                <div className="flex items-center justify-center gap-2 text-orange-400 text-sm">
                  <Icons.Loader />
                  <span>Redirecting to dashboard...</span>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/[0.08] border border-rose-500/[0.12] text-rose-400 text-xs font-medium mb-5">
                    <Icons.Sparkles />
                    <span>Start your pet journey!</span>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
                  <p className="text-gray-500 text-sm">Join PawMatch and find your perfect companion</p>
                </div>

                {/* Error */}
                {error && (
                  <div className="mb-5 p-3.5 rounded-xl bg-red-500/[0.08] border border-red-500/[0.12] text-red-400 text-sm flex items-center gap-2.5">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                    </svg>
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="animate-fade-up" style={{ animationDelay: '0.05s' }}>
                    <label className="block text-sm font-medium mb-1.5 text-gray-400">Full Name</label>
                    <div className="relative group input-glow rounded-xl transition-all duration-300">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-rose-400 transition-colors duration-300">
                        <Icons.User />
                      </span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-gray-600 focus:outline-none focus:border-rose-500/30 transition-all duration-300 hover:bg-white/[0.06]"
                      />
                    </div>
                  </div>

                  <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                    <label className="block text-sm font-medium mb-1.5 text-gray-400">Email</label>
                    <div className="relative group input-glow rounded-xl transition-all duration-300">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-rose-400 transition-colors duration-300">
                        <Icons.Mail />
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-gray-600 focus:outline-none focus:border-rose-500/30 transition-all duration-300 hover:bg-white/[0.06]"
                      />
                    </div>
                  </div>

                  <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
                    <label className="block text-sm font-medium mb-1.5 text-gray-400">Password</label>
                    <div className="relative group input-glow rounded-xl transition-all duration-300">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-rose-400 transition-colors duration-300">
                        <Icons.Lock />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                        required
                        minLength={6}
                        className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-gray-600 focus:outline-none focus:border-rose-500/30 transition-all duration-300 hover:bg-white/[0.06]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                      >
                        {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                      </button>
                    </div>
                    {/* Password Strength */}
                    {password.length > 0 && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                level <= passwordStrength.level
                                  ? passwordStrength.color
                                  : 'bg-gray-800'
                              }`}
                            />
                          ))}
                        </div>
                        <p className={`text-xs ${
                          passwordStrength.level <= 1 ? 'text-red-400' :
                          passwordStrength.level <= 2 ? 'text-orange-400' :
                          passwordStrength.level <= 3 ? 'text-yellow-400' :
                          'text-emerald-400'
                        }`}>
                          {passwordStrength.label}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    <label className="block text-sm font-medium mb-1.5 text-gray-400">Confirm Password</label>
                    <div className="relative group input-glow rounded-xl transition-all duration-300">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-rose-400 transition-colors duration-300">
                        <Icons.Lock />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                        className={`w-full pl-12 pr-12 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-gray-600 focus:outline-none focus:ring-0 transition-all duration-300 hover:bg-white/[0.06] ${
                          confirmPassword.length > 0 && confirmPassword !== password
                            ? 'border-red-500/30 focus:border-red-500/40'
                            : confirmPassword.length > 0 && confirmPassword === password
                            ? 'border-emerald-500/30 focus:border-emerald-500/40'
                            : 'border-white/[0.06] focus:border-rose-500/30'
                        }`}
                      />
                      {confirmPassword.length > 0 && (
                        <span className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                          confirmPassword === password ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {confirmPassword === password ? (
                            <Icons.Check />
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          )}
                        </span>
                      )}
                    </div>
                    {confirmPassword.length > 0 && confirmPassword !== password && (
                      <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
                    )}
                  </div>

                  <div className="pt-1 animate-fade-up" style={{ animationDelay: '0.25s' }}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-rose-500/20 hover:shadow-rose-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-[0.99] group"
                    >
                      {loading ? (
                        <><Icons.Loader /> Creating account...</>
                      ) : (
                        <>
                          Create Account
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            <Icons.ArrowRight />
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <p className="text-center mt-6 text-gray-500 text-sm">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="font-semibold text-rose-400 hover:text-rose-300 transition-colors">
                    Sign In
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Image & Branding Panel */}
      <div className="hidden lg:flex lg:w-[55%] relative">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <img
            src="https://mgx-backend-cdn.metadl.com/generate/images/981465/2026-02-21/cd7e472b-1284-4d14-b577-c289eeb61c8b.png"
            alt="Adorable kitten"
            className="w-full h-full object-cover"
          />
          {/* Multi-layer gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#0c0a09] via-[#0c0a09]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-[#0c0a09]/20" />
          <div className="absolute inset-0 bg-gradient-to-bl from-rose-950/20 via-transparent to-orange-950/20" />
        </div>

        {/* Floating paw prints */}
        {[
          { delay: '0s', duration: '9s', right: '10%', size: 'w-7 h-7' },
          { delay: '3s', duration: '7s', right: '30%', size: 'w-5 h-5' },
          { delay: '1.5s', duration: '8s', right: '55%', size: 'w-9 h-9' },
          { delay: '4s', duration: '6s', right: '80%', size: 'w-6 h-6' },
        ].map((paw, i) => (
          <div
            key={i}
            className={`absolute ${paw.size} text-rose-400/10 animate-float-up`}
            style={{ right: paw.right, animationDelay: paw.delay, animationDuration: paw.duration }}
          >
            <Icons.Paw />
          </div>
        ))}

        {/* Content Overlay */}
        <div className={`relative z-10 flex flex-col justify-between p-12 w-full ${mounted ? 'animate-slide-right' : 'opacity-0'}`}>
          {/* Logo */}
          <div className="flex justify-end">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <span className="text-3xl font-bold bg-gradient-to-r from-rose-300 via-orange-300 to-amber-300 bg-clip-text text-transparent">
                PawMatch
              </span>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                <Icons.Paw />
              </div>
            </Link>
          </div>

          {/* Hero Text */}
          <div className="space-y-6 text-right">
            <h2 className="text-5xl font-bold leading-[1.15] tracking-tight">
              Join Our
              <br />
              <span className="bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                Loving Community
              </span>
              <span className="inline-block ml-2 animate-gentle-float">🐱</span>
            </h2>

            {/* Feature Cards */}
            <div className="space-y-3 ml-auto max-w-sm">
              {[
                { icon: <Icons.Heart />, title: 'Smart Matching', desc: 'AI-powered pet matching for your lifestyle' },
                { icon: <Icons.Shield />, title: 'Verified Shelters', desc: 'All partners are verified and trusted' },
                { icon: <Icons.Paw />, title: 'Post-Adoption Support', desc: 'Ongoing guidance for new pet parents' },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="glass-effect bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 flex items-center gap-4 hover:bg-white/[0.08] transition-all duration-300 group cursor-default"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500/15 to-orange-500/15 border border-rose-500/10 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white/90">{feature.title}</div>
                    <div className="text-xs text-gray-500">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-end gap-4">
            <div className="flex -space-x-3">
              {['EM', 'AK', 'RJ', 'LS'].map((initials, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[#0c0a09] flex items-center justify-center text-[10px] font-bold text-white"
                  style={{
                    background: [
                      'linear-gradient(135deg, #f43f5e, #f97316)',
                      'linear-gradient(135deg, #f97316, #eab308)',
                      'linear-gradient(135deg, #22c55e, #14b8a6)',
                      'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    ][i],
                  }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <div className="text-sm font-medium text-white/90">Join 12,000+ pet lovers</div>
              <div className="text-xs text-gray-600">who found their perfect match</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}