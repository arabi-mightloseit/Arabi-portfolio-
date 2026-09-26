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

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Focus', href: '#interests' },
    { label: 'Work', href: '#projects' },
    { label: 'Approach', href: '#approach' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 border-b backdrop-blur-md ${
        isNoir
          ? 'bg-[#101116]/92 border-[#202330] text-[#F1EBDD]'
          : 'bg-[#F1EBDD]/92 border-[#D8CEBA] text-[#101116]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between gap-4">
        {/* Left Zone: Signature Switch Hardware + Wordmark */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Top-left Signature Switch */}
          <SignatureSwitch
            isArmed={isArmed}
            onToggle={onToggleArmed}
            theme={theme}
          />

          <div className="h-4 w-[1px] bg-current opacity-15 hidden sm:block" />

          {/* Clean Wordmark */}
          <a
            href="#"
            className="font-editorial-serif text-lg tracking-wider font-normal hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            ARABI
          </a>
        </div>

        {/* Center Zone: Clean Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-editorial-sans font-medium tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`transition-colors duration-150 relative py-1 hover:text-[#2946D3] ${
                isNoir ? 'text-[#F1EBDD]/70' : 'text-[#101116]/70'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Zone: Palette Mode Toggle & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          {/* Palette Mode Selector [Noir / Ivory] */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={`font-editorial-mono text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 rounded-sm border transition-colors whitespace-nowrap ${
              isNoir
                ? 'border-[#2E3345] hover:border-[#4B526B] bg-[#181A22] text-[#F1EBDD]/80 hover:text-[#F1EBDD]'
                : 'border-[#CCC1AB] hover:border-[#9E937D] bg-[#E8DFC9] text-[#101116]/80 hover:text-[#101116]'
            }`}
            title="Toggle between Pure Black (#101116) and Warm Ivory (#F1EBDD)"
          >
            <span className="opacity-50">CANVAS:</span>{' '}
            <span className="font-semibold text-[#2946D3]">
              {isNoir ? 'NOIR' : 'IVORY'}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-sm hover:opacity-75 transition-opacity"
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
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 opacity-80 hover:opacity-100 hover:text-[#2946D3]"
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
