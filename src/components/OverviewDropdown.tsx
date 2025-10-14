import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface OverviewDropdownProps {
  scrollToSection: (sectionId: string) => void;
  isHome: boolean;
}

export default function OverviewDropdown({ scrollToSection, isHome }: OverviewDropdownProps) {
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

  const handleItemClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  if (!isHome) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      <button
        onClick={handleClick}
        className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-300"
      >
        <span>Overview</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl border border-white/10 py-2 z-20 animate-fade-in">
            <button
              onClick={() => handleItemClick('services')}
              className="w-full text-left px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
            >
              Services
            </button>
            <button
              onClick={() => handleItemClick('approach')}
              className="w-full text-left px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
            >
              Approach
            </button>
            <button
              onClick={() => handleItemClick('benefits')}
              className="w-full text-left px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
            >
              Benefits
            </button>
        </div>
      )}
    </div>
  );
}
