import React, { useState } from 'react';
import { 
  Car, 
  Menu, 
  X, 
  Phone, 
  User, 
  ShieldCheck, 
  Calendar, 
  Briefcase, 
  Sparkles, 
  Clock, 
  LayoutDashboard,
  Settings,
  ChevronDown,
  Layers,
  HelpCircle,
  MapPin,
  Share2
} from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  language: 'fr' | 'en';
  onToggleLanguage: () => void;
  compareCount: number;
  onOpenCompare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  language,
  onToggleLanguage,
  compareCount,
  onOpenCompare,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageView; labelFr: string; labelEn: string }[] = [
    { id: 'home', labelFr: 'Accueil', labelEn: 'Home' },
    { id: 'fleet', labelFr: 'Nos Véhicules', labelEn: 'Fleet' },
    { id: 'services', labelFr: 'Services', labelEn: 'Services' },
    { id: 'long_term', labelFr: 'Longue Durée (LLD)', labelEn: 'Long-Term' },
    { id: 'b2b', labelFr: 'Entreprises B2B', labelEn: 'Corporate' },
    { id: 'about', labelFr: 'À Propos', labelEn: 'About' },
    { id: 'faq', labelFr: 'FAQ', labelEn: 'FAQ' },
    { id: 'contact', labelFr: 'Agences & Contact', labelEn: 'Contact' },
  ];

  const handleNavClick = (pageId: PageView) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-[#0c0f0f]/95 backdrop-blur-xl border-b border-[#333535]/60 transition-all duration-300 print:hidden">
      {/* Top Banner Notice */}
      <div className="bg-[#121414] border-b border-[#333535]/40 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[#d0c5af]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[#e2e2e2] font-medium">Libreville, Gabon</span> • Flotte Récente 2024-2026 disponible
            </span>
            <span className="hidden lg:inline text-xs text-[#99907c]">|</span>
            <span className="hidden lg:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#f2ca50]" />
              Remise à l'Aéroport Léon-Mba 24h/24 & 7j/7
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href="tel:+24177000000" 
              className="flex items-center gap-1.5 text-[#f2ca50] font-semibold hover:text-[#ffe088] transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>+241 77 00 00 00 (24/7)</span>
            </a>

            <span className="text-[#444]">|</span>

            {/* Quick Admin Portal Toggle */}
            <button
              onClick={() => onNavigate('admin_portal')}
              className="text-[#99907c] hover:text-[#f2ca50] flex items-center gap-1 transition-colors"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>Back-Office</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#f2ca50] to-[#b38e1b] p-0.5 shadow-lg shadow-[#f2ca50]/20 group-hover:shadow-[#f2ca50]/40 transition-all duration-300">
              <div className="w-full h-full bg-[#121414] rounded-[14px] flex items-center justify-center font-heading font-black text-xl text-[#f2ca50] tracking-tighter">
                LBG
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-[#f2ca50] transition-colors">
                  LBG CAR RENTAL
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#f2ca50] font-bold">
                Libreville • Gabon
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 relative ${
                    isActive
                      ? 'text-[#f2ca50] font-bold bg-[#1a1c1c] border border-[#f2ca50]/30 shadow-inner'
                      : 'text-[#d0c5af] hover:text-white hover:bg-[#161818]'
                  }`}
                >
                  {language === 'fr' ? link.labelFr : link.labelEn}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Language Switcher */}
            <button 
              onClick={onToggleLanguage}
              className="px-2.5 py-1.5 rounded-xl bg-[#1a1c1c] border border-[#333535] text-[#d0c5af] hover:text-white hover:border-[#f2ca50] text-[11px] font-bold uppercase transition-all"
            >
              {language === 'fr' ? 'FR' : 'EN'}
            </button>

            {/* Compare vehicles badge button */}
            {compareCount > 0 && (
              <button
                onClick={onOpenCompare}
                className="relative p-2.5 rounded-xl bg-[#1a1c1c] border border-[#f2ca50]/50 text-[#f2ca50] hover:bg-[#282a2b] transition-all"
                title="Ouvrir le comparateur"
              >
                <Layers className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f2ca50] text-[#121414] text-[10px] font-black flex items-center justify-center">
                  {compareCount}
                </span>
              </button>
            )}

            {/* Customer Portal Button */}
            <button
              onClick={() => onNavigate('customer_portal')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                currentPage === 'customer_portal'
                  ? 'bg-[#f2ca50] text-[#121414] border-[#f2ca50]'
                  : 'bg-[#1a1c1c] text-[#d0c5af] hover:text-white border-[#333535] hover:border-[#f2ca50]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Espace Client</span>
            </button>

            {/* CTA Book Now Button */}
            <button
              onClick={() => onNavigate('fleet')}
              className="hidden sm:flex items-center gap-2 bg-[#f2ca50] hover:bg-[#ffe088] text-[#121414] font-heading font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-lg shadow-[#f2ca50]/20 hover:shadow-[#f2ca50]/40 transition-all duration-300 hover:scale-105"
            >
              <Car className="w-4 h-4" />
              <span>Réserver</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-[#1a1c1c] border border-[#333535] text-[#d0c5af] hover:text-white hover:border-[#f2ca50] transition-colors"
              aria-label="Menu Mobile"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#121414] border-b border-[#333535] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`p-3 rounded-xl text-left text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#f2ca50] text-[#121414] font-bold'
                      : 'bg-[#1a1c1c] text-[#d0c5af] border border-[#282a2b]'
                  }`}
                >
                  {language === 'fr' ? link.labelFr : link.labelEn}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#282a2b] flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('customer_portal')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1a1c1c] border border-[#333535] text-xs font-bold uppercase text-white"
            >
              <User className="w-4 h-4 text-[#f2ca50]" />
              <span>Mon Espace Client VIP</span>
            </button>

            <button
              onClick={() => handleNavClick('admin_portal')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1a1c1c] border border-[#333535] text-xs font-bold uppercase text-[#99907c]"
            >
              <LayoutDashboard className="w-4 h-4 text-[#f2ca50]" />
              <span>Administration & Planning</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
