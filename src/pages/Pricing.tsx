import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Check if user is authenticated
    if (!user) {
      // Redirect to login with return path
      navigate('/login', { state: { from: { pathname: '/pricing' }, initiateCheckout: true } });
      return;
    }

    // Navigate to checkout confirmation page
    navigate('/checkout-confirmation');
  };

  const features = [
    'Multiple custom pages (Home, About, Contact)',
    'Mobile-responsive design',
    'Basic SEO setup',
    'Contact form integration',
    'Domain connection (client provides domain)',
    '1 revision round',
    'Delivered ready to launch'
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-black to-blue-950/20"></div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-6 inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                <span className="text-cyan-400 text-sm font-semibold tracking-wide">Simple Pricing</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Buy Your Site.</span><br />
                <span className="text-cyan-400">
                  Own Your Future.
                </span>
              </h1>

              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A complete, custom-built website. You buy it. You own it.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition duration-500"></div>

                <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 hover:border-cyan-500/50 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                      <Sparkles className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Complete Website Package</h2>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-6xl md:text-7xl font-bold text-white">$499</span>
                      <span className="text-2xl text-gray-400">.99</span>
                    </div>
                    <p className="text-gray-400 text-lg">One-time payment. Yours forever.</p>
                  </div>

                  <div className="space-y-4 mb-10">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mt-0.5">
                          <Check className="w-4 h-4 text-cyan-400" />
                        </div>
                        <span className="text-gray-300 text-lg leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6 mb-8">
                    <p className="text-cyan-400 font-semibold text-center text-lg">
                      No subscriptions. No ongoing fees.<br />
                      Just your site, built and handed over.
                    </p>
                  </div>

                  <button
                    onClick={handleGetStarted}
                    disabled={authLoading}
                    className="w-full group/btn px-8 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-bold rounded-xl hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {authLoading ? (
                      'Loading...'
                    ) : (
                      <>
                        Get Started Now
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-500 text-sm mt-6">
                    Ready to Launch in the Blink of an Eye.
                  </p>
                </div>
              </div>

              <div className="mt-16 text-center">
                <h3 className="text-2xl font-bold text-white mb-8">What You Get</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                    <div className="text-4xl mb-4">🎨</div>
                    <h4 className="text-white font-semibold mb-2">Custom Design</h4>
                    <p className="text-gray-400 text-sm">
                      Professionally designed to match your brand and vision
                    </p>
                  </div>

                  <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                    <div className="text-4xl mb-4">📱</div>
                    <h4 className="text-white font-semibold mb-2">Mobile Ready</h4>
                    <p className="text-gray-400 text-sm">
                      Looks perfect on all devices, from phones to desktops
                    </p>
                  </div>

                  <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                    <div className="text-4xl mb-4">🚀</div>
                    <h4 className="text-white font-semibold mb-2">Launch Ready</h4>
                    <p className="text-gray-400 text-sm">
                      Delivered complete and ready to go live immediately
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 bg-white/[0.02] border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Do I really own the website?</h4>
                    <p className="text-gray-400">
                      Yes, absolutely. Once delivered and paid for, you own all the code and design. No strings attached.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">What if I need more pages later?</h4>
                    <p className="text-gray-400">
                      We can discuss additional pages or features as separate projects. We're here to help you grow.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Is hosting included?</h4>
                    <p className="text-gray-400">
                      The price covers development only. We can recommend affordable hosting options or help you set up hosting for a small additional fee.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">What about maintenance?</h4>
                    <p className="text-gray-400">
                      The site is yours to maintain. If you need ongoing support, we offer maintenance packages separately.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">How long does it take?</h4>
                    <p className="text-gray-400">
                      Typically 1-2 weeks from project kickoff to delivery, depending on your feedback and content availability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
