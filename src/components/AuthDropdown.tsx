import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, LogIn, UserPlus } from 'lucide-react';

export default function AuthDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white border border-gray-700 rounded-lg hover:border-gray-600 transition-all duration-300"
      >
        <User className="w-4 h-4" />
        <span>Account</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl border border-white/10 py-2 z-20 animate-fade-in">
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
          >
            <UserPlus className="w-4 h-4" />
            <span>Sign Up</span>
          </Link>
        </div>
      )}
    </div>
  );
}
