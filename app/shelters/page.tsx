/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Icons = {
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Location: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  Loader: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  ),
  Paw: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M8.5 3.5c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zm7 0c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zM5 10c1.1 0 2 1.1 2 2.5S6.1 15 5 15s-2-1.1-2-2.5S3.9 10 5 10zm14 0c1.1 0 2 1.1 2 2.5s-.9 2.5-2 2.5-2-1.1-2-2.5.9-2.5 2-2.5zm-7 2c2.2 0 4 2.2 4 5 0 1.7-1.3 3-3 3h-2c-1.7 0-3-1.3-3-3 0-2.8 1.8-5 4-5z"/>
    </svg>
  ),
  Sun: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
    </svg>
  ),
  Moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
};

interface Shelter {
  _id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  image?: string;
  rating: number;
  totalAdoptions: number;
  isVerified: boolean;
  operatingHours: string;
}

export default function SheltersPage() {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) setDarkMode(JSON.parse(savedMode));
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    fetchShelters();
  }, []);

  const fetchShelters = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      const response = await fetch(`/api/shelters?${params.toString()}`);
      const data = await response.json();
      if (data.success) setShelters(data.data);
    } catch (error) {
      console.error('Error fetching shelters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchShelters();
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gradient-to-b from-violet-50 via-white to-rose-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 transition-colors duration-300 backdrop-blur-lg ${darkMode ? 'bg-gray-900/95 border-b border-gray-800' : 'bg-white/95 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-rose-500 to-orange-500 shadow-lg shadow-rose-500/30 text-white"><Icons.Paw /></div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">PawMatch</span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-full transition-all ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gradient-to-r from-amber-100 to-orange-100 text-orange-600 shadow-sm'}`}
              >
                {darkMode ? <Icons.Sun /> : <Icons.Moon />}
              </button>
              <Link href="/" className={`font-medium ${darkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-rose-600'}`}>Back to Home</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Partner <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Shelters</span>
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Discover verified shelters in your area</p>
        </div>

        {/* Search Bar */}
        <div className={`rounded-2xl shadow-lg p-6 mb-8 ${darkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white'}`}>
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1">
              <span className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-violet-400' : 'text-violet-400'}`}><Icons.Search /></span>
              <input
                type="text"
                placeholder="Search by shelter name, city, or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-violet-500' : 'border-2 border-violet-200 focus:ring-violet-500 focus:border-violet-300'}`}
              />
            </div>
            <button type="submit" className="px-8 py-3 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 hover:from-violet-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg transition-all">
              Search
            </button>
          </form>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Icons.Loader />
            <span className={`ml-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading shelters...</span>
          </div>
        )}

        {/* Shelters Grid */}
        {!loading && shelters.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shelters.map((shelter) => (
              <Link
                key={shelter._id}
                href={`/shelters/${shelter._id}`}
                className={`group rounded-2xl overflow-hidden transition-all hover:-translate-y-2 ${darkMode ? 'bg-gray-800 border border-gray-700 hover:border-gray-600 hover:shadow-2xl hover:shadow-purple-500/10' : 'bg-white shadow-lg hover:shadow-2xl'}`}
              >
                {shelter.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={shelter.image} alt={shelter.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className={`text-xl font-bold flex-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{shelter.name}</h3>
                    {shelter.isVerified && (
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${darkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-600 border-emerald-200'}`}>
                        <Icons.Shield /> Verified
                      </div>
                    )}
                  </div>
                  <div className={`flex items-center gap-2 mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Icons.Location />
                    <span className="text-sm">{shelter.city}, {shelter.state}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < Math.floor(shelter.rating) ? 'text-amber-400' : darkMode ? 'text-gray-600' : 'text-gray-300'}><Icons.Star /></span>
                      ))}
                    </div>
                    <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{shelter.rating.toFixed(1)}</span>
                  </div>
                  <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{shelter.description}</p>
                  <div className={`flex items-center justify-between pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div>
                      <p className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">{shelter.totalAdoptions}+</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Adoptions</p>
                    </div>
                    <span className={`font-semibold flex items-center gap-1 ${darkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                      View Details <Icons.ArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && shelters.length === 0 && (
          <div className="text-center py-20">
            <p className={`text-2xl mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No shelters found</p>
            <button
              onClick={() => { setSearchQuery(''); fetchShelters(); }}
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-xl hover:from-violet-600 hover:to-purple-600 transition-all"
            >
              View All Shelters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}