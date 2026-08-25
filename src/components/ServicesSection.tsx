import React from 'react';
import { 
  Clock, 
  Calendar, 
  UserCheck, 
  Plane, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ArrowRight,
  Headphones
} from 'lucide-react';

interface ServicesSectionProps {
  onBookNow: () => void;
  onOpenLongTerm: () => void;
  onOpenB2B: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onBookNow,
  onOpenLongTerm,
  onOpenB2B,
}) => {
  const services = [
    {
      icon: Clock,
      title: 'Location Courte Durée (LCD)',
      badge: '1 à 30 jours',
      desc: 'Pour vos séjours d\'affaires, vacances ou besoins ponctuels à Libreville et dans tout le Gabon. Tarifs dégressifs à partir de 3 jours.',
      actionLabel: 'Réserver un véhicule',
      action: onBookNow,
    },
    {
      icon: Calendar,
      title: 'Location Longue Durée (LLD)',
      badge: '12 à 36 mois',
      desc: 'Externalisez votre parc automobile sans immobiliser votre trésorerie. Entretien intégral, assurance tous risques et véhicule relais inclus.',
      actionLabel: 'Découvrir nos offres LLD',
      action: onOpenLongTerm,
    },
    {
      icon: UserCheck,
      title: 'Chauffeur Privé Professionnel',
      badge: 'Service Exécutif',
      desc: 'Chauffeurs gabonais bilingues, rigoureusement formés à la conduite défensive, au protocole diplomatique et connaissant parfaitement le réseau routier.',
      actionLabel: 'Réserver avec chauffeur',
      action: onBookNow,
    },
    {
      icon: Plane,
      title: 'Transferts Aéroport Léon-Mba',
      badge: 'Accueil VIP 24/7',
      desc: 'Prise en charge personnalisée dès la sortie de la zone sous douane avec pancarte nominative, prise en charge des bagages et transport en berline ou SUV.',
      actionLabel: 'Planifier un transfert',
      action: onBookNow,
    },
    {
      icon: Truck,
      title: 'Gestion de Flotte Entreprises',
      badge: 'Sur-Mesure B2B',
      desc: 'Solutions complètes pour compagnies pétrolières, minières, BTP, banques et institutions étatiques au Gabon. Suivi télématique et facturation consolidée.',
      actionLabel: 'Espace Entreprises',
      action: onOpenB2B,
    },
    {
      icon: Headphones,
      title: 'Conciergerie & Assistance 24/7',
      badge: 'Partout au Gabon',
      desc: 'Équipe d\'intervention mobile disponible jour et nuit à Libreville, Owendo, Akanda et sur les axes provinciaux avec remplacement immédiat en cas de panne.',
      actionLabel: 'Contacter le support',
      action: onBookNow,
    },
  ];

  return (
    <section className="py-20 bg-[#0c0f0f] border-t border-[#333535]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f2ca50] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Excellence & Mobilité Premium
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
            Nos Services <span className="text-gold-gradient">Automobiles</span>
          </h2>
          <p className="text-sm sm:text-base text-[#d0c5af] mt-3">
            Des formules flexibles conçues pour répondre aux exigences des particuliers, des touristes et des grandes entreprises au Gabon.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-[#121414] rounded-3xl border border-[#333535] p-7 flex flex-col justify-between hover:border-[#f2ca50]/60 transition-all duration-300 group ambient-card-shadow hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#1a1c1c] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="bg-[#1a1c1c] text-[#f2ca50] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#f2ca50]/20">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#f2ca50] transition-colors mb-3">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-[#d0c5af] leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>

                <button
                  onClick={srv.action}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1a1c1c] hover:bg-[#f2ca50] text-[#d0c5af] hover:text-[#121414] border border-[#333535] hover:border-[#f2ca50] text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>{srv.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
