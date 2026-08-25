import React, { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  Users, 
  FileSpreadsheet, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2, 
  Send,
  Sparkles
} from 'lucide-react';

export const EnterpriseB2BSection: React.FC = () => {
  const [b2bSubmitted, setB2bSubmitted] = useState<boolean>(false);
  const [corpName, setCorpName] = useState<string>('');
  const [corpSector, setCorpSector] = useState<string>('Pétrole & Énergie');
  const [corpContact, setCorpContact] = useState<string>('');
  const [corpEmail, setCorpEmail] = useState<string>('');
  const [corpNeeds, setCorpNeeds] = useState<string>('');

  const handleB2BSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setB2bSubmitted(true);
  };

  return (
    <section className="py-20 bg-[#0c0f0f] border-t border-[#333535]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f2ca50] mb-2">
            <Building2 className="w-3.5 h-3.5" />
            Solutions Professionnelles & Entreprises
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
            Espace <span className="text-gold-gradient">Corporate & B2B</span>
          </h2>
          <p className="text-sm sm:text-base text-[#d0c5af] mt-3">
            Des formules adaptées aux multinationales, ONG, PME, ambassades et institutions publiques au Gabon.
          </p>
        </div>

        {/* B2B Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#121414] border border-[#333535] rounded-3xl p-7 space-y-4 hover:border-[#f2ca50]/50 transition-all ambient-card-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#1a1c1c] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-white text-lg">Chargé de Compte Dédié</h3>
            <p className="text-xs text-[#d0c5af] leading-relaxed">
              Un interlocuteur unique disponible 24/7 pour traiter vos demandes en priorité, gérer les renouvellements et organiser vos transferts VIP.
            </p>
          </div>

          <div className="bg-[#121414] border border-[#333535] rounded-3xl p-7 space-y-4 hover:border-[#f2ca50]/50 transition-all ambient-card-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#1a1c1c] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-white text-lg">Facturation Mensuelle Consolidée</h3>
            <p className="text-xs text-[#d0c5af] leading-relaxed">
              Relevé mensuel détaillé par centre de coût, projet ou collaborateur. Conditions de règlement à 30 jours pour les comptes agréés.
            </p>
          </div>

          <div className="bg-[#121414] border border-[#333535] rounded-3xl p-7 space-y-4 hover:border-[#f2ca50]/50 transition-all ambient-card-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#1a1c1c] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-white text-lg">Flotte Homologuée Sécurité</h3>
            <p className="text-xs text-[#d0c5af] leading-relaxed">
              Véhicules 4x4 et SUV conformes aux standards QHSE les plus stricts (arceaux, extincteurs, trousses de secours, GPS temps réel).
            </p>
          </div>
        </div>

        {/* Partnership Form */}
        <div className="bg-[#121414] border border-[#4d4635]/60 rounded-3xl p-6 sm:p-10 ambient-gold-glow max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold uppercase text-[#f2ca50] tracking-widest block mb-1">
              Partenariat & Convention Cadre
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
              Ouvrir un Compte Entreprise LBG
            </h3>
            <p className="text-xs text-[#99907c] mt-1">
              Bénéficiez de tarifs préférentiels négociés pour l'ensemble de vos collaborateurs au Gabon.
            </p>
          </div>

          {b2bSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-lg text-white">Demande d'Ouverture de Compte Transmise</h4>
              <p className="text-xs text-[#d0c5af]">
                Notre Direction Commerciale vous contactera pour finaliser la convention cadre d'entreprise.
              </p>
              <button
                onClick={() => setB2bSubmitted(false)}
                className="text-xs text-[#f2ca50] underline font-medium"
              >
                Soumettre un autre dossier
              </button>
            </div>
          ) : (
            <form onSubmit={handleB2BSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">
                    Raison Sociale de l'Entreprise *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Société Gabonaise de Raffinage"
                    value={corpName}
                    onChange={(e) => setCorpName(e.target.value)}
                    className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">
                    Secteur d'Activité
                  </label>
                  <select
                    value={corpSector}
                    onChange={(e) => setCorpSector(e.target.value)}
                    className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                  >
                    <option value="Pétrole & Énergie">Pétrole, Gaz & Énergie</option>
                    <option value="Mines & Forêt">Mines & Industrie Forestière</option>
                    <option value="Banque & Assurances">Banque & Services Financiers</option>
                    <option value="BTP & Construction">BTP, Génie Civil & Infrastructures</option>
                    <option value="Institutions & ONG">Ambassade, Mission Diplomatique, ONG</option>
                    <option value="Autre">Autre secteur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">
                    Nom du Responsable Achats / Logistique *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: M. Jean-Claude Obiang"
                    value={corpContact}
                    onChange={(e) => setCorpContact(e.target.value)}
                    className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">
                    Email Professionnel *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="logistique@entreprise.ga"
                    value={corpEmail}
                    onChange={(e) => setCorpEmail(e.target.value)}
                    className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">
                    Besoins spécifiques en volume de flotte ou missions prévues
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ex: 5 SUV 4x4 avec chauffeurs pour mission d'exploration de 6 mois à Port-Gentil et Franceville..."
                    value={corpNeeds}
                    onChange={(e) => setCorpNeeds(e.target.value)}
                    className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2 text-white focus:border-[#f2ca50] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#f2ca50] hover:bg-[#ffe088] text-[#121414] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md shadow-[#f2ca50]/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Demander l'ouverture d'un Compte Entreprise</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
