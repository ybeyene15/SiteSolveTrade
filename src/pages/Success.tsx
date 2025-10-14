import React, { useEffect, useState } from 'react';
import { CheckCircle, Home, Sparkles } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      // Just verify the session exists, no need to display details
      setTimeout(() => setLoading(false), 500);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-cyan-500/30 border-t-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-black to-blue-950/20"></div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="relative max-w-2xl w-full">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition duration-500"></div>

          <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 text-center">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cyan-500/10 border-2 border-cyan-500 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-cyan-400" />
              </div>

              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-cyan-400" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Thank You!
                </h1>
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </div>

              <p className="text-xl text-gray-400 mb-8">
                Your payment was successful and your order is confirmed.
              </p>
            </div>

            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6 mb-8">
              <p className="text-cyan-400 font-semibold text-lg leading-relaxed">
                We'll be in touch within 24 hours to discuss your project details and get started on building your dream website.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/"
                className="flex-1 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-bold rounded-xl hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">
              Check your email for order confirmation and next steps
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;