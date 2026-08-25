import React from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Car,
  UserCheck,
  Zap,
  PhoneCall
} from 'lucide-react';
import { SearchParams } from '../types';
import { LOCATIONS_GABON, CATEGORIES_CONFIG } from '../data/mockData';

interface HeroSectionProps {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  onSearch: () => void;
  onExploreFleet: () => void;
  onOpenLongTerm: () => void;
  onQuickBook: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchParams,
  setSearchParams,
  onSearch,
  onExploreFleet,
  onOpenLongTerm,
  onQuickBook,
}) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#0c0f0f] via-[#121414] to-[#0c0f0f]">
      {/* Subtle background luxury glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#f2ca50]/10 blur-[130px] rounded-full pointer-events-none -z-0" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#d4af37]/5 blur-[100px] rounded-full pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1a1c1c]/90 border border-[#f2ca50]/30 shadow-[0_0_15px_rgba(242,202,80,0.1)] text-xs font-semibold text-[#f2ca50]">
            <Sparkles className="w-3.5 h-3.5 text-[#f2ca50] animate-spin" style={{ animationDuration: '8s' }} />
            <span>N°1 DE LA LOCATION AUTOMOBILE PREMIUM À LIBREVILLE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]"></span>
            <span className="text-[#d0c5af] font-normal">GABON</span>
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white uppercase leading-[1.1]">
            Louez la voiture qui <br className="hidden sm:block" />
            <span className="text-gold-gradient">vous correspond</span>
          </h1>
          <p className="mt-5 text-base sm:text-xl text-[#d0c5af] max-w-2xl mx-auto font-normal leading-relaxed">
            Votre voiture. Votre liberté. Votre destination.
            <br />
            <span className="text-sm sm:text-base text-[#99907c]">
              Des véhicules récents (2024–2026), entretenus avec rigueur, disponibles à l'aéroport Léon-Mba et partout à Libreville.
            </span>
          </p>
        </div>

        {/* Search Engine Booking Engine Box */}
        <div className="max-w-5xl mx-auto bg-[#121414]/95 border border-[#4d4635]/50 rounded-2xl p-4 sm:p-6 shadow-2xl ambient-gold-glow backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#333535]/70 flex-wrap gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <div className="w-3 h-3 rounded-full bg-[#f2ca50]"></div>
              <span>Réservation instantanée en ligne</span>
              <span className="text-xs text-[#99907c] hidden sm:inline">• Sans engagement immédiat</span>
            </div>

            {/* Quick Toggle Driver option */}
            <label className="flex items-center gap-2 text-xs font-medium text-[#d0c5af] cursor-pointer bg-[#1a1c1c] px-3 py-1.5 rounded-lg border border-[#333535] hover:border-[#f2ca50]/50 transition-colors">
              <input
                type="checkbox"
                checked={searchParams.withDriver || false}
                onChange={(e) => setSearchParams(prev => ({ ...prev, withDriver: e.target.checked }))}
                className="w-4 h-4 rounded text-[#f2ca50] focus:ring-[#f2ca50] bg-[#0c0f0f] border-[#4d4635]"
              />
              <UserCheck className="w-3.5 h-3.5 text-[#f2ca50]" />
              <span>Avec chauffeur privé</span>
            </label>
          </div>

          {/* Search Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* 1. Pickup Location */}
            <div className="bg-[#1a1c1c] p-3 rounded-xl border border-[#333535] focus-within:border-[#f2ca50] transition-all">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#99907c] mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#f2ca50]" />
                Lieu de prise en charge
              </label>
              <select
                value={searchParams.pickupLocation}
                onChange={(e) => setSearchParams(prev => ({ ...prev, pickupLocation: e.target.value }))}
                className="w-full bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
              >
                {LOCATIONS_GABON.map((loc) => (
                  <option key={loc.id} value={loc.name} className="bg-[#121414] text-white">
                    {loc.name} {loc.surcharge > 0 ? `(+${loc.surcharge.toLocaleString()} F)` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Pickup Date & Time */}
            <div className="bg-[#1a1c1c] p-3 rounded-xl border border-[#333535] focus-within:border-[#f2ca50] transition-all">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#99907c] mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#f2ca50]" />
                Date & Heure de départ
              </label>
              <div className="grid grid-cols-5 gap-1">
                <input
                  type="date"
                  value={searchParams.pickupDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, pickupDate: e.target.value }))}
                  className="col-span-3 bg-transparent text-xs sm:text-sm text-white font-medium focus:outline-none"
                />
                <input
                  type="time"
                  value={searchParams.pickupTime}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, pickupTime: e.target.value }))}
                  className="col-span-2 bg-transparent text-xs text-white font-medium focus:outline-none"
                />
              </div>
            </div>

            {/* 3. Return Date & Time */}
            <div className="bg-[#1a1c1c] p-3 rounded-xl border border-[#333535] focus-within:border-[#f2ca50] transition-all">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#99907c] mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#f2ca50]" />
                Date & Heure de retour
              </label>
              <div className="grid grid-cols-5 gap-1">
                <input
                  type="date"
                  value={searchParams.returnDate}
                  min={searchParams.pickupDate}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, returnDate: e.target.value }))}
                  className="col-span-3 bg-transparent text-xs sm:text-sm text-white font-medium focus:outline-none"
                />
                <input
                  type="time"
                  value={searchParams.returnTime}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, returnTime: e.target.value }))}
                  className="col-span-2 bg-transparent text-xs text-white font-medium focus:outline-none"
                />
              </div>
            </div>

            {/* 4. Category / Vehicle Type */}
            <div className="bg-[#1a1c1c] p-3 rounded-xl border border-[#333535] focus-within:border-[#f2ca50] transition-all">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#99907c] mb-1 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-[#f2ca50]" />
                Type de véhicule
              </label>
              <select
                value={searchParams.category}
                onChange={(e) => setSearchParams(prev => ({ ...prev, category: e.target.value }))}
                className="w-full bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
              >
                {CATEGORIES_CONFIG.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-[#121414] text-white">
                    {cat.label} ({cat.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bottom Actions Row inside Widget */}
          <div className="mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-xs text-[#d0c5af]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f2ca50]" />
                Confirmation immédiate
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f2ca50]" />
                Annulation gratuite 48h
              </span>
            </div>

            <button
              onClick={onSearch}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#f2ca50] hover:bg-[#ffe088] text-[#121414] font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(242,202,80,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <Search className="w-4 h-4" />
              <span>Trouver un véhicule disponible</span>
            </button>
          </div>
        </div>

        {/* Quick Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mt-8">
          <div className="bg-[#121414]/70 border border-[#333535]/50 p-3.5 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1a1c1c] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] flex-shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Flotte Récente</p>
              <p className="text-[11px] text-[#99907c]">Modèles 2024 à 2026</p>
            </div>
          </div>

          <div className="bg-[#121414]/70 border border-[#333535]/50 p-3.5 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1a1c1c] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Prise Aéroport LBV</p>
              <p className="text-[11px] text-[#99907c]">Accueil 24/7 dès l'arrivée</p>
            </div>
          </div>

          <div className="bg-[#121414]/70 border border-[#333535]/50 p-3.5 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1a1c1c] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Tous Risques Inclus</p>
              <p className="text-[11px] text-[#99907c]">Assurance & Assistance 24h</p>
            </div>
          </div>

          <div className="bg-[#121414]/70 border border-[#333535]/50 p-3.5 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1a1c1c] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] flex-shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Airtel & Moov Money</p>
              <p className="text-[11px] text-[#99907c]">Paiement mobile instantané</p>
            </div>
          </div>
        </div>

        {/* Secondary CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={onExploreFleet}
            className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#f2ca50] hover:text-[#ffe088] bg-[#1a1c1c] border border-[#4d4635] px-5 py-2.5 rounded-full hover:border-[#f2ca50] transition-colors"
          >
            <span>Voir toute la flotte (21 modèles)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenLongTerm}
            className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#d0c5af] hover:text-white bg-transparent border border-[#333535] px-5 py-2.5 rounded-full hover:border-[#99907c] transition-colors"
          >
            <span>Offres Entreprises & LLD (Location Longue Durée)</span>
          </button>
        </div>

      </div>
    </section>
  );
};
