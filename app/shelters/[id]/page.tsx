/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Icons = {
  ArrowLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
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
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  Globe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
    </svg>
  ),
  Loader: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
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
  website?: string;
  description: string;
  image?: string;
  rating: number;
  totalAdoptions: number;
  isVerified: boolean;
  operatingHours: string;
}

export default function ShelterDetailPage() {
  const params = useParams();
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [loading, setLoading] = useState(true);
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
    if (params.id) fetchShelterDetails();
  }, [params.id]);

  const fetchShelterDetails = async () => {
    try {
      const response = await fetch(`/api/shelters/${params.id}`);
      const data = await response.json();
      if (data.success) setShelter(data.data);
    } catch (error) {
      console.error('Error fetching shelter details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-950 text-white' : ''}`}>
        <Icons.Loader />
        <span className={`ml-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading shelter details...</span>
      </div>
    );
  }

  if (!shelter) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-950 text-white' : ''}`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Shelter not found</h2>
          <Link href="/shelters" className="text-violet-600 hover:text-violet-700 font-medium">Back to all shelters</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gradient-to-b from-violet-50 via-white to-rose-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 transition-colors duration-300 backdrop-blur-lg ${darkMode ? 'bg-gray-900/95 border-b border-gray-800' : 'bg-white/95 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/shelters" className={`flex items-center gap-2 font-medium ${darkMode ? 'text-gray-300 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'}`}>
            <Icons.ArrowLeft /> Back to All Shelters
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-full transition-all ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gradient-to-r from-amber-100 to-orange-100 text-orange-600 shadow-sm'}`}
          >
            {darkMode ? <Icons.Sun /> : <Icons.Moon />}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        {shelter.image && (
          <div className={`rounded-2xl overflow-hidden shadow-xl mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <img src={shelter.image} alt={shelter.name} className="w-full h-80 object-cover" />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`rounded-2xl shadow-xl p-8 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{shelter.name}</h1>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < Math.floor(shelter.rating) ? 'text-amber-400' : darkMode ? 'text-gray-600' : 'text-gray-300'}><Icons.Star /></span>
                      ))}
                    </div>
                    <span className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{shelter.rating.toFixed(1)}</span>
                  </div>
                </div>
                {shelter.isVerified && (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold border ${darkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-600 border-emerald-200'}`}>
                    <Icons.Shield /> Verified Shelter
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>About Us</h2>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{shelter.description}</p>
              </div>

              <div className={`rounded-xl p-6 border ${darkMode ? 'bg-violet-500/5 border-violet-500/20' : 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200'}`}>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">{shelter.totalAdoptions}+</p>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Successful Adoptions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            <div className={`rounded-2xl shadow-xl p-6 sticky top-24 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center text-white flex-shrink-0"><Icons.Location /></div>
                  <div>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Address</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{shelter.address}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{shelter.city}, {shelter.state}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white flex-shrink-0"><Icons.Phone /></div>
                  <div>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Phone</p>
                    <a href={`tel:${shelter.phone}`} className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>{shelter.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white flex-shrink-0"><Icons.Mail /></div>
                  <div>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email</p>
                    <a href={`mailto:${shelter.email}`} className={`text-sm break-all ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}>{shelter.email}</a>
                  </div>
                </div>
                {shelter.website && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white flex-shrink-0"><Icons.Globe /></div>
                    <div>
                      <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Website</p>
                      <a href={shelter.website} target="_blank" rel="noopener noreferrer" className={`text-sm break-all ${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'}`}>Visit Website</a>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white flex-shrink-0"><Icons.Clock /></div>
                  <div>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Operating Hours</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{shelter.operatingHours}</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-3 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 hover:from-violet-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg transition-all">
                Contact Shelter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}