/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// SVG Icon Components
const Icons = {
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Filter: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  ),
  Location: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  HeartOutline: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  HeartFilled: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
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
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  ),
};

interface Pet {
  _id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  image: string;
  shelterName: string;
  personality: string[];
  color: string;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  favoritePets?: string[];
}

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [togglingFav, setTogglingFav] = useState<Set<string>>(new Set());
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const petTypes = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Hamster', 'Fish', 'Turtle'];
  const genders = ['Male', 'Female'];

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load user and their favorites
  useEffect(() => {
    const stored = localStorage.getItem('pawmatch_user');
    if (stored) {
      const userData = JSON.parse(stored);
      setUser(userData);
      // Fetch user favorites
      if (userData._id && userData._id !== 'demo123') {
        fetch(`/api/adopter/favorites?userId=${userData._id}`)
          .then(res => res.json())
          .then(data => {
            if (data.success && data.data) {
              const ids = new Set<string>(data.data.map((p: Pet) => p._id));
              setFavoriteIds(ids);
            }
          })
          .catch(console.error);
      }
    }
  }, []);

  const fetchPets = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedType) params.append('type', selectedType);
      if (selectedGender) params.append('gender', selectedGender);
      params.append('page', currentPage.toString());
      params.append('limit', '12');

      const response = await fetch(`/api/pets?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setPets(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedType, selectedGender, currentPage]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPets();
  };

  const toggleFavorite = async (e: React.MouseEvent, petId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    if (togglingFav.has(petId)) return;

    setTogglingFav(prev => new Set(prev).add(petId));

    // Optimistic update
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (next.has(petId)) {
        next.delete(petId);
      } else {
        next.add(petId);
      }
      return next;
    });

    try {
      const res = await fetch('/api/adopter/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, petId }),
      });
      const data = await res.json();
      if (!data.success) {
        // Revert on failure
        setFavoriteIds(prev => {
          const next = new Set(prev);
          if (next.has(petId)) {
            next.delete(petId);
          } else {
            next.add(petId);
          }
          return next;
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Revert on error
      setFavoriteIds(prev => {
        const next = new Set(prev);
        if (next.has(petId)) {
          next.delete(petId);
        } else {
          next.add(petId);
        }
        return next;
      });
    } finally {
      setTogglingFav(prev => {
        const next = new Set(prev);
        next.delete(petId);
        return next;
      });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gradient-to-b from-rose-50 via-white to-amber-50 text-gray-900'}`}>
      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowLoginPopup(false)}>
          <div className={`relative w-full max-w-md mx-4 p-8 rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowLoginPopup(false)} className={`absolute top-4 right-4 p-1 rounded-full ${darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
              <Icons.X />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
                <Icons.Paw />
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Login Required</h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Please login to add pets to your favorites
              </p>
              <div className="flex gap-3">
                <Link href="/auth/login" className="flex-1 py-3 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 hover:from-rose-600 hover:via-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg transition-all text-center">
                  Login
                </Link>
                <Link href="/auth/signup" className={`flex-1 py-3 font-semibold rounded-xl border transition-all text-center ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`sticky top-0 z-10 transition-colors duration-300 ${darkMode ? 'bg-gray-900/95 border-b border-gray-800' : 'bg-white/95 shadow-sm'} backdrop-blur-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-rose-500 to-orange-500 shadow-lg shadow-rose-500/30 text-white">
                <Icons.Paw />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                PawMatch
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-full transition-all ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gradient-to-r from-amber-100 to-orange-100 text-orange-600 hover:from-amber-200 hover:to-orange-200 shadow-sm'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Icons.Sun /> : <Icons.Moon />}
              </button>
              {user ? (
                <Link href="/dashboard" className={`font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-rose-600'}`}>
                  Dashboard
                </Link>
              ) : (
                <Link href="/auth/login" className={`font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-rose-600'}`}>
                  Login
                </Link>
              )}
              <Link href="/" className={`font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-rose-600'}`}>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Find Your <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">Perfect Pet</span>
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Browse through our available pets and find your perfect companion</p>
        </div>

        {/* Search and Filters */}
        <div className={`rounded-2xl shadow-lg p-6 mb-8 transition-colors duration-300 ${darkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white'}`}>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <span className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-orange-400' : 'text-rose-400'}`}>
                <Icons.Search />
              </span>
              <input
                type="text"
                placeholder="Search by name, breed, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500'
                    : 'border-2 border-rose-200 text-gray-900 placeholder-gray-400 focus:ring-rose-500 focus:border-rose-300'
                }`}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Pet Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    darkMode
                      ? 'bg-gray-700 border border-gray-600 text-white focus:ring-orange-500'
                      : 'border-2 border-rose-200 text-gray-900 focus:ring-rose-500'
                  }`}
                >
                  <option value="">All Types</option>
                  {petTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Gender</label>
                <select
                  value={selectedGender}
                  onChange={(e) => { setSelectedGender(e.target.value); setCurrentPage(1); }}
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    darkMode
                      ? 'bg-gray-700 border border-gray-600 text-white focus:ring-orange-500'
                      : 'border-2 border-rose-200 text-gray-900 focus:ring-rose-500'
                  }`}
                >
                  <option value="">All Genders</option>
                  {genders.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 hover:from-rose-600 hover:via-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Icons.Filter />
                  Apply Filters
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Icons.Loader />
            <span className={`ml-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading pets...</span>
          </div>
        )}

        {/* Pets Grid */}
        {!loading && pets.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {pets.map((pet) => {
                const isFav = favoriteIds.has(pet._id);
                return (
                  <Link
                    key={pet._id}
                    href={`/pets/${pet._id}`}
                    className={`group rounded-2xl overflow-hidden transition-all hover:-translate-y-2 ${
                      darkMode
                        ? 'bg-gray-800 border border-gray-700 hover:border-gray-600 hover:shadow-2xl hover:shadow-orange-500/10'
                        : 'bg-white shadow-lg hover:shadow-2xl hover:shadow-rose-200/50'
                    }`}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        onClick={(e) => toggleFavorite(e, pet._id)}
                        className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isFav
                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 scale-110'
                            : darkMode
                              ? 'bg-gray-900/80 text-pink-400 hover:bg-pink-500 hover:text-white'
                              : 'bg-white/90 text-rose-500 hover:bg-rose-500 hover:text-white shadow-lg'
                        }`}
                      >
                        {isFav ? <Icons.HeartFilled /> : <Icons.HeartOutline />}
                      </button>
                      <span className={`absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-sm font-semibold ${
                        darkMode ? 'bg-gray-900/80 text-white' : 'bg-white/95 text-gray-700 shadow-sm'
                      }`}>
                        {pet.type}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pet.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          darkMode
                            ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                            : 'bg-gradient-to-r from-rose-100 to-orange-100 text-rose-600 border border-rose-200'
                        }`}>
                          {pet.age}
                        </span>
                      </div>
                      <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pet.breed} • {pet.gender}</p>
                      <div className={`flex items-center gap-2 mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        <Icons.Location />
                        <span className="text-sm">{pet.shelterName}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {pet.personality.slice(0, 2).map((trait) => (
                          <span key={trait} className={`px-3 py-1 rounded-full text-xs font-medium ${
                            darkMode
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200'
                          }`}>
                            {trait}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-end">
                        <span className={`font-semibold flex items-center gap-1 ${darkMode ? 'text-orange-400' : 'text-rose-600'}`}>
                          Take Home
                          <Icons.ArrowRight />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all ${
                    darkMode
                      ? 'border border-gray-700 text-orange-400 hover:bg-gray-800'
                      : 'border-2 border-rose-200 text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl font-medium transition-all ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg'
                          : darkMode
                            ? 'border border-gray-700 text-gray-300 hover:bg-gray-800'
                            : 'border-2 border-rose-200 text-rose-600 hover:bg-rose-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all ${
                    darkMode
                      ? 'border border-gray-700 text-orange-400 hover:bg-gray-800'
                      : 'border-2 border-rose-200 text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!loading && pets.length === 0 && (
          <div className="text-center py-20">
            <p className={`text-2xl mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No pets found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('');
                setSelectedGender('');
                setCurrentPage(1);
              }}
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-orange-600 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}