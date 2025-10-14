import { useState, useEffect } from 'react';
import { Check, ArrowRight, ArrowLeft, Sparkles, Shield, Clock } from 'lucide-react';
import { useAuth } from '../components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { createCheckoutSession } from '../lib/stripe';
import { STRIPE_PRODUCTS } from '../stripe-config';

export default function CheckoutConfirmation() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { state: { from: { pathname: '/pricing' }, initiateCheckout: true } });
    }
  }, [user, authLoading, navigate]);

  const handleProceedToPayment = async () => {
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions to proceed.');
      return;
    }

    try {
      setCheckoutLoading(true);
      setError(null);

      const product = STRIPE_PRODUCTS[0];

      const { url } = await createCheckoutSession({
        price_id: product.priceId,
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/checkout-confirmation`,
        mode: product.mode
      });

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unable to start checkout. Please try again.';
      setError(errorMessage);
      setCheckoutLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/pricing');
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

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
            <div className="text-center mb-12">
              <div className="mb-6 inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                <span className="text-cyan-400 text-sm font-semibold tracking-wide">Step 2 of 2</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">Launch Your Site</span>
              </h1>

              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                The web is waiting. Let's build your space.
              </p>
            </div>

            <div className="relative group mb-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition duration-500"></div>

              <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Complete Website Package</h2>
                </div>

                <div className="mb-8 pb-8 border-b border-white/10">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl md:text-6xl font-bold text-white">$499</span>
                    <span className="text-2xl text-gray-400">.99</span>
                  </div>
                  <p className="text-gray-400 text-lg">One-time payment. No recurring charges.</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">What's Included:</h3>
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-cyan-400" />
                        </div>
                        <span className="text-gray-300 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                    <Shield className="w-6 h-6 text-cyan-400 mb-2" />
                    <h4 className="text-white font-semibold text-sm mb-1">Secure Payment</h4>
                    <p className="text-gray-400 text-xs">Protected by Stripe</p>
                  </div>
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                    <Clock className="w-6 h-6 text-cyan-400 mb-2" />
                    <h4 className="text-white font-semibold text-sm mb-1">Quick Delivery</h4>
                    <p className="text-gray-400 text-xs">1-2 weeks turnaround</p>
                  </div>
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                    <Check className="w-6 h-6 text-cyan-400 mb-2" />
                    <h4 className="text-white font-semibold text-sm mb-1">Full Ownership</h4>
                    <p className="text-gray-400 text-xs">All code and design yours</p>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/10 rounded-lg p-6 mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                    />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      I agree to the{' '}
                      <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">
                        Privacy Policy
                      </a>
                      . I understand that this is a one-time payment for custom website development services.
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-red-400 text-center text-sm">{error}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleGoBack}
                    disabled={checkoutLoading}
                    className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Go Back
                  </button>

                  <button
                    onClick={handleProceedToPayment}
                    disabled={checkoutLoading || !agreedToTerms}
                    className="flex-1 group/btn px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {checkoutLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Proceed to Payment
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-gray-500 text-xs mt-6">
                  You will be redirected to Stripe's secure payment page
                </p>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">What Happens Next?</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Secure Payment</h4>
                    <p className="text-gray-400 text-sm">Complete your payment through Stripe's secure checkout</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Project Kickoff</h4>
                    <p className="text-gray-400 text-sm">We'll reach out within 24 hours to discuss your requirements</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Development & Delivery</h4>
                    <p className="text-gray-400 text-sm">Your custom website delivered in 1-2 weeks, ready to launch</p>
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
