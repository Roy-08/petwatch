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
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  Heart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
    </svg>
  ),
};

const petImages = [
  "https://mgx-backend-cdn.metadl.com/generate/images/981497/2026-02-21/ff065222-e59d-4832-b1cc-5c0867190d63.png",
  "https://mgx-backend-cdn.metadl.com/generate/images/981497/2026-02-21/35971cda-3e48-4e0e-b1e7-de8bf756fab6.png",
  "https://mgx-backend-cdn.metadl.com/generate/images/981497/2026-02-21/bb6940d3-9fcf-467f-adf4-d7b7820c1084.png",
  "https://mgx-backend-cdn.metadl.com/generate/images/981497/2026-02-21/ed97e86d-7ea2-4b85-8c77-c9986d7161ea.png",
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const admin = localStorage.getItem('pawmatch_admin');
    if (admin) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % petImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('pawmatch_admin', JSON.stringify(data.data));
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}>
      {/* Left Panel - Image Showcase */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        {/* Background Image Carousel */}
        {petImages.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: currentImageIndex === index ? 1 : 0 }}
          >
            <img
              src={img}
              alt={`Pet ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: 4 + Math.random() * 6,
                height: 4 + Math.random() * 6,
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animation: `floatParticle ${6 + i * 2}s ease-in-out infinite ${i * 0.8}s`,
              }}
            />
          ))}
        </div>

        {/* Content Overlay */}
        <div className={`relative z-10 flex flex-col justify-between h-full p-12 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Top - Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-amber-500/30 text-white">
              <Icons.Paw />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">PawMatch</h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400/80">Admin Portal</p>
            </div>
          </div>

          {/* Middle - Main Text */}
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-6">
              <Icons.Heart />
              <span className="text-sm font-semibold text-amber-300">Every pet deserves a loving home</span>
            </div>
            <h1 className="text-5xl xl:text-6xl font-extrabold text-white leading-[1.1] mb-5">
              Connecting <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Hearts & Paws
              </span>
            </h1>
            <p className="text-gray-300/90 text-lg leading-relaxed max-w-md">
              Manage adoptions, track applications, and help pets find their forever families through your admin dashboard.
            </p>
          </div>

          {/* Bottom - Stats & Image Indicators */}
          <div className="flex items-end justify-between">
            <div className="flex gap-6">
              {[
                { value: "2,500+", label: "Pets Adopted" },
                { value: "1,200+", label: "Happy Families" },
                { value: "98%", label: "Success Rate" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400 font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Image Carousel Indicators */}
            <div className="flex gap-2">
              {petImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentImageIndex === index
                      ? "w-8 bg-amber-400"
                      : "w-3 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-br from-[#0c0a15] via-[#0f0d1a] to-[#110e1f] relative overflow-hidden">
        {/* Subtle Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/[0.02] rounded-full blur-3xl" />

        <div className={`w-full max-w-[420px] relative z-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Mobile Logo */}
          <div className="text-center mb-10 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30 text-white">
                <Icons.Paw />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                PawMatch
              </span>
            </Link>
          </div>

          {/* Pet Avatar */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-amber-500/30 shadow-xl shadow-amber-500/10">
                <img
                  src={petImages[0]}
                  alt="Pet"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center border-2 border-[#0f0d1a]">
                <Icons.Shield />
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl p-8 bg-white/[0.03] border border-white/[0.06] backdrop-blur-2xl shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-white mb-2">Admin Login</h1>
              <p className="text-gray-500 text-sm">Sign in to manage pet adoptions</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3"
                style={{ animation: "shake 0.4s ease-in-out" }}>
                <span className="text-lg">⚠️</span>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2.5 text-gray-300">Email Address</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-amber-400 transition-colors duration-300">
                    <Icons.Mail />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@pawmatch.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 focus:ring-amber-500/50 focus:border-amber-500/30 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="block text-sm font-semibold text-gray-300">Password</label>
                  <Link href="/admin/forgot-password" className="text-xs font-medium text-amber-400/70 hover:text-amber-400 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-amber-400 transition-colors duration-300">
                    <Icons.Lock />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-12 py-3.5 rounded-2xl focus:outline-none focus:ring-2 bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 focus:ring-amber-500/50 focus:border-amber-500/30 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded-md border-white/20 bg-white/5 text-amber-500 focus:ring-amber-500/30 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer select-none">
                  Keep me signed in
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:via-orange-400 hover:to-rose-400 text-white font-bold rounded-2xl shadow-xl shadow-amber-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] group"
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
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-xs text-gray-600 font-medium">ADMIN ACCESS ONLY</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* Security Note */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/10">
              <span className="text-amber-400 mt-0.5 flex-shrink-0">
                <Icons.Shield />
              </span>
              <div>
                <p className="text-xs font-semibold text-amber-400/90 mb-1">Secure Admin Access</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  This portal is restricted to authorized administrators. All login attempts are monitored and logged.
                </p>
              </div>
            </div>

            <p className="text-center mt-6 text-gray-500">
              <Link href="/" className="font-semibold text-amber-400/80 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                Back to Home
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center mt-6 text-[11px] text-gray-700">
            © 2026 PawMatch. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-5px); opacity: 0.4; }
          75% { transform: translateY(-25px) translateX(15px); opacity: 0.5; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>
    </div>
  );
}