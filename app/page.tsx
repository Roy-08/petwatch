/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

// SVG Icon Components
const Icons = {
  Paw: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M8.5 3.5c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zm7 0c1.1 0 2 1.3 2 3s-.9 3-2 3-2-1.3-2-3 .9-3 2-3zM5 10c1.1 0 2 1.1 2 2.5S6.1 15 5 15s-2-1.1-2-2.5S3.9 10 5 10zm14 0c1.1 0 2 1.1 2 2.5s-.9 2.5-2 2.5-2-1.1-2-2.5.9-2.5 2-2.5zm-7 2c2.2 0 4 2.2 4 5 0 1.7-1.3 3-3 3h-2c-1.7 0-3-1.3-3-3 0-2.8 1.8-5 4-5z"/>
    </svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Heart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  HeartOutline: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Location: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  ),
  Video: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
    </svg>
  ),
  Building: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
    </svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Home: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="m9 18 6-6-6-6"/>
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
  Facebook: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Twitter: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Instagram: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Quote: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-20">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
    </svg>
  ),
  Dog: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/><path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306"/>
    </svg>
  ),
  Cat: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>
    </svg>
  ),
  Rabbit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M13 16a3 3 0 0 1 2.24 5"/><path d="M18 12h.01"/><path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1.93 1.93 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"/><path d="M20 8.54V4a2 2 0 1 0-4 0v3"/><path d="M7.612 12.524a3 3 0 1 0-1.6 4.3"/>
    </svg>
  ),
  Bird: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/>
    </svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  Gift: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
    </svg>
  ),
  Loader: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
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

const successStories = [
  {
    id: 1,
    petName: 'Max',
    family: 'The Johnson Family',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/971737/2026-02-15/f512211c-9c1d-48fa-83af-e8a2f108394d.png',
    quote: "Max has brought so much joy to our family. The adoption process was seamless and the virtual meet & greet helped us know he was the one!",
    date: 'January 2026',
  },
  {
    id: 2,
    petName: 'Bella',
    family: 'Sarah & Mike',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/971737/2026-02-15/d1673beb-7150-42c1-83b3-f9fbb1ef00b4.png',
    quote: "We found our perfect match through the smart matching feature. Bella fits perfectly into our apartment lifestyle. She's the best thing that ever happened to us!",
    date: 'December 2025',
  },
];

const stats = [
  { icon: Icons.Paw, value: '12,500+', label: 'Pets Adopted', color: 'from-rose-500 to-pink-600' },
  { icon: Icons.Users, value: '45,000+', label: 'Happy Families', color: 'from-violet-500 to-purple-600' },
  { icon: Icons.Building, value: '350+', label: 'Partner Shelters', color: 'from-cyan-500 to-blue-600' },
  { icon: Icons.Gift, value: '100%', label: 'Happy Adoptions', color: 'from-emerald-500 to-green-600' },
];

const features = [
  {
    icon: Icons.Gift,
    title: 'Easy Adoption',
    description: 'All pets are waiting for a loving home. Simple process, no hidden charges. Just give a loving home to a pet in need.',
    gradient: 'from-emerald-500 to-green-400',
    bgLight: 'bg-gradient-to-br from-emerald-50 to-green-50',
  },
  {
    icon: Icons.Sparkles,
    title: 'Smart Matching',
    description: 'Our AI algorithm matches pets with adopters based on lifestyle and preferences',
    gradient: 'from-violet-500 to-purple-400',
    bgLight: 'bg-gradient-to-br from-violet-50 to-purple-50',
  },
  {
    icon: Icons.Video,
    title: 'Virtual Meet & Greet',
    description: 'Schedule video calls with shelter staff before visiting in person',
    gradient: 'from-rose-500 to-pink-400',
    bgLight: 'bg-gradient-to-br from-rose-50 to-pink-50',
  },
  {
    icon: Icons.Shield,
    title: 'Verified Shelters',
    description: 'All partner shelters are verified to ensure safe and ethical adoptions',
    gradient: 'from-blue-500 to-cyan-400',
    bgLight: 'bg-gradient-to-br from-blue-50 to-cyan-50',
  },
];

const filters = [
  { name: 'Dogs', icon: Icons.Dog },
  { name: 'Cats', icon: Icons.Cat },
  { name: 'Rabbits', icon: Icons.Rabbit },
  { name: 'Birds', icon: Icons.Bird },
  { name: 'Small Pets', icon: Icons.Paw },
];

export default function PetAdoptionLanding() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const [featuredPets, setFeaturedPets] = useState<Pet[]>([]);
  const [loadingPets, setLoadingPets] = useState(true);

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

  useEffect(() => {
    fetchFeaturedPets();
  }, []);

  const fetchFeaturedPets = async () => {
    setLoadingPets(true);
    try {
      const response = await fetch('/api/pets?limit=6&page=1');
      const data = await response.json();
      if (data.success) {
        setFeaturedPets(data.data);
      }
    } catch (error) {
      console.error('Error fetching featured pets:', error);
    } finally {
      setLoadingPets(false);
    }
  };

  const nextPet = () => {
    setCurrentPetIndex((prev) => (prev + 3 >= featuredPets.length ? 0 : prev + 1));
  };

  const prevPet = () => {
    setCurrentPetIndex((prev) => (prev === 0 ? Math.max(0, featuredPets.length - 3) : prev - 1));
  };

  const visiblePets = featuredPets.slice(currentPetIndex, currentPetIndex + 3);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${darkMode ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-100 shadow-sm'} backdrop-blur-lg border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-rose-500 to-orange-500 shadow-lg shadow-rose-500/30 text-white">
                <Icons.Paw />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                PawMatch
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/pets" className={`font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-rose-600'}`}>Find Pets</Link>
              <Link href="/shelters" className={`font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-rose-600'}`}>Shelters</Link>
              <Link href="/guides" className={`font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-rose-600'}`}>Guides</Link>
              <Link href="/faqs" className={`font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-rose-600'}`}>FAQs</Link>
              <a href="#contact" className={`font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-rose-600'}`}>Contact</a>
            </div>

            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-full transition-all ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gradient-to-r from-amber-100 to-orange-100 text-orange-600 hover:from-amber-200 hover:to-orange-200 shadow-sm'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Icons.Sun /> : <Icons.Moon />}
              </button>

              {typeof window !== 'undefined' && localStorage.getItem('pawmatch_user') ? (
                <Link href="/dashboard" className={`hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${darkMode ? 'bg-gray-800 text-orange-400 hover:bg-gray-700' : 'bg-gradient-to-r from-rose-100 to-orange-100 text-rose-600 hover:from-rose-200 hover:to-orange-200'}`}>
                  Dashboard
                </Link>
              ) : (
                <Link href="/auth/login" className={`hidden sm:block px-5 py-2.5 font-medium rounded-xl transition-all ${darkMode ? 'bg-gray-800 text-orange-400 hover:bg-gray-700 border border-gray-700' : 'border-2 border-rose-300 text-rose-600 hover:bg-rose-50'}`}>
                  Login
                </Link>
              )}

              <Link href="/pets" className="hidden sm:block px-5 py-2.5 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 hover:from-rose-600 hover:via-orange-600 hover:to-amber-600 text-white font-medium rounded-xl shadow-lg shadow-orange-500/30 transition-all">
                Take Home
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden py-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
              <div className="flex flex-col gap-4">
                <Link href="/pets" className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Find Pets</Link>
                <Link href="/shelters" className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Shelters</Link>
                <Link href="/guides" className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Guides</Link>
                <Link href="/faqs" className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>FAQs</Link>
                <a href="#contact" className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Contact</a>
                <div className="flex gap-3 pt-2">
                  <Link href="/pets" className="flex-1 py-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-medium rounded-xl text-center">Take Home</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`pt-28 pb-20 px-4 relative overflow-hidden ${darkMode ? '' : 'bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50'}`}>
        {!darkMode && (
          <>
            <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-rose-200/40 to-orange-200/40 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-amber-200/40 to-yellow-200/40 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-full blur-3xl" />
          </>
        )}

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${darkMode ? 'bg-gray-800/50 border-gray-700 text-emerald-400' : 'bg-white/80 border-emerald-200 text-emerald-600 shadow-sm'}`}>
                <Icons.Gift />
                <span className="text-sm font-semibold">Adopt a Pet Today — Give Them a Loving Home!</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>Give a Pet</span>
                <br />
                <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  A Loving Home
                </span>
                <br />
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>Today</span>
              </h1>
              
              <p className={`text-xl max-w-lg leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Every pet deserves a loving home. Browse thousands of adorable pets waiting for you — 
                all they need is your love and care.
              </p>

              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <div className="relative flex-1">
                  <span className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-rose-400'}`}>
                    <Icons.Search />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by breed, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-12 pr-4 h-14 text-lg rounded-2xl focus:outline-none focus:ring-2 transition-all ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-orange-500' 
                        : 'bg-white border-2 border-rose-200 text-gray-900 placeholder-gray-400 shadow-lg shadow-rose-100 focus:ring-rose-500 focus:border-rose-300'
                    }`}
                  />
                </div>
                <Link
                  href={`/pets${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`}
                  className="h-14 px-8 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 hover:from-rose-600 hover:via-orange-600 hover:to-amber-600 text-white text-lg font-semibold rounded-2xl shadow-lg shadow-orange-500/40 transition-all flex items-center justify-center gap-2"
                >
                  <Icons.Search />
                  Search
                </Link>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                  <Link
                    key={filter.name}
                    href={`/pets?type=${filter.name === 'Small Pets' ? 'Hamster' : filter.name.slice(0, -1)}`}
                    onClick={() => setActiveFilter(activeFilter === filter.name ? '' : filter.name)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all ${
                      activeFilter === filter.name
                        ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-orange-500/30'
                        : darkMode 
                          ? 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-orange-400' 
                          : 'bg-white border-2 border-rose-200 text-gray-700 hover:border-rose-400 hover:text-rose-600 hover:bg-rose-50 shadow-sm'
                    }`}
                  >
                    <filter.icon />
                    {filter.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Content - Hero Images */}
            <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main Image */}
                <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${darkMode ? 'shadow-orange-500/10' : 'shadow-rose-300/50 ring-4 ring-white'}`}>
                  <img
                    src="https://mgx-backend-cdn.metadl.com/generate/images/971737/2026-02-15/cf6de1a4-f6bc-417c-8886-d6982e1bcba8.png"
                    alt="Adorable pet waiting for a loving home"
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                {/* Floating Adoption Badge */}
                <div className={`absolute -left-4 lg:-left-8 top-1/4 p-4 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white ring-1 ring-emerald-100'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                      <Icons.Gift />
                    </div>
                    <div>
                      <p className={`font-bold text-lg ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Adopt</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Find Your Match</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Stats Card */}
                <div className={`absolute -right-2 lg:-right-4 bottom-1/4 p-4 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white ring-1 ring-rose-100'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
                      <Icons.Heart />
                    </div>
                    <div>
                      <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>12,500+</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pets Rehomed</p>
                    </div>
                  </div>
                </div>

                {/* Small Image Thumbnails */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                  <img
                    src="https://mgx-backend-cdn.metadl.com/generate/images/971737/2026-02-15/946649c0-4f66-4449-a92d-78b9af2a3130.png"
                    alt="Cat"
                    className={`w-16 h-16 rounded-xl object-cover shadow-lg ring-2 ${darkMode ? 'ring-gray-800' : 'ring-white'}`}
                  />
                  <img
                    src="https://mgx-backend-cdn.metadl.com/generate/images/971737/2026-02-15/658a7b01-78b5-4d47-9745-65b98894619b.png"
                    alt="Rabbit"
                    className={`w-16 h-16 rounded-xl object-cover shadow-lg ring-2 ${darkMode ? 'ring-gray-800' : 'ring-white'}`}
                  />
                  <img
                    src="https://mgx-backend-cdn.metadl.com/generate/images/971737/2026-02-15/332df30f-1386-4b13-8ed1-01890b7ba767.png"
                    alt="Dog"
                    className={`w-16 h-16 rounded-xl object-cover shadow-lg ring-2 ${darkMode ? 'ring-gray-800' : 'ring-white'}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-gray-900/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl transition-all hover:-translate-y-1 ${
                  darkMode 
                    ? 'bg-gray-800/50 border border-gray-700/50' 
                    : 'bg-white border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl'
                }`}
              >
                <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  <stat.icon />
                </div>
                <p className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
                <p className={`font-medium mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pets - Now fetched from API */}
      <section id="pets" className={`py-20 px-4 ${darkMode ? '' : 'bg-gradient-to-b from-white via-rose-50/30 to-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className={`inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-semibold ${
              darkMode ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-gradient-to-r from-rose-100 to-orange-100 text-rose-600 border border-rose-200'
            }`}>
              <Icons.HeartOutline />
              Available for Adoption
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Meet Our Adorable
              <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent"> Friends</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              These lovely pets are looking for their forever homes. All they need is your love and care!
            </p>
          </div>

          {/* Loading State */}
          {loadingPets && (
            <div className="flex justify-center items-center py-20">
              <Icons.Loader />
              <span className={`ml-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading pets...</span>
            </div>
          )}

          {/* Pets Grid with Navigation */}
          {!loadingPets && featuredPets.length > 0 && (
            <div className="relative">
              <div className="flex items-center gap-4">
                <button
                  onClick={prevPet}
                  className={`hidden md:flex w-12 h-12 rounded-full items-center justify-center transition-all ${
                    darkMode 
                      ? 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-orange-400' 
                      : 'bg-white border-2 border-rose-200 text-rose-500 hover:bg-rose-50 hover:border-rose-400 shadow-lg'
                  }`}
                >
                  <Icons.ChevronLeft />
                </button>

                <div className="flex-1 grid md:grid-cols-3 gap-6">
                  {visiblePets.map((pet) => (
                    <Link
                      key={pet._id}
                      href={`/pets/${pet._id}`}
                      className={`group rounded-2xl overflow-hidden transition-all hover:-translate-y-2 block ${
                        darkMode 
                          ? 'bg-gray-800 border border-gray-700' 
                          : 'bg-white border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-rose-200/50'
                      }`}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={pet.image}
                          alt={pet.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          darkMode 
                            ? 'bg-gray-900/80 text-pink-400 hover:bg-pink-500 hover:text-white' 
                            : 'bg-white/90 text-rose-500 hover:bg-rose-500 hover:text-white shadow-lg'
                        }`}>
                          <Icons.HeartOutline />
                        </span>
                        <span className={`absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-sm font-semibold ${
                          darkMode ? 'bg-gray-900/80 text-white' : 'bg-white/95 text-gray-700 shadow-sm'
                        }`}>
                          {pet.type}
                        </span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pet.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            darkMode ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-gradient-to-r from-rose-100 to-orange-100 text-rose-600 border border-rose-200'
                          }`}>
                            {pet.age}
                          </span>
                        </div>
                        <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pet.breed} • {pet.gender}</p>
                        <div className={`flex items-center gap-2 mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          <Icons.Location />
                          <span className="text-sm">{pet.shelterName}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pet.personality.slice(0, 3).map((trait) => (
                            <span key={trait} className={`px-3 py-1 rounded-full text-xs font-medium ${
                              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200'
                            }`}>
                              {trait}
                            </span>
                          ))}
                        </div>
                        <span className="w-full py-3 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 hover:from-rose-600 hover:via-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2">
                          Take {pet.name} Home
                          <Icons.ArrowRight />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <button
                  onClick={nextPet}
                  className={`hidden md:flex w-12 h-12 rounded-full items-center justify-center transition-all ${
                    darkMode 
                      ? 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-orange-400' 
                      : 'bg-white border-2 border-rose-200 text-rose-500 hover:bg-rose-50 hover:border-rose-400 shadow-lg'
                  }`}
                >
                  <Icons.ChevronRight />
                </button>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: Math.ceil(featuredPets.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPetIndex(index * 3)}
                    className={`h-2.5 rounded-full transition-all ${
                      Math.floor(currentPetIndex / 3) === index
                        ? 'bg-gradient-to-r from-rose-500 to-orange-500 w-8'
                        : darkMode ? 'bg-gray-700 w-2.5 hover:bg-gray-600' : 'bg-rose-200 w-2.5 hover:bg-rose-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {!loadingPets && featuredPets.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No pets available at the moment. Please seed the database first.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/pets" className={`px-8 py-3 font-semibold rounded-xl transition-all flex items-center gap-2 mx-auto w-fit ${
              darkMode 
                ? 'bg-gray-800 border border-gray-700 text-orange-400 hover:bg-gray-700' 
                : 'border-2 border-rose-400 text-rose-600 hover:bg-rose-50 hover:border-rose-500'
            }`}>
              View All Pets
              <Icons.ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 px-4 ${darkMode ? 'bg-gray-900/50' : 'bg-gradient-to-br from-violet-50 via-rose-50 to-amber-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className={`inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-semibold ${
              darkMode ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' : 'bg-white text-violet-600 border border-violet-200 shadow-sm'
            }`}>
              <Icons.Sparkles />
              Unique Features
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Why Choose
              <span className="bg-gradient-to-r from-violet-500 via-rose-500 to-orange-500 bg-clip-text text-transparent"> PawMatch?</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              We&apos;ve reimagined the pet adoption experience — making it simple for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl transition-all hover:-translate-y-2 ${
                  darkMode 
                    ? 'bg-gray-800/50 border border-gray-700/50 hover:border-gray-600' 
                    : `${feature.bgLight} border border-white shadow-xl hover:shadow-2xl`
                }`}
              >
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}>
                  <feature.icon />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="stories" className={`py-20 px-4 ${darkMode ? '' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className={`inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-semibold ${
              darkMode ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' : 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-600 border border-pink-200'
            }`}>
              <Icons.Star />
              Success Stories
            </span>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Happy Tails,
              <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 bg-clip-text text-transparent"> Happy Families</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Read heartwarming stories from families who found their perfect companions through adoption
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {successStories.map((story) => (
              <div
                key={story.id}
                className={`rounded-2xl overflow-hidden transition-all hover:-translate-y-2 ${
                  darkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-white border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl'
                }`}
              >
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-full overflow-hidden">
                    <img
                      src={story.image}
                      alt={`${story.petName} with ${story.family}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center relative">
                    <div className={`absolute top-6 right-6 ${darkMode ? 'text-gray-700' : 'text-rose-100'}`}>
                      <Icons.Quote />
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-amber-400"><Icons.Star /></span>
                      ))}
                    </div>
                    <blockquote className={`italic mb-6 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      &quot;{story.quote}&quot;
                    </blockquote>
                    <div className="mt-auto">
                      <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{story.family}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        Adopted {story.petName} • {story.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 ${darkMode ? '' : 'bg-gradient-to-b from-white to-rose-50'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 p-12 md:p-16 text-center shadow-2xl shadow-orange-500/30">
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur rounded-3xl flex items-center justify-center text-white">
                <Icons.Home />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Give a Pet a Loving Home?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of happy families who have given loving homes to pets through PawMatch!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pets" className="px-8 py-4 bg-white text-orange-600 hover:bg-orange-50 text-lg font-semibold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2">
                  Browse Pets
                  <Icons.ArrowRight />
                </Link>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className={`py-16 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-900'} text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Icons.Paw />
                </div>
                <span className="text-xl font-bold">PawMatch</span>
              </div>
              <p className="text-gray-400 mb-6">
                Connecting loving families with pets in need since 2020. Every pet deserves a loving home.
              </p>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-rose-500 hover:to-orange-500 flex items-center justify-center transition-all">
                  <Icons.Facebook />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-rose-500 hover:to-orange-500 flex items-center justify-center transition-all">
                  <Icons.Twitter />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-rose-500 hover:to-orange-500 flex items-center justify-center transition-all">
                  <Icons.Instagram />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/pets" className="hover:text-rose-400 transition-colors">Find a Pet</Link></li>
                <li><Link href="/guides" className="hover:text-rose-400 transition-colors">Adoption Process</Link></li>
                <li><Link href="/guides" className="hover:text-rose-400 transition-colors">Success Stories</Link></li>
                <li><Link href="/shelters" className="hover:text-rose-400 transition-colors">Partner Shelters</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/guides" className="hover:text-rose-400 transition-colors">Pet Care Tips</Link></li>
                <li><Link href="/faqs" className="hover:text-rose-400 transition-colors">FAQs</Link></li>
                <li><Link href="/guides" className="hover:text-rose-400 transition-colors">Blog</Link></li>
                <li><Link href="/guides" className="hover:text-rose-400 transition-colors">Community</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-3">
                  <Icons.Phone />
                  <span>1-800-PAW-MATCH</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icons.Mail />
                  <span>hello@pawmatch.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icons.Location />
                  <span>Boriwali East, Devipada</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 PawMatch. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-rose-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-rose-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-rose-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
