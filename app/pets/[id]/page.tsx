/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

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
  HeartOutline: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  HeartFilled: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
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
  Loader: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  ),
  SmallLoader: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 animate-spin">
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
  FileText: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>
    </svg>
  ),
  Upload: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
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
  images: string[];
  shelterName: string;
  personality: string[];
  description: string;
  weight?: string;
  color: string;
  vaccinated: boolean;
  neutered: boolean;
  shelter: {
    _id: string;
    name: string;
    city: string;
    state: string;
    phone: string;
    email: string;
    operatingHours: string;
  };
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  data: string; // base64
}

interface AdoptionForm {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  documentType: string;
  documentFile: UploadedFile | null;
  addressProofType: string;
  addressProofFile: UploadedFile | null;
  fullAddress: string;
  livingArrangement: string;
  hasExperience: boolean;
  reasonForAdoption: string;
  message: string;
  undertakingAccepted: boolean;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function PetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [togglingFav, setTogglingFav] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const docFileInputRef = useRef<HTMLInputElement>(null);
  const addressFileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<AdoptionForm>({
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    documentType: '',
    documentFile: null,
    addressProofType: '',
    addressProofFile: null,
    fullAddress: '',
    livingArrangement: '',
    hasExperience: false,
    reasonForAdoption: '',
    message: '',
    undertakingAccepted: false,
  });

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
    const stored = localStorage.getItem('pawmatch_user');
    if (stored) {
      const userData = JSON.parse(stored);
      setUser(userData);
      setForm(prev => ({
        ...prev,
        applicantName: userData.name || '',
        applicantEmail: userData.email || '',
        applicantPhone: userData.phone || '',
        fullAddress: [userData.address, userData.city, userData.state].filter(Boolean).join(', '),
      }));
    }
  }, []);

  useEffect(() => {
    if (user && user._id !== 'demo123' && params.id) {
      fetch(`/api/adopter/favorites?userId=${user._id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            const ids = data.data.map((p: { _id: string }) => p._id);
            setIsFavorite(ids.includes(params.id as string));
          }
        })
        .catch(console.error);
    }
  }, [user, params.id]);

  useEffect(() => {
    if (params.id) fetchPetDetails();
  }, [params.id]);

  const fetchPetDetails = async () => {
    try {
      const response = await fetch(`/api/pets/${params.id}`);
      const data = await response.json();
      if (data.success) setPet(data.data);
    } catch (error) {
      console.error('Error fetching pet details:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    if (togglingFav) return;
    setTogglingFav(true);
    setIsFavorite(prev => !prev);

    try {
      const res = await fetch('/api/adopter/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, petId: params.id }),
      });
      const data = await res.json();
      if (!data.success) {
        setIsFavorite(prev => !prev);
      }
    } catch {
      setIsFavorite(prev => !prev);
    } finally {
      setTogglingFav(false);
    }
  };

  const handleTakeHome = () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    setShowAdoptionForm(true);
    setFormStep(1);
    setSubmitSuccess(false);
    setSubmitError('');
  };

  const handleFormChange = (field: keyof AdoptionForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: 'documentFile' | 'addressProofFile', file: File | null) => {
    if (!file) {
      setForm(prev => ({ ...prev, [field]: null }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setSubmitError('File size must be less than 5MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setSubmitError('Only PDF, JPEG, PNG, and WebP files are allowed');
      return;
    }

    setSubmitError('');

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setForm(prev => ({
        ...prev,
        [field]: {
          name: file.name,
          size: file.size,
          type: file.type,
          data: base64,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const validateStep1 = () => {
    return form.applicantName && form.applicantEmail && form.applicantPhone && form.documentType && form.documentFile;
  };

  const validateStep2 = () => {
    return form.addressProofType && form.addressProofFile && form.fullAddress && form.livingArrangement;
  };

  const validateStep3 = () => {
    return form.undertakingAccepted && form.reasonForAdoption && form.message;
  };

  const handleSubmitApplication = async () => {
    if (!user || !pet) return;
    setSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        user: user._id,
        pet: pet._id,
        shelter: pet.shelter._id,
        petName: pet.name,
        petImage: pet.image,
        shelterName: pet.shelterName,
        message: form.message,
        livingArrangement: form.livingArrangement,
        hasExperience: form.hasExperience,
        reasonForAdoption: form.reasonForAdoption,
        documentType: form.documentType,
        documentFileName: form.documentFile?.name || '',
        documentFileData: form.documentFile?.data || '',
        addressProofType: form.addressProofType,
        addressProofFileName: form.addressProofFile?.name || '',
        addressProofFileData: form.addressProofFile?.data || '',
        fullAddress: form.fullAddress,
        undertakingAccepted: form.undertakingAccepted,
        applicantName: form.applicantName,
        applicantPhone: form.applicantPhone,
        applicantEmail: form.applicantEmail,
      };

      const res = await fetch('/api/adopter/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(data.error || 'Failed to submit application');
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-950 text-white' : ''}`}>
        <Icons.Loader />
        <span className={`ml-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading pet details...</span>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-950 text-white' : ''}`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Pet not found</h2>
          <Link href="/pets" className="text-rose-600 hover:text-rose-700 font-medium">Back to all pets</Link>
        </div>
      </div>
    );
  }

  const allImages = [pet.image, ...(pet.images || [])];
  const dm = darkMode;

  const inputClass = `w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all ${
    dm
      ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-orange-500'
      : 'border-2 border-rose-200 text-gray-900 placeholder-gray-400 focus:ring-rose-500'
  }`;

  const selectClass = inputClass;

  const labelClass = `block text-sm font-medium mb-2 ${dm ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gradient-to-b from-rose-50 via-white to-amber-50'}`}>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowLoginPopup(false)}>
          <div className={`relative w-full max-w-md mx-4 p-8 rounded-2xl shadow-2xl ${dm ? 'bg-gray-900 border border-gray-700' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowLoginPopup(false)} className={`absolute top-4 right-4 p-1 rounded-full ${dm ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
              <Icons.X />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
                <Icons.Paw />
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${dm ? 'text-white' : 'text-gray-900'}`}>Login Required</h3>
              <p className={`mb-6 ${dm ? 'text-gray-400' : 'text-gray-600'}`}>
                Please login to adopt a pet or add to favorites
              </p>
              <div className="flex gap-3">
                <Link href="/auth/login" className="flex-1 py-3 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 hover:from-rose-600 hover:via-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg transition-all text-center">
                  Login
                </Link>
                <Link href="/auth/signup" className={`flex-1 py-3 font-semibold rounded-xl border transition-all text-center ${dm ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Adoption Form Modal */}
      {showAdoptionForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8" onClick={() => { if (!submitting) setShowAdoptionForm(false); }}>
          <div className={`relative w-full max-w-2xl mx-4 rounded-2xl shadow-2xl ${dm ? 'bg-gray-900 border border-gray-700' : 'bg-white'}`} onClick={e => e.stopPropagation()}>

            {/* Success State */}
            {submitSuccess ? (
              <div className="p-8 text-center">
                <div className="text-emerald-500 flex justify-center mb-4">
                  <Icons.CheckCircle />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${dm ? 'text-white' : 'text-gray-900'}`}>Application Submitted!</h3>
                <p className={`mb-2 ${dm ? 'text-gray-400' : 'text-gray-600'}`}>
                  Your adoption application for <strong>{pet.name}</strong> has been submitted successfully.
                </p>
                <p className={`mb-6 text-sm ${dm ? 'text-gray-500' : 'text-gray-500'}`}>
                  You can track your application status in the Dashboard → Applications section.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => router.push('/dashboard/applications')}
                    className="px-6 py-3 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg transition-all"
                  >
                    View Applications
                  </button>
                  <button
                    onClick={() => setShowAdoptionForm(false)}
                    className={`px-6 py-3 font-semibold rounded-xl border transition-all ${dm ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className={`p-6 border-b ${dm ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-xl font-bold ${dm ? 'text-white' : 'text-gray-900'}`}>
                        Adopt {pet.name}
                      </h3>
                      <p className={`text-sm mt-1 ${dm ? 'text-gray-400' : 'text-gray-600'}`}>
                        Step {formStep} of 3 — {formStep === 1 ? 'Identity Document' : formStep === 2 ? 'Address Proof' : 'Undertaking & Reason'}
                      </p>
                    </div>
                    <button onClick={() => setShowAdoptionForm(false)} className={`p-2 rounded-full ${dm ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                      <Icons.X />
                    </button>
                  </div>
                  {/* Progress bar */}
                  <div className={`mt-4 h-2 rounded-full overflow-hidden ${dm ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 transition-all duration-500 rounded-full"
                      style={{ width: `${(formStep / 3) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Form Body */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                  {submitError && (
                    <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {submitError}
                    </div>
                  )}

                  {/* Step 1: Identity Document Upload */}
                  {formStep === 1 && (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-xl border ${dm ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Icons.FileText />
                          <span className={`font-semibold ${dm ? 'text-blue-400' : 'text-blue-700'}`}>Identity Verification</span>
                        </div>
                        <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-600'}`}>
                          Please upload a scanned copy or photo of one valid government-issued document for identity verification.
                        </p>
                      </div>

                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input
                          type="text"
                          value={form.applicantName}
                          onChange={e => handleFormChange('applicantName', e.target.value)}
                          placeholder="Enter your full name"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Email *</label>
                        <input
                          type="email"
                          value={form.applicantEmail}
                          onChange={e => handleFormChange('applicantEmail', e.target.value)}
                          placeholder="Enter your email"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Phone Number *</label>
                        <input
                          type="tel"
                          value={form.applicantPhone}
                          onChange={e => handleFormChange('applicantPhone', e.target.value)}
                          placeholder="Enter your phone number"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Document Type *</label>
                        <select
                          value={form.documentType}
                          onChange={e => handleFormChange('documentType', e.target.value)}
                          className={selectClass}
                        >
                          <option value="">Select Document Type</option>
                          <option value="Aadhar Card">Aadhar Card</option>
                          <option value="PAN Card">PAN Card</option>
                          <option value="Passport">Passport</option>
                          <option value="Driving License">Driving License</option>
                          <option value="Voter ID">Voter ID</option>
                        </select>
                      </div>

                      <div>
                        <label className={labelClass}>Upload Document *</label>
                        <input
                          ref={docFileInputRef}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.webp"
                          onChange={e => handleFileUpload('documentFile', e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        {form.documentFile ? (
                          <div className={`flex items-center gap-3 p-4 rounded-xl border ${dm ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${dm ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                              <Icons.Check />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${dm ? 'text-emerald-400' : 'text-emerald-700'}`}>{form.documentFile.name}</p>
                              <p className={`text-xs ${dm ? 'text-gray-500' : 'text-gray-500'}`}>{formatFileSize(form.documentFile.size)}</p>
                            </div>
                            <button
                              onClick={() => {
                                setForm(prev => ({ ...prev, documentFile: null }));
                                if (docFileInputRef.current) docFileInputRef.current.value = '';
                              }}
                              className={`p-2 rounded-lg transition-colors ${dm ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}
                            >
                              <Icons.X />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => docFileInputRef.current?.click()}
                            className={`w-full flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                              dm
                                ? 'border-gray-600 hover:border-orange-500 hover:bg-orange-500/5 text-gray-400'
                                : 'border-rose-200 hover:border-rose-400 hover:bg-rose-50 text-gray-500'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${dm ? 'bg-gray-700' : 'bg-rose-100'}`}>
                              <Icons.Upload />
                            </div>
                            <div className="text-center">
                              <p className={`text-sm font-medium ${dm ? 'text-gray-300' : 'text-gray-700'}`}>Click to upload your document</p>
                              <p className={`text-xs mt-1 ${dm ? 'text-gray-500' : 'text-gray-400'}`}>PDF, JPEG, PNG or WebP (max 5MB)</p>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Address Proof Upload */}
                  {formStep === 2 && (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-xl border ${dm ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Icons.Location />
                          <span className={`font-semibold ${dm ? 'text-emerald-400' : 'text-emerald-700'}`}>Address Verification</span>
                        </div>
                        <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-600'}`}>
                          Upload a scanned copy or photo of your address proof document and provide your current address.
                        </p>
                      </div>

                      <div>
                        <label className={labelClass}>Address Proof Type *</label>
                        <select
                          value={form.addressProofType}
                          onChange={e => handleFormChange('addressProofType', e.target.value)}
                          className={selectClass}
                        >
                          <option value="">Select Address Proof Type</option>
                          <option value="Electricity Bill">Electricity Bill</option>
                          <option value="Water Bill">Water Bill</option>
                          <option value="Gas Bill">Gas Bill</option>
                          <option value="Bank Statement">Bank Statement</option>
                          <option value="Rent Agreement">Rent Agreement</option>
                          <option value="Property Tax Receipt">Property Tax Receipt</option>
                          <option value="Aadhar Card">Aadhar Card (with address)</option>
                        </select>
                      </div>

                      <div>
                        <label className={labelClass}>Upload Address Proof *</label>
                        <input
                          ref={addressFileInputRef}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.webp"
                          onChange={e => handleFileUpload('addressProofFile', e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        {form.addressProofFile ? (
                          <div className={`flex items-center gap-3 p-4 rounded-xl border ${dm ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${dm ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                              <Icons.Check />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${dm ? 'text-emerald-400' : 'text-emerald-700'}`}>{form.addressProofFile.name}</p>
                              <p className={`text-xs ${dm ? 'text-gray-500' : 'text-gray-500'}`}>{formatFileSize(form.addressProofFile.size)}</p>
                            </div>
                            <button
                              onClick={() => {
                                setForm(prev => ({ ...prev, addressProofFile: null }));
                                if (addressFileInputRef.current) addressFileInputRef.current.value = '';
                              }}
                              className={`p-2 rounded-lg transition-colors ${dm ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}
                            >
                              <Icons.X />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addressFileInputRef.current?.click()}
                            className={`w-full flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                              dm
                                ? 'border-gray-600 hover:border-orange-500 hover:bg-orange-500/5 text-gray-400'
                                : 'border-rose-200 hover:border-rose-400 hover:bg-rose-50 text-gray-500'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${dm ? 'bg-gray-700' : 'bg-rose-100'}`}>
                              <Icons.Upload />
                            </div>
                            <div className="text-center">
                              <p className={`text-sm font-medium ${dm ? 'text-gray-300' : 'text-gray-700'}`}>Click to upload address proof</p>
                              <p className={`text-xs mt-1 ${dm ? 'text-gray-500' : 'text-gray-400'}`}>PDF, JPEG, PNG or WebP (max 5MB)</p>
                            </div>
                          </button>
                        )}
                      </div>

                      <div>
                        <label className={labelClass}>Full Address *</label>
                        <textarea
                          value={form.fullAddress}
                          onChange={e => handleFormChange('fullAddress', e.target.value)}
                          placeholder="Enter your complete address including city, state, and pin code"
                          rows={3}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Living Arrangement *</label>
                        <select
                          value={form.livingArrangement}
                          onChange={e => handleFormChange('livingArrangement', e.target.value)}
                          className={selectClass}
                        >
                          <option value="">Select Living Arrangement</option>
                          <option value="Own House">Own House</option>
                          <option value="Rented Apartment">Rented Apartment</option>
                          <option value="Rented House">Rented House</option>
                          <option value="Shared Accommodation">Shared Accommodation</option>
                          <option value="Farm/Rural">Farm / Rural Property</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className={`flex items-center gap-3 cursor-pointer ${dm ? 'text-gray-300' : 'text-gray-700'}`}>
                          <input
                            type="checkbox"
                            checked={form.hasExperience}
                            onChange={e => handleFormChange('hasExperience', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                          />
                          <span className="text-sm font-medium">I have prior experience with pets</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Undertaking */}
                  {formStep === 3 && (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-xl border ${dm ? 'bg-amber-500/5 border-amber-500/20' : 'bg-amber-50 border-amber-200'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Icons.FileText />
                          <span className={`font-semibold ${dm ? 'text-amber-400' : 'text-amber-700'}`}>Undertaking & Declaration</span>
                        </div>
                        <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-600'}`}>
                          Please read the undertaking carefully and provide your reason for adoption.
                        </p>
                      </div>

                      <div>
                        <label className={labelClass}>Reason for Adoption *</label>
                        <textarea
                          value={form.reasonForAdoption}
                          onChange={e => handleFormChange('reasonForAdoption', e.target.value)}
                          placeholder="Why do you want to adopt this pet? Tell us about your motivation..."
                          rows={3}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Additional Message *</label>
                        <textarea
                          value={form.message}
                          onChange={e => handleFormChange('message', e.target.value)}
                          placeholder="Any additional information you'd like the shelter to know..."
                          rows={3}
                          className={inputClass}
                        />
                      </div>

                      {/* Undertaking text */}
                      <div className={`p-4 rounded-xl border text-sm leading-relaxed ${dm ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                        <p className="font-bold mb-2">UNDERTAKING FORM</p>
                        <p className="mb-2">
                          I, <strong>{form.applicantName || '___________'}</strong>, hereby declare and undertake the following:
                        </p>
                        <ol className="list-decimal list-inside space-y-1 mb-2">
                          <li>I will provide proper food, water, shelter, and veterinary care to the adopted pet.</li>
                          <li>I will not abandon, sell, or transfer the pet to any third party without prior consent from the shelter.</li>
                          <li>I will ensure the pet is treated with kindness and not subjected to any form of cruelty or neglect.</li>
                          <li>I will comply with all local laws and regulations regarding pet ownership.</li>
                          <li>I will allow the shelter to conduct follow-up visits to ensure the pet&apos;s well-being.</li>
                          <li>I understand that providing false information may result in the pet being reclaimed by the shelter.</li>
                          <li>All information provided in this application is true and accurate to the best of my knowledge.</li>
                        </ol>
                      </div>

                      <div>
                        <label className={`flex items-center gap-3 cursor-pointer ${dm ? 'text-gray-300' : 'text-gray-700'}`}>
                          <input
                            type="checkbox"
                            checked={form.undertakingAccepted}
                            onChange={e => handleFormChange('undertakingAccepted', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                          />
                          <span className="text-sm font-medium">
                            I have read and agree to the above undertaking and declaration *
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className={`p-6 border-t flex items-center justify-between ${dm ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div>
                    {formStep > 1 && (
                      <button
                        onClick={() => setFormStep(prev => prev - 1)}
                        className={`px-5 py-2.5 font-semibold rounded-xl border transition-all ${dm ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                      >
                        Back
                      </button>
                    )}
                  </div>
                  <div>
                    {formStep < 3 ? (
                      <button
                        onClick={() => setFormStep(prev => prev + 1)}
                        disabled={(formStep === 1 && !validateStep1()) || (formStep === 2 && !validateStep2())}
                        className="px-6 py-2.5 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 hover:from-rose-600 hover:via-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next Step
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitApplication}
                        disabled={!validateStep3() || submitting}
                        className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {submitting ? <><Icons.SmallLoader /> Submitting...</> : 'Submit Application'}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`sticky top-0 z-10 transition-colors duration-300 backdrop-blur-lg ${darkMode ? 'bg-gray-900/95 border-b border-gray-800' : 'bg-white/95 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/pets" className={`flex items-center gap-2 font-medium ${darkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-rose-600'}`}>
            <Icons.ArrowLeft /> Back to All Pets
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
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className={`rounded-2xl overflow-hidden shadow-xl mb-4 relative ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <img src={allImages[selectedImage]} alt={pet.name} className="w-full aspect-square object-cover" />
              <span className="absolute top-4 left-4 px-4 py-2 rounded-full text-lg font-bold bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg">
                Available for Adoption
              </span>
            </div>
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-xl overflow-hidden ${selectedImage === index ? 'ring-4 ring-rose-500' : darkMode ? 'ring-2 ring-gray-700' : 'ring-2 ring-gray-200'}`}
                  >
                    <img src={img} alt={`${pet.name} ${index + 1}`} className="w-full aspect-square object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pet Details */}
          <div className="space-y-6">
            <div className={`rounded-2xl shadow-xl p-8 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pet.name}</h1>
                  <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pet.breed}</p>
                </div>
                <button
                  onClick={toggleFavorite}
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all ${
                    isFavorite
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white scale-110'
                      : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                  }`}
                >
                  {isFavorite ? <Icons.HeartFilled /> : <Icons.HeartOutline />}
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <span className={`px-4 py-2 rounded-full font-semibold border ${darkMode ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-gradient-to-r from-rose-100 to-orange-100 text-rose-600 border-rose-200'}`}>{pet.type}</span>
                <span className={`px-4 py-2 rounded-full font-semibold border ${darkMode ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 border-blue-200'}`}>{pet.age}</span>
                <span className={`px-4 py-2 rounded-full font-semibold border ${darkMode ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 border-purple-200'}`}>{pet.gender}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-amber-500/5 border-amber-500/20' : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'}`}>
                  <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Color</p>
                  <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pet.color}</p>
                </div>
                {pet.weight && (
                  <div className={`p-4 rounded-xl border ${darkMode ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'}`}>
                    <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Weight</p>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pet.weight}</p>
                  </div>
                )}
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-violet-500/5 border-violet-500/20' : 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200'}`}>
                  <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Vaccinated</p>
                  {pet.vaccinated ? (
                    <span className="flex items-center gap-1 text-green-500 font-bold"><Icons.Check /> Yes</span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-500 font-bold"><Icons.X /> No</span>
                  )}
                </div>
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-pink-500/5 border-pink-500/20' : 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200'}`}>
                  <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Neutered</p>
                  {pet.neutered ? (
                    <span className="flex items-center gap-1 text-green-500 font-bold"><Icons.Check /> Yes</span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-500 font-bold"><Icons.X /> No</span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Personality Traits</h3>
                <div className="flex flex-wrap gap-2">
                  {pet.personality.map((trait) => (
                    <span key={trait} className={`px-4 py-2 rounded-full font-medium border ${darkMode ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 border-cyan-200'}`}>{trait}</span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>About {pet.name}</h3>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{pet.description}</p>
              </div>

              <div className={`border-t pt-6 ${darkMode ? 'border-gray-700' : ''}`}>
                <div className={`rounded-xl p-4 mb-6 text-center border ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200'}`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Adoption Status</p>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Available</p>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-emerald-400/70' : 'text-emerald-600'}`}>Give {pet.name} a loving home!</p>
                </div>
                <button
                  onClick={handleTakeHome}
                  className="w-full py-4 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 hover:from-rose-600 hover:via-orange-600 hover:to-amber-600 text-white text-lg font-bold rounded-xl shadow-lg transition-all"
                >
                  Take {pet.name} Home!
                </button>
              </div>
            </div>

            {/* Shelter Information */}
            {pet.shelter && (
              <div className={`rounded-2xl shadow-xl p-8 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
                <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Shelter Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center text-white flex-shrink-0"><Icons.Location /></div>
                    <div>
                      <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pet.shelter.name}</p>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{pet.shelter.city}, {pet.shelter.state}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white flex-shrink-0"><Icons.Phone /></div>
                    <div>
                      <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Phone</p>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{pet.shelter.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white flex-shrink-0"><Icons.Mail /></div>
                    <div>
                      <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email</p>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{pet.shelter.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white flex-shrink-0"><Icons.Clock /></div>
                    <div>
                      <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Operating Hours</p>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{pet.shelter.operatingHours}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}