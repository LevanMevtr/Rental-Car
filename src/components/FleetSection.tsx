import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Users, 
  Fuel, 
  Sparkles, 
  Wind, 
  Briefcase, 
  Check, 
  ArrowUpDown, 
  X, 
  Layers, 
  Star,
  CheckCircle,
  Clock,
  Car,
  Eye,
  Info
} from 'lucide-react';
import { Vehicle, VehicleCategory } from '../types';
import { CATEGORIES_CONFIG } from '../data/mockData';

interface FleetSectionProps {
  vehicles: Vehicle[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onSelectVehicle: (v: Vehicle) => void;
  onBookVehicle: (v: Vehicle) => void;
  comparedVehicles: Vehicle[];
  onToggleCompare: (v: Vehicle) => void;
  onOpenCompareModal: () => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({
  vehicles,
  selectedCategory,
  setSelectedCategory,
  onSelectVehicle,
  onBookVehicle,
  comparedVehicles,
  onToggleCompare,
  onOpenCompareModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [selectedFuel, setSelectedFuel] = useState<string>('all');
  const [selectedSeats, setSelectedSeats] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rating' | 'name'>('price_asc');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter logic
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        // Category
        if (selectedCategory !== 'all' && v.category !== selectedCategory) return false;
        // Search keyword
        if (searchTerm.trim() !== '') {
          const q = searchTerm.toLowerCase();
          const matchName = v.name.toLowerCase().includes(q);
          const matchBrand = v.brand.toLowerCase().includes(q);
          const matchModel = v.model.toLowerCase().includes(q);
          const matchCat = v.categoryLabel.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchModel && !matchCat) return false;
        }
        // Transmission
        if (selectedTransmission !== 'all' && v.transmission !== selectedTransmission) return false;
        // Fuel
        if (selectedFuel !== 'all' && v.fuel !== selectedFuel) return false;
        // Seats
        if (selectedSeats !== 'all') {
          const s = parseInt(selectedSeats, 10);
          if (s === 7 && v.seats < 7) return false;
          if (s === 5 && v.seats !== 5) return false;
          if (s === 15 && v.seats < 15) return false;
        }
        // Price
        if (v.pricePerDay > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.pricePerDay - b.pricePerDay;
        if (sortBy === 'price_desc') return b.pricePerDay - a.pricePerDay;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [vehicles, selectedCategory, searchTerm, selectedTransmission, selectedFuel, selectedSeats, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setSelectedTransmission('all');
    setSelectedFuel('all');
    setSelectedSeats('all');
    setMaxPrice(300000);
    setSortBy('price_asc');
  };

  const isFilterActive = 
    selectedCategory !== 'all' || 
    searchTerm !== '' || 
    selectedTransmission !== 'all' || 
    selectedFuel !== 'all' || 
    selectedSeats !== 'all' || 
    maxPrice < 300000;

  return (
    <section id="fleet-section" className="py-16 bg-[#0c0f0f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f2ca50] mb-2">
            <Car className="w-3.5 h-3.5" />
            Flotte Disponible à Libreville
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight">
            Notre Gamme de <span className="text-gold-gradient">Véhicules</span>
          </h2>
          <p className="text-sm text-[#d0c5af] mt-2">
            De la citadine économique pour Libreville au grand 4x4 Land Cruiser 300 pour les missions de prestige.
          </p>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {CATEGORIES_CONFIG.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#f2ca50] text-[#121414] border-[#f2ca50] shadow-md shadow-[#f2ca50]/20'
                    : 'bg-[#121414] text-[#d0c5af] border-[#333535] hover:border-[#f2ca50]/60 hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-[#121414] text-[#f2ca50]' : 'bg-[#1a1c1c] text-[#99907c]'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Control Bar (Search, Filters Toggle, Sort) */}
        <div className="bg-[#121414] border border-[#333535] rounded-2xl p-4 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="w-full lg:w-96 relative">
              <Search className="w-4 h-4 text-[#99907c] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher (ex: Prado, Hilux, Yaris, Starlet, 7 places...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#99907c] focus:outline-none focus:border-[#f2ca50]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#99907c] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filters Group */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-between lg:justify-end">
              
              {/* Transmission Filter */}
              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="bg-[#1a1c1c] text-xs text-[#d0c5af] border border-[#333535] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#f2ca50] cursor-pointer"
              >
                <option value="all">Boîte : Toutes</option>
                <option value="automatique">Automatique</option>
                <option value="manuelle">Manuelle</option>
              </select>

              {/* Fuel Filter */}
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="bg-[#1a1c1c] text-xs text-[#d0c5af] border border-[#333535] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#f2ca50] cursor-pointer"
              >
                <option value="all">Carburant : Tous</option>
                <option value="essence">Essence</option>
                <option value="diesel">Diesel</option>
                <option value="hybride">Hybride</option>
              </select>

              {/* Seats Filter */}
              <select
                value={selectedSeats}
                onChange={(e) => setSelectedSeats(e.target.value)}
                className="bg-[#1a1c1c] text-xs text-[#d0c5af] border border-[#333535] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#f2ca50] cursor-pointer"
              >
                <option value="all">Places : Toutes</option>
                <option value="5">5 Places</option>
                <option value="7">7 Places & Plus</option>
                <option value="15">15 à 30 Places</option>
              </select>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 bg-[#1a1c1c] border border-[#333535] rounded-xl px-3 py-2 text-xs text-[#d0c5af]">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#f2ca50]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="price_asc" className="bg-[#121414]">Prix croissant</option>
                  <option value="price_desc" className="bg-[#121414]">Prix décroissant</option>
                  <option value="rating" className="bg-[#121414]">Mieux notés</option>
                  <option value="name" className="bg-[#121414]">Nom de A à Z</option>
                </select>
              </div>

              {/* Reset filter button */}
              {isFilterActive && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#f2ca50] hover:underline px-2 py-1 flex items-center gap-1 font-medium"
                >
                  <X className="w-3 h-3" />
                  Effacer filtres
                </button>
              )}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mt-4 pt-3 border-t border-[#282a2b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[#99907c] font-medium">Budget journalier max :</span>
              <span className="text-[#f2ca50] font-bold text-sm bg-[#1a1c1c] px-2.5 py-1 rounded-md border border-[#4d4635]/40">
                {maxPrice.toLocaleString()} FCFA / jour
              </span>
            </div>
            <div className="flex-1 max-w-md">
              <input
                type="range"
                min="43000"
                max="300000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#f2ca50] cursor-pointer"
              />
            </div>
            <div className="text-[11px] text-[#99907c]">
              Affichage de <strong className="text-white">{filteredVehicles.length}</strong> véhicules disponibles
            </div>
          </div>
        </div>

        {/* Vehicles Grid / Listing */}
        {filteredVehicles.length === 0 ? (
          <div className="bg-[#121414] border border-[#333535] rounded-2xl p-12 text-center max-w-xl mx-auto">
            <Car className="w-12 h-12 text-[#99907c] mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-bold text-white mb-1">Aucun véhicule ne correspond à vos critères</h3>
            <p className="text-xs text-[#d0c5af] mb-4">
              Essayez d'élargir votre sélection de prix ou de choisir une autre catégorie.
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#f2ca50] text-[#121414] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-[#ffe088] transition-colors"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => {
              const isCompared = comparedVehicles.some((c) => c.id === vehicle.id);

              return (
                <div
                  key={vehicle.id}
                  className="bg-[#121414] rounded-2xl border border-[#333535]/70 overflow-hidden hover:border-[#f2ca50]/60 transition-all duration-300 flex flex-col justify-between group ambient-card-shadow hover:-translate-y-1"
                >
                  {/* Top Image area */}
                  <div className="relative h-52 w-full overflow-hidden bg-[#1a1c1c]">
                    <img
                      src={vehicle.images[0]}
                      alt={vehicle.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-transparent to-black/30"></div>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 bg-[#0c0f0f]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#f2ca50] border border-[#f2ca50]/30">
                      {vehicle.categoryLabel}
                    </div>

                    {/* Featured / Year */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {vehicle.isFeatured && (
                        <span className="bg-[#f2ca50] text-[#121414] text-[10px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          Top Choix
                        </span>
                      )}
                      <span className="bg-[#1a1c1c]/90 text-[#d0c5af] text-[10px] font-semibold px-2 py-0.5 rounded-md border border-[#333535]">
                        {vehicle.year}
                      </span>
                    </div>

                    {/* Compare Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCompare(vehicle);
                      }}
                      className={`absolute bottom-3 left-3 text-[11px] font-medium px-2.5 py-1 rounded-lg backdrop-blur-md transition-all flex items-center gap-1.5 ${
                        isCompared
                          ? 'bg-[#f2ca50] text-[#121414] font-bold'
                          : 'bg-[#0c0f0f]/80 text-[#d0c5af] border border-[#333535] hover:border-[#f2ca50]'
                      }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>{isCompared ? 'Comparé' : 'Comparer'}</span>
                    </button>

                    {/* Rating badge */}
                    <div className="absolute bottom-3 right-3 bg-[#0c0f0f]/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-[#333535] flex items-center gap-1 text-[11px] font-bold text-white">
                      <Star className="w-3 h-3 text-[#f2ca50] fill-[#f2ca50]" />
                      <span>{vehicle.rating}</span>
                      <span className="text-[9px] text-[#99907c]">({vehicle.reviewCount})</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Model */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#f2ca50] transition-colors leading-snug">
                            {vehicle.name}
                          </h3>
                          <p className="text-xs text-[#99907c]">{vehicle.model}</p>
                        </div>
                      </div>

                      {/* Specs badges */}
                      <div className="grid grid-cols-4 gap-1.5 my-4 bg-[#1a1c1c] p-2.5 rounded-xl border border-[#282a2b] text-[11px]">
                        <div className="flex flex-col items-center justify-center text-center p-1">
                          <Users className="w-3.5 h-3.5 text-[#f2ca50] mb-1" />
                          <span className="text-white font-medium">{vehicle.seats} pl.</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-1 border-l border-[#282a2b]">
                          <span className="text-[#f2ca50] font-black text-[10px] mb-1">
                            {vehicle.transmission === 'automatique' ? 'AUTO' : 'MANU'}
                          </span>
                          <span className="text-white font-medium capitalize">{vehicle.transmission.slice(0, 4)}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-1 border-l border-[#282a2b]">
                          <Fuel className="w-3.5 h-3.5 text-[#f2ca50] mb-1" />
                          <span className="text-white font-medium capitalize">{vehicle.fuel}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-1 border-l border-[#282a2b]">
                          <Wind className="w-3.5 h-3.5 text-[#f2ca50] mb-1" />
                          <span className="text-white font-medium">Clim</span>
                        </div>
                      </div>

                      {/* Pricing Tiers Box */}
                      <div className="bg-[#161818] p-3 rounded-xl border border-[#333535]/60 mb-4">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-semibold text-[#99907c] block">Tarif Journalier</span>
                            <span className="text-lg font-extrabold text-[#f2ca50] font-heading">
                              {vehicle.pricePerDay.toLocaleString()} FCFA
                            </span>
                            <span className="text-[10px] text-[#d0c5af]"> / jour</span>
                          </div>

                          <div className="text-right text-[11px] text-[#99907c]">
                            <div>Semaine : <strong className="text-[#e2e2e2]">{vehicle.pricePerWeek.toLocaleString()} F</strong></div>
                            <div>Mois : <strong className="text-[#e2e2e2]">{vehicle.pricePerMonth.toLocaleString()} F</strong></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card CTA Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#282a2b]">
                      <button
                        onClick={() => onSelectVehicle(vehicle)}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1a1c1c] text-[#d0c5af] hover:text-white border border-[#333535] hover:border-[#f2ca50]/50 text-xs font-semibold uppercase tracking-wider transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#f2ca50]" />
                        <span>Détails</span>
                      </button>

                      <button
                        onClick={() => onBookVehicle(vehicle)}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#f2ca50] hover:bg-[#ffe088] text-[#121414] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#f2ca50]/15 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>Réserver</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating Compare Drawer Trigger (if any vehicles selected) */}
        {comparedVehicles.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#121414]/95 border-2 border-[#f2ca50] rounded-2xl px-5 py-3 shadow-2xl backdrop-blur-xl flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#f2ca50]" />
              <div className="text-xs">
                <span className="text-white font-bold">{comparedVehicles.length} véhicule(s)</span> sélectionné(s) pour comparaison
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenCompareModal}
                className="bg-[#f2ca50] text-[#121414] font-bold text-xs uppercase px-4 py-2 rounded-xl hover:bg-[#ffe088] transition-colors"
              >
                Comparer maintenant
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
