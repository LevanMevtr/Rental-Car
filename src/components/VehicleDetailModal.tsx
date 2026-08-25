import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Fuel, 
  Wind, 
  Shield, 
  Check, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Car,
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { Vehicle } from '../types';
import { LOCATIONS_GABON } from '../data/mockData';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (vehicle: Vehicle) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  onBookNow,
}) => {
  if (!isOpen || !vehicle) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [calcDays, setCalcDays] = useState(3);
  const [withDriverCalc, setWithDriverCalc] = useState(false);

  // Price calculations for preview
  const basePrice = vehicle.pricePerDay * calcDays;
  const driverCost = withDriverCalc ? 25000 * calcDays : 0;
  const subtotal = basePrice + driverCost;
  const taxTva = Math.round(subtotal * 0.18);
  const estimatedTotal = subtotal + taxTva;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-[#121414] border border-[#333535] rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-[#e2e2e2]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#1a1c1c]/90 border border-[#333535] text-[#d0c5af] hover:text-white hover:border-[#f2ca50] flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Banner / Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-[#333535]">
          
          {/* Gallery - 7 cols */}
          <div className="lg:col-span-7 bg-[#0c0f0f] p-4 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Main Image */}
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-[#1a1c1c] border border-[#333535]">
                <img
                  src={vehicle.images[activeImageIndex] || vehicle.images[0]}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-3 left-3 bg-[#0c0f0f]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#f2ca50] border border-[#f2ca50]/30">
                  {vehicle.categoryLabel}
                </div>

                <div className="absolute bottom-3 right-3 bg-[#0c0f0f]/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1 border border-[#333535]">
                  <Star className="w-3.5 h-3.5 text-[#f2ca50] fill-[#f2ca50]" />
                  <span>{vehicle.rating} / 5</span>
                  <span className="text-[10px] text-[#99907c]">({vehicle.reviewCount} avis vérifiés)</span>
                </div>
              </div>

              {/* Thumbnails */}
              {vehicle.images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {vehicle.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                        activeImageIndex === idx ? 'border-[#f2ca50] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Guarantees */}
            <div className="mt-4 pt-3 border-t border-[#282a2b] grid grid-cols-3 gap-2 text-center text-[11px] text-[#99907c]">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-[#f2ca50] mb-1" />
                <span className="text-white font-medium">Tous Risques Inclus</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-4 h-4 text-[#f2ca50] mb-1" />
                <span className="text-white font-medium">Assistance 24/7 Gabon</span>
              </div>
              <div className="flex flex-col items-center">
                <Sparkles className="w-4 h-4 text-[#f2ca50] mb-1" />
                <span className="text-white font-medium">Véhicule Désinfecté</span>
              </div>
            </div>
          </div>

          {/* Quick Info & Live Estimator - 5 cols */}
          <div className="lg:col-span-5 p-6 bg-[#121414] flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <div className="text-[11px] font-bold text-[#f2ca50] uppercase tracking-wider mb-1">
                  {vehicle.brand} • Modèle {vehicle.year}
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-white leading-tight">
                  {vehicle.name}
                </h2>
                <p className="text-xs text-[#99907c] mt-1">{vehicle.model}</p>
              </div>

              {/* Price Tier Table */}
              <div className="bg-[#1a1c1c] p-3.5 rounded-xl border border-[#333535] mb-5 space-y-2">
                <div className="flex justify-between items-baseline border-b border-[#282a2b] pb-2">
                  <span className="text-xs text-[#d0c5af]">Tarif Jour (1 à 6 jours)</span>
                  <span className="text-base font-extrabold text-[#f2ca50]">
                    {vehicle.pricePerDay.toLocaleString()} FCFA <span className="text-[10px] text-[#99907c]">/j</span>
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-b border-[#282a2b] pb-2">
                  <span className="text-xs text-[#d0c5af]">Forfait Semaine (7 jours)</span>
                  <span className="text-sm font-bold text-white">
                    {vehicle.pricePerWeek.toLocaleString()} FCFA
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[#d0c5af]">Tarif Mensuel (30 jours)</span>
                  <span className="text-sm font-bold text-white">
                    {vehicle.pricePerMonth.toLocaleString()} FCFA
                  </span>
                </div>
              </div>

              {/* Live Rental Estimator Mini-Tool */}
              <div className="bg-[#161818] p-4 rounded-xl border border-[#4d4635]/40 mb-5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#f2ca50]" />
                  Simulateur de Devis Instantané
                </h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[#99907c] block mb-1 flex justify-between">
                      <span>Durée de location estimée :</span>
                      <strong className="text-[#f2ca50] font-bold">{calcDays} jour(s)</strong>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={calcDays}
                      onChange={(e) => setCalcDays(Number(e.target.value))}
                      className="w-full accent-[#f2ca50] cursor-pointer"
                    />
                  </div>

                  <label className="flex items-center gap-2 text-[#d0c5af] cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={withDriverCalc}
                      onChange={(e) => setWithDriverCalc(e.target.checked)}
                      className="w-4 h-4 rounded text-[#f2ca50] focus:ring-[#f2ca50] bg-[#0c0f0f] border-[#4d4635]"
                    />
                    <span className="text-[11px]">Ajouter un chauffeur professionnel (+25 000 F/j)</span>
                  </label>

                  <div className="pt-3 border-t border-[#282a2b] flex justify-between items-baseline">
                    <span className="text-xs text-[#99907c]">Total Estimé (TTC) :</span>
                    <div className="text-right">
                      <span className="text-xl font-heading font-black text-[#f2ca50]">
                        {estimatedTotal.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Primary Action */}
            <div className="space-y-2">
              <button
                onClick={() => onBookNow(vehicle)}
                className="w-full flex items-center justify-center gap-2 bg-[#f2ca50] hover:bg-[#ffe088] text-[#121414] font-black text-sm uppercase tracking-wider py-4 rounded-xl transition-all shadow-lg shadow-[#f2ca50]/20 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Réserver ce véhicule maintenant</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#99907c]">
                Caution remboursable : <strong>{vehicle.depositAmount.toLocaleString()} FCFA</strong> • Annulation gratuite 48h
              </p>
            </div>

          </div>
        </div>

        {/* Modal Bottom Section - Detailed Tech Sheet & Conditions */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* 1. Description */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f2ca50]"></span>
              Présentation du Véhicule
            </h3>
            <p className="text-sm text-[#d0c5af] leading-relaxed">
              {vehicle.description}
            </p>
          </div>

          {/* 2. Technical Specifications Grid */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f2ca50]"></span>
              Caractéristiques Techniques
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <div className="bg-[#1a1c1c] p-3 rounded-xl border border-[#333535]">
                <span className="text-[10px] text-[#99907c] block uppercase">Transmission</span>
                <strong className="text-white text-sm capitalize">{vehicle.transmission}</strong>
              </div>

              <div className="bg-[#1a1c1c] p-3 rounded-xl border border-[#333535]">
                <span className="text-[10px] text-[#99907c] block uppercase">Capacité</span>
                <strong className="text-white text-sm">{vehicle.seats} Places</strong>
              </div>

              <div className="bg-[#1a1c1c] p-3 rounded-xl border border-[#333535]">
                <span className="text-[10px] text-[#99907c] block uppercase">Carburant</span>
                <strong className="text-white text-sm capitalize">{vehicle.fuel}</strong>
              </div>

              <div className="bg-[#1a1c1c] p-3 rounded-xl border border-[#333535]">
                <span className="text-[10px] text-[#99907c] block uppercase">Portes & Coffre</span>
                <strong className="text-white text-sm">{vehicle.doors} Portes / {vehicle.luggage} Valises</strong>
              </div>

              <div className="bg-[#1a1c1c] p-3 rounded-xl border border-[#333535]">
                <span className="text-[10px] text-[#99907c] block uppercase">Climatisation</span>
                <strong className="text-[#f2ca50] text-sm">Tropicalisée</strong>
              </div>

              <div className="bg-[#1a1c1c] p-3 rounded-xl border border-[#333535]">
                <span className="text-[10px] text-[#99907c] block uppercase">Caution Garantie</span>
                <strong className="text-white text-sm">{vehicle.depositAmount.toLocaleString()} F</strong>
              </div>
            </div>
          </div>

          {/* 3. Features & Inclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#161818] p-5 rounded-2xl border border-[#333535]">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2 text-[#f2ca50]">
                <CheckCircle2 className="w-4 h-4 text-[#f2ca50]" />
                Équipements & Confort Inclus
              </h4>
              <ul className="space-y-2 text-xs text-[#d0c5af]">
                {vehicle.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#f2ca50] flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#161818] p-5 rounded-2xl border border-[#333535]">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2 text-[#f2ca50]">
                <AlertCircle className="w-4 h-4 text-[#f2ca50]" />
                Conditions de Location au Gabon
              </h4>
              <ul className="space-y-2 text-xs text-[#d0c5af]">
                {vehicle.conditions.map((cond, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] flex-shrink-0"></span>
                    <span>{cond}</span>
                  </li>
                ))}
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] flex-shrink-0"></span>
                  <span>Assurance Tous Risques avec franchise légale incluse</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] flex-shrink-0"></span>
                  <span>Carburant : restitution avec le même niveau qu'au départ</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
