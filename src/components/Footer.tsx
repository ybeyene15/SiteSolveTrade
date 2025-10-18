import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <footer id="contact" className="bg-black border-t border-white/5 pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <div>
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 mb-6"
            >
              <Zap className="w-6 h-6 text-cyan-400" />
              <span className="text-xl font-bold text-white">SiteSolve</span>
            </Link>

            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">Company</h4>
                <p className="text-gray-400">Site Solver digital solutions</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Contact</h4>
                <p className="text-gray-400">+1 (703) 887-9122</p>
                <p className="text-gray-400">sitsolvesolutions@gmail.com</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Pricing
                </Link>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('approach')} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Approach
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('benefits')} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Benefits
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-settings" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Cookie Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
          <p className="text-gray-400 text-center">
            © 2025 Site Solve. Digital solutions crafted with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
