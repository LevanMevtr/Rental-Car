import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  MapPin, 
  Users, 
  Clock, 
  Sparkles, 
  CheckCircle2,
  Car
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#0c0f0f] border-t border-[#333535]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story & Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f2ca50]">
              <Sparkles className="w-3.5 h-3.5" />
              À Propos de LBG Car Rental
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
              L'Excellence Automobile au <span className="text-gold-gradient">Gabon</span>
            </h2>

            <p className="text-sm sm:text-base text-[#d0c5af] leading-relaxed">
              Fondée à Libreville, <strong>LBG CAR RENTAL</strong> est la référence premium de la location de véhicules au Gabon. Nous combinons une flotte moderne et rigoureusement entretenue avec un service client d'exception.
            </p>

            <p className="text-xs sm:text-sm text-[#99907c] leading-relaxed">
              Que vous ayez besoin d'une citadine agile pour vos déplacements au centre-ville, d'un SUV spacieux pour vos rendez-vous d'affaires, d'un pick-up 4x4 robuste pour les axes intérieurs ou d'une berline de prestige avec chauffeur VIP, nous garantissons votre confort et votre sécurité en toutes circonstances.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-white">
                <CheckCircle2 className="w-4 h-4 text-[#f2ca50] flex-shrink-0" />
                <span>Flotte récente 100% climatisée</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white">
                <CheckCircle2 className="w-4 h-4 text-[#f2ca50] flex-shrink-0" />
                <span>Assurance tous risques incluse</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white">
                <CheckCircle2 className="w-4 h-4 text-[#f2ca50] flex-shrink-0" />
                <span>Assistance dépannage 24/7</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white">
                <CheckCircle2 className="w-4 h-4 text-[#f2ca50] flex-shrink-0" />
                <span>Chauffeurs professionnels bilingues</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-[#121414] border border-[#4d4635]/60 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
                alt="LBG Car Rental Showroom Libreville"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0f] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-[#121414]/90 backdrop-blur-md p-4 rounded-2xl border border-[#4d4635]/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#f2ca50] block">Siège Social</span>
                  <strong className="text-white text-xs sm:text-sm font-heading">Boulevard Triomphal Omar Bongo, Libreville</strong>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#1a1c1c] border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50]">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Stats counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#121414] border border-[#333535] rounded-2xl p-6 text-center">
            <div className="text-3xl sm:text-4xl font-heading font-black text-[#f2ca50] mb-1">+50</div>
            <div className="text-xs uppercase font-bold text-white tracking-wider">Véhicules en Flotte</div>
            <p className="text-[11px] text-[#99907c] mt-1">Du SUV urbain au 4x4 tout-terrain</p>
          </div>

          <div className="bg-[#121414] border border-[#333535] rounded-2xl p-6 text-center">
            <div className="text-3xl sm:text-4xl font-heading font-black text-[#f2ca50] mb-1">99.4%</div>
            <div className="text-xs uppercase font-bold text-white tracking-wider">Clients Satisfaits</div>
            <p className="text-[11px] text-[#99907c] mt-1">Particuliers, diplomates & entreprises</p>
          </div>

          <div className="bg-[#121414] border border-[#333535] rounded-2xl p-6 text-center">
            <div className="text-3xl sm:text-4xl font-heading font-black text-[#f2ca50] mb-1">24/7</div>
            <div className="text-xs uppercase font-bold text-white tracking-wider">Assistance Mobile</div>
            <p className="text-[11px] text-[#99907c] mt-1">Intervention rapide sur Libreville</p>
          </div>

          <div className="bg-[#121414] border border-[#333535] rounded-2xl p-6 text-center">
            <div className="text-3xl sm:text-4xl font-heading font-black text-[#f2ca50] mb-1">10 Ans</div>
            <div className="text-xs uppercase font-bold text-white tracking-wider">D'Expertise Locale</div>
            <p className="text-[11px] text-[#99907c] mt-1">Au service de la mobilité gabonaise</p>
          </div>
        </div>

      </div>
    </section>
  );
};
