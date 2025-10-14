import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Menu, X, LogIn, UserPlus, ChevronDown } from 'lucide-react';
import { useAuth } from './auth/AuthProvider';
import { auth } from '../lib/auth';
import UserMenu from './UserMenu';
import OverviewDropdown from './OverviewDropdown';
import AuthDropdown from './AuthDropdown';

function MobileOverviewSection({ scrollToSection }: { scrollToSection: (id: string) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-gray-300 hover:text-white transition-colors duration-300 text-left"
      >
        <span>Overview</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isExpanded && (
        <div className="pl-4 space-y-2 border-l-2 border-cyan-500/30">
          <button
            onClick={() => scrollToSection('services')}
            className="block text-gray-400 hover:text-white transition-colors duration-300 text-left w-full"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('approach')}
            className="block text-gray-400 hover:text-white transition-colors duration-300 text-left w-full"
          >
            Approach
          </button>
          <button
            onClick={() => scrollToSection('benefits')}
            className="block text-gray-400 hover:text-white transition-colors duration-300 text-left w-full"
          >
            Benefits
          </button>
        </div>
      )}
    </div>
  );
}

interface NavbarProps {
  onGetQuote?: (() => void) | null;
}

export default function Navbar({ onGetQuote }: NavbarProps = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const isHome = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    if (!isHome) {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    const { error } = await auth.signOut();
    if (!error) {
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold text-white">SiteSolve</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isHome ? (
              <>
                <OverviewDropdown scrollToSection={scrollToSection} isHome={isHome} />
                <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors duration-300">Pricing</Link>
                <button onClick={() => scrollToSection('cta')} className="text-gray-300 hover:text-white transition-colors duration-300">Contact</button>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">Home</Link>
                <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors duration-300">Pricing</Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!loading && (
              <>
                {user ? (
                  <div className="hidden md:block">
                    <UserMenu user={user} onSignOut={handleSignOut} />
                  </div>
                ) : (
                  <div className="hidden md:block">
                    <AuthDropdown />
                  </div>
                )}
              </>
            )}

            <button
              onClick={() => {
                if (onGetQuote) {
                  onGetQuote();
                } else {
                  scrollToSection('cta');
                }
              }}
              className="hidden md:block px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              Get Quote
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/5 pt-4">
            <div className="flex flex-col gap-4">
              {isHome ? (
                <>
                  <MobileOverviewSection scrollToSection={scrollToSection} />
                  <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors duration-300">Pricing</Link>
                  <button onClick={() => scrollToSection('cta')} className="text-gray-300 hover:text-white transition-colors duration-300 text-left">Contact</button>
                </>
              ) : (
                <>
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors duration-300">Home</Link>
                  <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors duration-300">Pricing</Link>
                </>
              )}

              {!loading && (
                <>
                  {user ? (
                    <div className="border-t border-white/5 pt-4 space-y-3">
                      <div className="px-2 py-2 bg-white/5 rounded-lg">
                        <p className="text-sm font-medium text-white">{user.email}</p>
                      </div>
                      <Link
                        to="/account"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        Account
                      </Link>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          handleSignOut();
                        }}
                        className="w-full text-left text-red-400 hover:text-red-300 transition-colors duration-300"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="border-t border-white/5 pt-4 space-y-3">
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Sign In</span>
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all duration-300"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Sign Up</span>
                      </Link>
                    </div>
                  )}
                </>
              )}

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (onGetQuote) {
                    onGetQuote();
                  } else {
                    scrollToSection('cta');
                  }
                }}
                className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 w-full text-center"
              >
                Get Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
