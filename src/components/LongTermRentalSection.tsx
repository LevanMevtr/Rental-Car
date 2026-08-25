import React, { useState } from 'react';
import { 
  Calendar, 
  ShieldCheck, 
  Wrench, 
  RefreshCw, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  Send,
  Building,
  Car,
  FileCheck
} from 'lucide-react';
import { CATEGORIES_CONFIG } from '../data/mockData';

export const LongTermRentalSection: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('suv');
  const [fleetSize, setFleetSize] = useState<number>(3);
  const [durationMonths, setDurationMonths] = useState<number>(24);
  const [companyName, setCompanyName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);

  // Estimator calculation
  const monthlyRateBase: Record<string, number> = {
    citadines: 850000,
    suv: 1100000,
    pickup: 1800000,
    '4x4': 2400000,
    bus: 2200000,
    prestige: 3800000,
  };

  const unitRate = (monthlyRateBase[selectedCat] || 1100000) * (durationMonths === 36 ? 0.9 : durationMonths === 24 ? 0.95 : 1);
  const totalMonthlyEstimate = unitRate * fleetSize;
  const totalContractValue = totalMonthlyEstimate * durationMonths;

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
  };

  return (
    <section className="py-20 bg-[#0c0f0f] border-t border-[#333535]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f2ca50] mb-2">
            <Calendar className="w-3.5 h-3.5" />
            Location Longue Durée (LLD)
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
            Optimisez Votre Flotte <span className="text-gold-gradient">Entreprise</span>
          </h2>
          <p className="text-sm sm:text-base text-[#d0c5af] mt-3">
            De 12 à 36 mois au Gabon : conservez votre trésorerie, profitez de véhicules neufs et confiez-nous la maintenance intégrale.
          </p>
        </div>

        {/* 4 Pillars of LLD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-[#121414] border border-[#333535] rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#1a1c1c] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-white text-base">Zéro Capital Immobilisé</h3>
            <p className="text-xs text-[#d0c5af] leading-relaxed">
              Préservez votre capacité d'endettement. Les loyers mensuels sont 100% déductibles de votre résultat fiscal au Gabon.
            </p>
          </div>

          <div className="bg-[#121414] border border-[#333535] rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#1a1c1c] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-white text-base">Entretien & Pneus Inclus</h3>
            <p className="text-xs text-[#d0c5af] leading-relaxed">
              Toutes les révisions, pièces d'usure, vidanges, climatisation et remplacements de pneumatiques sont pris en charge.
            </p>
          </div>

          <div className="bg-[#121414] border border-[#333535] rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#1a1c1c] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-white text-base">Véhicule Relais Immédiat</h3>
            <p className="text-xs text-[#d0c5af] leading-relaxed">
              En cas d'immobilisation ou d'entretien, un véhicule de catégorie équivalente ou supérieure est mis à votre disposition sous 2 heures.
            </p>
          </div>

          <div className="bg-[#121414] border border-[#333535] rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#1a1c1c] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-white text-base">Assurance Tous Risques</h3>
            <p className="text-xs text-[#d0c5af] leading-relaxed">
              Couverture complète contre les accidents, le vol, l'incendie et responsabilité civile professionnelle.
            </p>
          </div>
        </div>

        {/* Interactive LLD Calculator & Quote Request */}
        <div className="bg-[#121414] border border-[#4d4635]/60 rounded-3xl p-6 sm:p-10 ambient-gold-glow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left - Calculator Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#f2ca50] block mb-1">
                  Simulateur de Budget
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
                  Configurez Votre Contrat LLD
                </h3>
              </div>

              {/* Category Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#d0c5af] uppercase">
                  1. Catégorie de véhicule souhaitée :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES_CONFIG.filter(c => c.id !== 'all').map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCat(c.id)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        selectedCat === c.id
                          ? 'bg-[#1a1c1c] border-[#f2ca50] text-[#f2ca50]'
                          : 'bg-[#161818] border-[#282a2b] text-[#99907c] hover:border-[#333535]'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fleet Size Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-[#d0c5af] uppercase">2. Nombre de véhicules :</span>
                  <strong className="text-base text-[#f2ca50] font-heading font-black">{fleetSize} véhicule(s)</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={fleetSize}
                  onChange={(e) => setFleetSize(Number(e.target.value))}
                  className="w-full accent-[#f2ca50] cursor-pointer"
                />
              </div>

              {/* Duration Buttons */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#d0c5af] uppercase">
                  3. Durée de l'engagement :
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[12, 24, 36].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDurationMonths(m)}
                      className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                        durationMonths === m
                          ? 'bg-[#f2ca50] text-[#121414] border-[#f2ca50]'
                          : 'bg-[#161818] text-[#d0c5af] border-[#282a2b] hover:border-[#333535]'
                      }`}
                    >
                      {m} Mois {m === 36 ? '(-10%)' : m === 24 ? '(-5%)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result Estimation Badge */}
              <div className="bg-[#1a1c1c] p-5 rounded-2xl border border-[#333535] space-y-2">
                <div className="flex justify-between text-xs text-[#99907c]">
                  <span>Loyer Mensuel Estimé HT :</span>
                  <strong className="text-xl font-heading font-black text-[#f2ca50]">
                    {Math.round(totalMonthlyEstimate).toLocaleString()} FCFA <span className="text-xs text-[#d0c5af]">/mois</span>
                  </strong>
                </div>
                <div className="flex justify-between text-[11px] text-[#99907c]">
                  <span>Valeur totale du contrat ({durationMonths} mois) :</span>
                  <span className="text-white font-medium">{Math.round(totalContractValue).toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>

            {/* Right - Contact Request Form */}
            <div className="lg:col-span-5 bg-[#161818] p-6 rounded-2xl border border-[#333535] flex flex-col justify-between">
              {quoteSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white">Demande de Devis LLD Reçue</h4>
                  <p className="text-xs text-[#d0c5af]">
                    Notre responsable grands comptes va vous contacter sous 2 heures avec une proposition commerciale sur-mesure.
                  </p>
                  <button
                    onClick={() => setQuoteSubmitted(false)}
                    className="text-xs text-[#f2ca50] underline font-medium"
                  >
                    Nouvelle simulation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-4 text-xs">
                  <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                    <FileCheck className="w-4 h-4 text-[#f2ca50]" />
                    <span>Recevoir un Devis Formel par Email</span>
                  </div>

                  <div>
                    <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">Nom de l'Entreprise *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: TotalEnergies Gabon, Olam, BGFIBank..."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">Email Professionnel *</label>
                    <input
                      type="email"
                      required
                      placeholder="direction.achats@entreprise.ga"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">Téléphone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+241 77 00 00 00"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#f2ca50] hover:bg-[#ffe088] text-[#121414] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md shadow-[#f2ca50]/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Envoyer la demande de devis LLD</span>
                  </button>

                  <p className="text-[10px] text-center text-[#99907c]">
                    Réponse garantie sous 2h ouvrées • Étude sans engagement
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
