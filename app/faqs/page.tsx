"use client"
import { useState } from 'react';
import Link from 'next/link';

const Icons = {
  ArrowLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  HelpCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
    </svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
};

const faqCategories = [
  {
    category: "General Questions",
    icon: "❓",
    color: "from-blue-500 to-cyan-500",
    questions: [
      { question: "What is PawMatch?", answer: "PawMatch is a comprehensive pet adoption platform that connects potential adopters with shelters and rescue organizations. We use smart matching technology to help you find the perfect pet based on your lifestyle, preferences, and living situation." },
      { question: "How does PawMatch work?", answer: "PawMatch connects you with shelters and rescue organizations. You can browse pets, search shelters, and submit adoption applications directly through our platform. It's simple and straightforward!" },
      { question: "How do I get started?", answer: "Simply browse our available pets, use filters to narrow down your search, and click on any pet to view their full profile. When you find a pet you're interested in, click 'Start Adoption Process' to submit an application directly to the shelter." },
      { question: "Can I adopt from any location?", answer: "Most shelters prefer local adoptions, but some are willing to work with out-of-state adopters. Check the individual shelter's policies on their profile page. You can filter pets by location to find those nearest to you." },
    ]
  },
  {
    category: "Adoption Process",
    icon: "📋",
    color: "from-violet-500 to-purple-500",
    questions: [
      { question: "How long does the adoption process take?", answer: "The timeline varies by shelter but typically takes 1-2 weeks from application submission to bringing your pet home. This includes application review (2-3 days), meet & greet scheduling, potential home visit, and final paperwork." },
      { question: "What information do I need to provide in my application?", answer: "You'll need to provide: personal information (name, address, contact), housing details (own/rent, landlord approval if renting), household information (family members, other pets), veterinary references, and why you want to adopt this specific pet." },
      { question: "Can my application be denied?", answer: "Yes. Shelters may deny applications if they feel the match isn't suitable. Common reasons include: incompatible living situation, lack of pet experience for high-maintenance breeds, inability to meet the pet's needs, or incomplete/inconsistent application information." },
      { question: "Can I meet the pet before adopting?", answer: "Absolutely! We encourage meet & greets. You can schedule virtual video calls or in-person visits at the shelter. This helps you and the pet get to know each other and ensures it's a good match before finalizing the adoption." },
    ]
  },
  {
    category: "Pet Care & Requirements",
    icon: "🐾",
    color: "from-rose-500 to-pink-500",
    questions: [
      { question: "What if I've never owned a pet before?", answer: "First-time pet owners are welcome! We recommend starting with a pet that matches your experience level. Many shelters offer post-adoption support, training resources, and can recommend pets that are good for beginners." },
      { question: "Are all pets vaccinated and spayed/neutered?", answer: "Most shelters ensure pets are up-to-date on vaccinations and spayed/neutered before adoption. If not, it's typically included in the adoption agreement and fee. Check each pet's profile for their current health status." },
      { question: "What if I have other pets at home?", answer: "Many pets can live with other animals! Look for pets marked as 'good with other dogs/cats' in their profile. Shelters often allow meet & greets between your current pets and potential new family members." },
      { question: "What are the ongoing costs of pet ownership?", answer: "Monthly costs typically range from $50-$200+ including food ($30-100), preventive medications ($20-60), pet insurance ($30-70), and grooming ($30-90). Budget for annual vet visits ($200-400) and emergency funds." },
    ]
  },
  {
    category: "After Adoption",
    icon: "🏠",
    color: "from-emerald-500 to-teal-500",
    questions: [
      { question: "What support is available after adoption?", answer: "Most shelters offer post-adoption support including training resources, behavioral consultations, and medical advice. PawMatch also provides comprehensive care guides, a community forum, and access to pet care professionals." },
      { question: "What if the adoption doesn't work out?", answer: "While we hope every adoption is successful, we understand circumstances change. Most shelters have return policies (typically 30 days to lifetime). Contact the shelter immediately if you're having issues." },
      { question: "How can I share my adoption success story?", answer: "We'd love to hear from you! You can submit your success story through your account dashboard. Include photos and details about your adoption journey. Success stories help inspire others to adopt." },
    ]
  },
];

export default function FAQsPage() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenQuestion(openQuestion === key ? null : key);
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900/95 border-b border-gray-800 backdrop-blur-lg sticky top-0 z-10">
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

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-violet-500 to-purple-500 rounded-3xl flex items-center justify-center text-white shadow-lg">
            <Icons.HelpCircle />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about pet adoption, our platform, and the adoption process
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400">
              <Icons.Search />
            </span>
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder-gray-500 text-lg shadow-lg"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div className={`bg-gradient-to-r ${category.color} p-6`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="text-2xl font-bold text-white">{category.category}</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => {
                    const isOpen = openQuestion === `${categoryIndex}-${questionIndex}`;
                    return (
                      <div key={questionIndex} className="border border-gray-700 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-800/50 transition-colors"
                        >
                          <span className="font-semibold text-white pr-4">{item.question}</span>
                          <span className={`transform transition-transform flex-shrink-0 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}>
                            <Icons.ChevronDown />
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 pt-2 bg-gray-800/50 border-t border-gray-700">
                            <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {searchQuery && filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400 mb-4">No questions found matching &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-xl hover:from-violet-600 hover:to-purple-600 transition-all"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Still Have Questions */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-xl mb-8 text-white/90">
              Can&apos;t find what you&apos;re looking for? Check out our adoption guides or contact us directly!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/guides" className="px-8 py-4 bg-white text-purple-600 hover:bg-purple-50 font-bold rounded-xl shadow-lg transition-all">
                View Adoption Guides
              </Link>
              <Link href="/#contact" className="px-8 py-4 border-2 border-white text-white hover:bg-white/10 font-bold rounded-xl transition-all">
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}