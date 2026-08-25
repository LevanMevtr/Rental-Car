import React from 'react';
import { 
  Car, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Sparkles,
  ChevronRight,
  Heart
} from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
}) => {
  return (
    <footer className="bg-[#090b0b] border-t border-[#333535] text-[#99907c] text-xs pt-16 pb-12 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f2ca50] to-[#b38e1b] flex items-center justify-center text-[#121414] font-black font-heading text-xl shadow-lg shadow-[#f2ca50]/20">
                LBG
              </div>
              <div>
                <span className="font-heading font-black text-xl text-white tracking-tight leading-none block">
                  LBG CAR RENTAL
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#f2ca50] font-bold">
                  Libreville • Gabon
                </span>
              </div>
            </div>

            <p className="text-sm font-heading italic text-[#f2ca50]">
              « Votre voiture. Votre liberté. Votre destination. »
            </p>

            <p className="text-xs text-[#d0c5af] leading-relaxed max-w-sm">
              La plateforme leader de location de véhicules à Libreville. Flotte récente, climatisée et révisée pour particuliers, expatriés et entreprises au Gabon.
            </p>

            {/* Payment badges */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-[#99907c] block mb-2">
                Paiements Sécurisés Acceptés :
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#1a1c1c] text-white px-2.5 py-1 rounded-lg border border-[#333535] text-[10px] font-bold flex items-center gap-1">
                  <Smartphone className="w-3 h-3 text-red-500" /> Airtel Money
                </span>
                <span className="bg-[#1a1c1c] text-white px-2.5 py-1 rounded-lg border border-[#333535] text-[10px] font-bold flex items-center gap-1">
                  <Smartphone className="w-3 h-3 text-blue-500" /> Moov Money
                </span>
                <span className="bg-[#1a1c1c] text-white px-2.5 py-1 rounded-lg border border-[#333535] text-[10px] font-bold flex items-center gap-1">
                  <CreditCard className="w-3 h-3 text-[#f2ca50]" /> Visa / Mastercard
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Rapide */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#f2ca50] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#f2ca50]" />
                  <span>Accueil & Recherche</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fleet')}
                  className="hover:text-[#f2ca50] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#f2ca50]" />
                  <span>Notre Flotte (21 Modèles)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#f2ca50] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#f2ca50]" />
                  <span>Nos Prestations</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('long_term')}
                  className="hover:text-[#f2ca50] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#f2ca50]" />
                  <span>Location Longue Durée (LLD)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('b2b')}
                  className="hover:text-[#f2ca50] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#f2ca50]" />
                  <span>Espace Entreprises B2B</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#f2ca50] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#f2ca50]" />
                  <span>Qui Sommes-Nous</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#f2ca50] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#f2ca50]" />
                  <span>Foire Aux Questions</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#f2ca50] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#f2ca50]" />
                  <span>Agences & Contact</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Catégories de Véhicules */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Flotte Disponible
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onNavigate('fleet');
                    onSelectCategory('citadines');
                  }}
                  className="hover:text-[#f2ca50] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#f2ca50]" />
                  <span>Citadines Économiques</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('fleet');
                    onSelectCategory('suv');
                  }}
                  className="hover:text-[#f2ca50] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#f2ca50]" />
                  <span>SUV Urbains & Compacts</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('fleet');
                    onSelectCategory('pickup');
                  }}
                  className="hover:text-[#f2ca50] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#f2ca50]" />
                  <span>Pick-up Double Cabine 4x4</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('fleet');
                    onSelectCategory('4x4');
                  }}
                  className="hover:text-[#f2ca50] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#f2ca50]" />
                  <span>Grands 4x4 Tout-Terrain</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('fleet');
                    onSelectCategory('bus');
                  }}
                  className="hover:text-[#f2ca50] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#f2ca50]" />
                  <span>Minibus & Transport Collectif</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('fleet');
                    onSelectCategory('prestige');
                  }}
                  className="hover:text-[#f2ca50] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#f2ca50]" />
                  <span>Prestige & VIP Officiel</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Agences */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Agences Libreville
            </h4>
            <div className="space-y-3">
              <div>
                <strong className="text-white block">Siège Commercial</strong>
                <p className="text-[11px] text-[#d0c5af]">Boulevard Triomphal Omar Bongo, Libreville</p>
                <p className="text-[11px] text-[#f2ca50]">+241 11 00 00 00</p>
              </div>

              <div>
                <strong className="text-white block">Comptoir Aéroport Léon-Mba</strong>
                <p className="text-[11px] text-[#d0c5af]">Hall Arrivées Internationales (24/7)</p>
                <p className="text-[11px] text-[#f2ca50]">+241 77 00 00 00</p>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/24177000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase hover:bg-[#25D366] hover:text-white transition-colors"
                >
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 border-t border-[#282a2b] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#99907c]">
          <div>
            © 2026 <strong>LBG CAR RENTAL</strong>. Tous droits réservés. RCCM: GA-LBV-2016-B-1192 • NIF: 0748293B
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Mentions Légales</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Conditions Générales de Location</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Confidentialité</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
