"use client"
import Link from 'next/link';

// SVG Icon Components
const Icons = {
  ArrowLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
    </svg>
  ),
  Book: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Heart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Home: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  FileText: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  DollarSign: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
};

const adoptionSteps = [
  {
    step: 1,
    title: "Browse Available Pets",
    description: "Search through our database of adorable pets waiting for their forever homes. Use filters to find pets that match your lifestyle and preferences.",
    icon: Icons.Book,
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: 2,
    title: "Submit Application",
    description: "Fill out our comprehensive adoption application form. Provide information about your living situation, experience with pets, and why you want to adopt.",
    icon: Icons.FileText,
    color: "from-violet-500 to-purple-500",
  },
  {
    step: 3,
    title: "Application Review",
    description: "Our team and the shelter will review your application. This typically takes 2-3 business days. We may contact you for additional information.",
    icon: Icons.Users,
    color: "from-rose-500 to-pink-500",
  },
  {
    step: 4,
    title: "Meet & Greet",
    description: "Schedule a virtual or in-person meeting with the pet. This is your chance to interact and see if there's a connection. Bring family members if applicable.",
    icon: Icons.Heart,
    color: "from-amber-500 to-orange-500",
  },
  {
    step: 5,
    title: "Home Visit",
    description: "Some shelters may conduct a home visit to ensure your living environment is suitable for the pet. This is to ensure the safety and well-being of the animal.",
    icon: Icons.Home,
    color: "from-emerald-500 to-teal-500",
  },
  {
    step: 6,
    title: "Finalize Adoption",
    description: "Complete the adoption paperwork and pay the adoption fee. Receive all medical records, vaccination history, and care instructions for your new companion.",
    icon: Icons.DollarSign,
    color: "from-indigo-500 to-blue-500",
  },
];

const preparationChecklist = [
  "Research the specific needs of the pet species and breed you're interested in",
  "Ensure all family members are on board with the adoption decision",
  "Pet-proof your home by removing hazards and securing dangerous items",
  "Purchase essential supplies: food, bowls, bed, toys, leash/collar, litter box (for cats)",
  "Find a reputable veterinarian in your area",
  "Budget for ongoing costs: food, medical care, grooming, training",
  "Prepare a quiet, comfortable space for your new pet to adjust",
  "Plan time off work for the first few days to help your pet settle in",
  "Research pet insurance options for unexpected medical expenses",
  "Learn about proper nutrition and feeding schedules for your pet",
];

const careTips = [
  {
    title: "First Week Home",
    tips: [
      "Give your pet time to adjust - don't overwhelm them with visitors",
      "Establish a consistent routine for feeding, walks, and playtime",
      "Be patient with accidents - house training takes time",
      "Start basic training with positive reinforcement",
      "Schedule a vet check-up within the first week",
    ],
  },
  {
    title: "Nutrition & Health",
    tips: [
      "Feed high-quality pet food appropriate for their age and size",
      "Provide fresh water at all times",
      "Keep up with vaccination schedules and preventive medications",
      "Monitor weight and adjust food portions as needed",
      "Watch for signs of illness: lethargy, loss of appetite, vomiting",
    ],
  },
  {
    title: "Exercise & Enrichment",
    tips: [
      "Dogs need daily walks and playtime - at least 30-60 minutes",
      "Cats need interactive toys and climbing structures",
      "Mental stimulation is as important as physical exercise",
      "Rotate toys to keep your pet engaged",
      "Consider puzzle feeders to make mealtime more engaging",
    ],
  },
  {
    title: "Training & Socialization",
    tips: [
      "Start training early with positive reinforcement methods",
      "Be consistent with commands and rules across all family members",
      "Socialize your pet with other animals and people gradually",
      "Address behavioral issues early before they become habits",
      "Consider professional training classes for puppies and dogs",
    ],
  },
];

export default function AdoptionGuidesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900/95 border-b border-gray-800 backdrop-blur-lg shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              PawMatch
            </Link>
            <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-orange-400 font-medium">
              <Icons.ArrowLeft />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Adoption <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-rose-500 bg-clip-text text-transparent">Guides</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to know about adopting a pet and providing them with a loving forever home
          </p>
        </div>

        {/* Adoption Process Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">The Adoption Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adoptionSteps.map((item) => (
              <div key={item.step} className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:border-gray-600 transition-all">
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                  <item.icon />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    Step {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Preparation Checklist */}
        <section className="mb-16">
          <div className="bg-emerald-500/5 rounded-2xl p-8 border border-emerald-500/20">
            <h2 className="text-3xl font-bold text-white mb-6">Pre-Adoption Checklist</h2>
            <p className="text-gray-300 mb-6">
              Before bringing your new pet home, make sure you&apos;re fully prepared. Here&apos;s a comprehensive checklist to help you get ready:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {preparationChecklist.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-gray-800 border border-gray-700 rounded-xl p-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                    <Icons.Check />
                  </div>
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pet Care Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Essential Pet Care Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {careTips.map((section, index) => (
              <div key={index} className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Cost Information */}
        <section className="mb-16">
          <div className="bg-amber-500/5 rounded-2xl p-8 border border-amber-500/20">
            <h2 className="text-3xl font-bold text-white mb-6">Understanding Adoption Costs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">One-Time Costs</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Adoption fee: $50 - $500 (varies by shelter and pet)</li>
                  <li>• Initial vet visit and vaccinations: $100 - $300</li>
                  <li>• Spay/neuter (if not included): $200 - $500</li>
                  <li>• Microchipping: $25 - $50</li>
                  <li>• Initial supplies (bed, bowls, toys): $100 - $300</li>
                  <li>• Crate or carrier: $30 - $150</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Ongoing Monthly Costs</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Food: $30 - $100</li>
                  <li>• Preventive medications (flea, tick, heartworm): $20 - $60</li>
                  <li>• Pet insurance: $30 - $70</li>
                  <li>• Grooming: $30 - $90 (varies by breed)</li>
                  <li>• Toys and treats: $10 - $30</li>
                  <li>• Annual vet check-ups: $50 - $100 (averaged monthly)</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-gray-300 font-medium">
              Note: These are average estimates. Actual costs vary based on pet size, breed, age, and location. Emergency vet visits can cost $500 - $2,000+.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adoption Journey?</h2>
            <p className="text-xl mb-8 text-white/90">
              Browse our available pets and find your perfect companion today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pets" className="px-8 py-4 bg-white text-orange-600 hover:bg-orange-50 font-bold rounded-xl shadow-lg transition-all">
                Browse Available Pets
              </Link>
              <Link href="/faqs" className="px-8 py-4 border-2 border-white text-white hover:bg-white/10 font-bold rounded-xl transition-all">
                View FAQs
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}