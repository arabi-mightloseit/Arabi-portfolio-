import React, { useState } from 'react';
import { SignatureSwitch } from './SignatureSwitch';
import { ThemeMode } from '../types';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  isArmed: boolean;
  onToggleArmed: (armed: boolean) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isArmed,
  onToggleArmed,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isNoir = theme === 'noir';

  const navLinks = isArmed
    ? []
    : [
        { label: 'About', href: '#about' },
        { label: 'Focus', href: '#interests' },
        { label: 'Work', href: '#projects' },
        { label: 'Approach', href: '#approach' },
        { label: 'Contact', href: '#contact' },
      ];

  // Smooth editorial glide navigation with sticky header offset compensation
  const handleGlide = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 border-b backdrop-blur-md ${
        isArmed
          ? 'bg-[#06070A]/92 border-[#1E2235] text-[#F1EBDD]'
          : isNoir
          ? 'bg-[#101116]/92 border-[#202330] text-[#F1EBDD]'
          : 'bg-[#F1EBDD]/92 border-[#D8CEBA] text-[#101116]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between gap-4">
        {/* Left Zone: Signature Switch Hardware */}
        <div className="flex items-center">
          {/* Top-left Enlarged Signature Switch */}
          <SignatureSwitch
            isArmed={isArmed}
            onToggle={onToggleArmed}
            theme={theme}
          />
        </div>

        {/* Center Zone: Clean Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-editorial-sans font-semibold tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleGlide(e, link.href)}
              className={`transition-colors duration-150 relative py-1 cursor-pointer ${
                isNoir
                  ? 'text-[#F1EBDD]/80 hover:text-[#5577FF]'
                  : 'text-[#101116]/80 hover:text-[#2946D3]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Zone: Palette Mode Toggle & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          {/* Palette Mode Selector [Noir / Ivory] - Hidden on Section W artistic */}
          {!isArmed && (
            <button
              type="button"
              onClick={onToggleTheme}
              className={`font-editorial-mono text-xs tracking-[0.16em] uppercase px-3 py-1.5 rounded-sm border-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                isNoir
                  ? 'border-[#383E54] hover:border-[#525B7C] bg-[#181A22] text-[#F1EBDD] hover:bg-[#202330]'
                  : 'border-[#BAAE96] hover:border-[#8E826B] bg-[#E8DFC9] text-[#101116] hover:bg-[#DDD3BC]'
              }`}
              title="Toggle between Pure Black (#101116) and Warm Ivory (#F1EBDD)"
            >
              <span className="opacity-60">CANVAS:</span>{' '}
              <span className={`font-bold ${isNoir ? 'text-[#5577FF]' : 'text-[#2946D3]'}`}>
                {isNoir ? 'NOIR' : 'IVORY'}
              </span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-sm hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-4 py-4 space-y-3 font-editorial-sans text-sm ${
            isNoir
              ? 'bg-[#12141C] border-[#222533] text-[#F1EBDD]'
              : 'bg-[#ECE4D0] border-[#D6CDBC] text-[#101116]'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleGlide(e, link.href)}
              className={`block py-1 opacity-80 hover:opacity-100 ${
                isNoir ? 'hover:text-[#5577FF]' : 'hover:text-[#2946D3]'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-current/10 flex items-center justify-between text-xs font-editorial-mono opacity-60">
            <span>CHITTAGONG, BANGLADESH</span>
            <span>GMT+6</span>
          </div>
        </div>
      )}
    </header>
  );
};
