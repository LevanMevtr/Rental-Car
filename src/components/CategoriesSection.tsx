import React from 'react';
import { VehicleCategory } from '../types';
import { CATEGORIES_CONFIG } from '../data/mockData';
import { Car, Compass, Truck, Users, Crown, Shield, ArrowUpRight } from 'lucide-react';
import lc300V6Main from '../assets/images/lc300_v6_main_1787618455485.jpg';
import coasterMain from '../assets/images/coaster_main_1787619101583.jpg';

interface CategoriesSectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const categoryDetails = [
    {
      id: 'citadines',
      label: 'Citadines & Compactes',
      badge: 'Économique & Urbain',
      fromPrice: '43 000 FCFA',
      desc: 'Idéales pour naviguer dans le centre-ville de Libreville avec une consommation minimale.',
      popular: 'Toyota Starlet, Starlet Cross, Yaris, Kardian',
      icon: Car,
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'suv',
      label: 'SUV Urbains & Familiaux',
      badge: 'Garde au sol surélevée',
      fromPrice: '58 000 FCFA',
      desc: 'Polyvalence, confort et sécurité pour vos déplacements quotidiens et escapades du week-end.',
      popular: 'Duster, RAV4, Hyundai Santa Fe',
      icon: Compass,
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Dacia_Duster_II_001.jpg',
    },
    {
      id: 'pickup',
      label: 'Pick-up Double Cabine',
      badge: 'Charge utile & Piste',
      fromPrice: '60 000 FCFA',
      desc: 'Pour vos chantiers, missions techniques et transport lourd à travers le Gabon.',
      popular: 'Toyota Hilux 4x4, Oroch',
      icon: Truck,
      image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '4x4',
      label: '4x4 Tout-Terrain Expédition',
      badge: 'Franchissement Tout-Terrain',
      fromPrice: '110 000 FCFA',
      desc: 'Véhicules robustes taillés pour affronter les routes de l\'intérieur du pays sans compromis.',
      popular: 'Nissan Patrol V8, Toyota Fortuner, Prado TXL',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'bus',
      label: 'Bus & Minibus VIP',
      badge: '15 à 30 Places',
      fromPrice: '120 000 FCFA',
      desc: 'Transport de délégations, équipages, séminaires et événements corporatifs.',
      popular: 'Toyota Hiace 15 pl., Toyota Coaster 30 pl.',
      icon: Users,
      image: coasterMain,
    },
    {
      id: 'prestige',
      label: 'Prestige & Exécutif VIP',
      badge: 'Standing Diplomatique',
      fromPrice: '159 000 FCFA',
      desc: 'Le luxe ultime pour chefs d\'entreprise, personnalités officielles et délégations VIP.',
      popular: 'Toyota LC300 V6, LC300 VX, Prado VX, GR-S',
      icon: Crown,
      image: lc300V6Main,
    },
  ];

  return (
    <section className="py-16 bg-[#0c0f0f] border-t border-[#333535]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f2ca50] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#f2ca50]"></span>
              Flotte Automobile LBG
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white uppercase tracking-tight">
              Explorez par <span className="text-gold-gradient">Catégories</span>
            </h2>
            <p className="text-sm text-[#d0c5af] mt-2 max-w-xl">
              Choisissez la catégorie adaptée à votre séjour, que vous restiez sur Libreville ou partiez explorer les provinces gabonaises.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#f2ca50] text-[#121414] border-[#f2ca50]'
                : 'bg-[#1a1c1c] text-[#d0c5af] border-[#333535] hover:border-[#f2ca50] hover:text-[#f2ca50]'
            }`}
          >
            Afficher Tous les Véhicules (21)
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryDetails.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative bg-[#121414] rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#f2ca50] ambient-gold-glow ring-1 ring-[#f2ca50]'
                    : 'border-[#333535]/60 hover:border-[#f2ca50]/60 hover:-translate-y-1'
                }`}
              >
                {/* Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-[#1a1c1c]">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-transparent to-black/40"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-[#0c0f0f]/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#f2ca50] border border-[#f2ca50]/30 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.badge}</span>
                  </div>

                  {/* Starting Price Tag */}
                  <div className="absolute bottom-3 right-3 bg-[#121414]/90 backdrop-blur-md px-3 py-1 rounded-lg text-right border border-[#4d4635]/50">
                    <span className="text-[10px] text-[#99907c] block">À partir de</span>
                    <span className="text-xs font-bold text-white text-[#f2ca50]">{cat.fromPrice} <span className="text-[9px] text-[#d0c5af]">/jour</span></span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#f2ca50] transition-colors">
                        {cat.label}
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-[#1a1c1c] border border-[#333535] flex items-center justify-center text-[#d0c5af] group-hover:text-[#f2ca50] group-hover:border-[#f2ca50] transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-xs text-[#d0c5af] line-clamp-2 mb-3">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#282a2b] text-[11px] text-[#99907c]">
                    <span className="text-[#d0c5af] font-medium">Modèles phares :</span> {cat.popular}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
