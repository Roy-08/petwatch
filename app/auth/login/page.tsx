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
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetMode, setResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    setMounted(true);
    const user = localStorage.getItem('pawmatch_user');
    if (user) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('pawmatch_user', JSON.stringify(data.data));
        router.push('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResetMessage('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });
      const data = await response.json();
      setResetMessage(data.message || 'Reset link sent if account exists.');
    } catch {
      setResetMessage('Something went wrong. Please try again.');
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
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-float-up { animation: float-up linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-slide-left { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-slide-right { animation: slide-in-right 0.8s ease-out forwards; }
        .animate-fade-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-gentle-float { animation: gentle-float 4s ease-in-out infinite; }
        .animate-scale-in { animation: scale-in 0.6s ease-out forwards; }
        .shimmer-line {
          background: linear-gradient(90deg, transparent, rgba(251,146,60,0.15), transparent);
          background-size: 200% 100%;
          animation: shimmer 4s linear infinite;
        }
        .glass-effect {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .input-glow:focus-within {
          box-shadow: 0 0 0 1px rgba(251, 146, 60, 0.3), 0 0 20px rgba(251, 146, 60, 0.08);
        }
      `}</style>

      {/* Left Side - Beautiful Image Panel */}
      <div className="hidden lg:flex lg:w-[55%] relative">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <img
            src="https://mgx-backend-cdn.metadl.com/generate/images/981465/2026-02-21/192618a2-c067-4c73-84a0-e84172f9a755.png"
            alt="Happy puppy"
            className="w-full h-full object-cover"
          />
          {/* Multi-layer gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a09] via-[#0c0a09]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-[#0c0a09]/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-transparent to-rose-950/20" />
        </div>

        {/* Floating paw prints */}
        {[
          { delay: '0s', duration: '8s', left: '15%', size: 'w-6 h-6' },
          { delay: '2s', duration: '10s', left: '35%', size: 'w-8 h-8' },
          { delay: '4s', duration: '7s', left: '55%', size: 'w-5 h-5' },
          { delay: '1s', duration: '9s', left: '75%', size: 'w-7 h-7' },
        ].map((paw, i) => (
          <div
            key={i}
            className={`absolute ${paw.size} text-orange-400/10 animate-float-up`}
            style={{ left: paw.left, animationDelay: paw.delay, animationDuration: paw.duration }}
          >
            <Icons.Paw />
          </div>
        ))}

        {/* Content Overlay */}
        <div className={`relative z-10 flex flex-col justify-between p-12 w-full ${mounted ? 'animate-slide-left' : 'opacity-0'}`}>
          {/* Logo */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                <Icons.Paw />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-300 bg-clip-text text-transparent">
                PawMatch
              </span>
            </Link>
          </div>

          {/* Hero Text */}
          <div className="space-y-6 max-w-lg">
            <h2 className="text-5xl font-bold leading-[1.15] tracking-tight">
              Welcome Back,
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Pet Lover
              </span>
              <span className="inline-block ml-2 animate-gentle-float">🐾</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Your furry friends are waiting. Sign in to continue your journey of finding the perfect companion.
            </p>

            {/* Stats Row */}
            <div className="flex gap-10 pt-2">
              {[
                { number: '12K+', label: 'Pets Adopted' },
                { number: '8K+', label: 'Happy Families' },
                { number: '98%', label: 'Match Rate' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="glass-effect bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5 max-w-sm">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-amber-400"><Icons.Star /></span>
              ))}
            </div>
            <p className="text-gray-300/90 text-sm leading-relaxed">
              &ldquo;PawMatch helped us find our beloved golden retriever, Max. The process was seamless and heartwarming.&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white text-xs font-bold">
                SJ
              </div>
              <div>
                <div className="text-sm font-medium text-white/90">Sarah Johnson</div>
                <div className="text-xs text-gray-500">Pet Parent since 2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className={`w-full lg:w-[45%] flex items-center justify-center px-6 sm:px-10 py-8 relative ${mounted ? 'animate-slide-right' : 'opacity-0'}`}>
        {/* Background accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/[0.04] rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-500/[0.04] rounded-full blur-[100px]" />
        </div>

        <div className="w-full max-w-[420px] relative z-10">
          {/* Mobile Logo */}
          <div className="text-center mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20">
                <Icons.Paw />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                PawMatch
              </span>
            </Link>
          </div>

          {/* Form Card */}
          <div className="glass-effect bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            {/* Top shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-px shimmer-line" />

            {!resetMode ? (
              <>
                {/* Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/[0.08] border border-orange-500/[0.12] text-orange-400 text-xs font-medium mb-5">
                    <Icons.Heart />
                    <span>Welcome back!</span>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Sign In</h1>
                  <p className="text-gray-500 text-sm">Access your adopter dashboard</p>
                </div>

                {/* Error */}
                {error && (
                  <div className="mb-6 p-3.5 rounded-xl bg-red-500/[0.08] border border-red-500/[0.12] text-red-400 text-sm flex items-center gap-2.5">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                    </svg>
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                    <label className="block text-sm font-medium mb-2 text-gray-400">Email</label>
                    <div className="relative group input-glow rounded-xl transition-all duration-300">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-400 transition-colors duration-300">
                        <Icons.Mail />
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/30 transition-all duration-300 hover:bg-white/[0.06]"
                      />
                    </div>
                  </div>

                  <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    <label className="block text-sm font-medium mb-2 text-gray-400">Password</label>
                    <div className="relative group input-glow rounded-xl transition-all duration-300">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-400 transition-colors duration-300">
                        <Icons.Lock />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/30 transition-all duration-300 hover:bg-white/[0.06]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                      >
                        {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot password link */}
                  <div className="flex justify-end animate-fade-up" style={{ animationDelay: '0.25s' }}>
                    <button
                      type="button"
                      onClick={() => setResetMode(true)}
                      className="text-sm text-orange-400/80 hover:text-orange-400 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-[0.99] group"
                    >
                      {loading ? (
                        <><Icons.Loader /> Signing in...</>
                      ) : (
                        <>
                          Sign In
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            <Icons.ArrowRight />
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <p className="text-center mt-8 text-gray-500 text-sm">
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/signup" className="font-semibold text-orange-400 hover:text-orange-300 transition-colors">
                    Create Account
                  </Link>
                </p>
              </>
            ) : (
              <>
                {/* Reset Password Mode */}
                <div className="mb-8">
                  <div className="w-14 h-14 mb-5 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/10 flex items-center justify-center text-orange-400">
                    <Icons.Mail />
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Reset Password</h1>
                  <p className="text-gray-500 text-sm">Enter your email to receive a reset link</p>
                </div>

                {resetMessage && (
                  <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/[0.12] text-emerald-400 text-sm">
                    {resetMessage}
                  </div>
                )}

                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-400">Email</label>
                    <div className="relative group input-glow rounded-xl transition-all duration-300">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-400 transition-colors duration-300">
                        <Icons.Mail />
                      </span>
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/30 transition-all duration-300 hover:bg-white/[0.06]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {loading ? <><Icons.Loader /> Sending...</> : 'Send Reset Link'}
                  </button>
                </form>

                <p className="text-center mt-8 text-gray-500 text-sm">
                  Remember your password?{' '}
                  <button
                    onClick={() => { setResetMode(false); setResetMessage(''); }}
                    className="font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    Back to Login
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}