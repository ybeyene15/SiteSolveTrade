import { useState } from 'react';
import { Check } from 'lucide-react';

export default function CookieSettings() {
  const [performanceCookies, setPerformanceCookies] = useState(false);
  const [functionalCookies, setFunctionalCookies] = useState(false);
  const [marketingCookies, setMarketingCookies] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleAcceptAll = () => {
    setPerformanceCookies(true);
    setFunctionalCookies(true);
    setMarketingCookies(true);
    savePreferences(true, true, true);
  };

  const handleRejectNonEssential = () => {
    setPerformanceCookies(false);
    setFunctionalCookies(false);
    setMarketingCookies(false);
    savePreferences(false, false, false);
  };

  const handleSaveCustom = () => {
    savePreferences(performanceCookies, functionalCookies, marketingCookies);
  };

  const savePreferences = (performance: boolean, functional: boolean, marketing: boolean) => {
    localStorage.setItem('cookiePreferences', JSON.stringify({
      essential: true,
      performance,
      functional,
      marketing,
      timestamp: new Date().toISOString()
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-black to-blue-950/20"></div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-5xl">🍪</span>
                Cookie Settings
              </h1>
              <p className="text-gray-400 text-lg">
                Manage your cookie preferences and data collection settings
              </p>
            </div>

            <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                We use cookies to enhance your experience, analyze site usage, and personalize content. You can choose which categories to allow:
              </p>

              {saved && (
                <div className="mb-6 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-400" />
                  <p className="text-cyan-400 font-semibold">Your preferences have been saved!</p>
                </div>
              )}

              <div className="space-y-6 mb-10">
                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">Essential Cookies</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Required for basic site functionality. These cookies are always active and cannot be disabled.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-14 h-8 bg-cyan-500 rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-50">
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-colors duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">Performance Cookies</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Help us understand how visitors interact with the site by collecting and reporting information anonymously.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => setPerformanceCookies(!performanceCookies)}
                        className={`w-14 h-8 rounded-full flex items-center px-1 transition-all duration-300 ${
                          performanceCookies ? 'bg-cyan-500 justify-end' : 'bg-gray-600 justify-start'
                        }`}
                      >
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-colors duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">Functional Cookies</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Enable enhanced features like remembering your preferences and providing personalized content.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => setFunctionalCookies(!functionalCookies)}
                        className={`w-14 h-8 rounded-full flex items-center px-1 transition-all duration-300 ${
                          functionalCookies ? 'bg-cyan-500 justify-end' : 'bg-gray-600 justify-start'
                        }`}
                      >
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-colors duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">Marketing Cookies</h3>
                      <p className="text-gray-400 leading-relaxed">
                        Used to deliver relevant ads and measure campaign effectiveness across websites.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => setMarketingCookies(!marketingCookies)}
                        className={`w-14 h-8 rounded-full flex items-center px-1 transition-all duration-300 ${
                          marketingCookies ? 'bg-cyan-500 justify-end' : 'bg-gray-600 justify-start'
                        }`}
                      >
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6 mb-8">
                <p className="text-cyan-400 text-center leading-relaxed">
                  You can update your preferences anytime by returning to this page.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Accept All
                </button>
                <button
                  onClick={handleRejectNonEssential}
                  className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Reject Non-Essential
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="flex-1 px-6 py-4 bg-white/5 border border-cyan-500/30 text-cyan-400 font-bold rounded-xl hover:bg-cyan-500/10 transition-all duration-300"
                >
                  Save Custom Settings
                </button>
              </div>
            </div>

            <div className="mt-12 bg-white/[0.02] border border-white/10 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">What Are Cookies?</h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Cookies are small text files that are placed on your device when you visit a website. They help websites remember your preferences and provide a better browsing experience.
                </p>
                <p>
                  We use cookies responsibly and in accordance with privacy regulations. You have full control over which cookies you allow, except for essential cookies which are necessary for the site to function properly.
                </p>
                <p>
                  For more information about how we handle your data, please review our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
