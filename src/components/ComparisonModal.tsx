import React from 'react';
import { 
  X, 
  Check, 
  Trash2, 
  Users, 
  Fuel, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Layers
} from 'lucide-react';
import { Vehicle } from '../types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedVehicles: Vehicle[];
  onRemoveVehicle: (id: string) => void;
  onClearAll: () => void;
  onBookVehicle: (v: Vehicle) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  comparedVehicles,
  onRemoveVehicle,
  onClearAll,
  onBookVehicle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-[#121414] border border-[#4d4635]/60 rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl relative text-[#e2e2e2] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#333535] flex items-center justify-between bg-[#0c0f0f]/80 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1a1c1c] border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#f2ca50] tracking-widest">
                Comparateur de Véhicules
              </span>
              <h2 className="text-base sm:text-lg font-heading font-extrabold text-white">
                Comparaison Côte à Côte ({comparedVehicles.length} modèle{comparedVehicles.length > 1 ? 's' : ''})
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {comparedVehicles.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-[#99907c] hover:text-red-400 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#333535] hover:border-red-400/40 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Effacer tout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#1a1c1c] border border-[#333535] text-[#d0c5af] hover:text-white hover:border-[#f2ca50] flex items-center justify-center transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="p-4 sm:p-6 overflow-x-auto">
          {comparedVehicles.length === 0 ? (
            <div className="text-center py-12">
              <Layers className="w-12 h-12 text-[#99907c] mx-auto mb-3 opacity-40" />
              <p className="text-sm text-[#d0c5af]">
                Vous n'avez sélectionné aucun véhicule pour la comparaison.
              </p>
              <p className="text-xs text-[#99907c] mt-1">
                Cliquez sur le bouton "Comparer" sur les fiches véhicules dans la flotte.
              </p>
            </div>
          ) : (
            <div className="min-w-[650px] space-y-4">
              {/* Vehicles Header cards */}
              <div className={`grid gap-4 ${
                comparedVehicles.length === 1 ? 'grid-cols-1' : comparedVehicles.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
              }`}>
                {comparedVehicles.map((v) => (
                  <div key={v.id} className="bg-[#1a1c1c] rounded-2xl border border-[#333535] p-4 flex flex-col justify-between relative group">
                    <button
                      onClick={() => onRemoveVehicle(v.id)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#121414] text-[#99907c] hover:text-red-400 flex items-center justify-center border border-[#333535]"
                      title="Retirer de la comparaison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div>
                      <div className="h-36 rounded-xl overflow-hidden mb-3 bg-[#121414]">
                        <img src={v.images[0]} alt={v.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#f2ca50]">{v.categoryLabel}</span>
                      <h4 className="font-heading font-bold text-white text-base leading-tight mt-0.5">{v.name}</h4>
                      <p className="text-xs text-[#99907c] mb-3">{v.model}</p>
                    </div>

                    <div>
                      <div className="text-lg font-heading font-extrabold text-[#f2ca50] mb-3">
                        {v.pricePerDay.toLocaleString()} FCFA <span className="text-[10px] text-[#99907c]">/j</span>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onBookVehicle(v);
                        }}
                        className="w-full bg-[#f2ca50] hover:bg-[#ffe088] text-[#121414] font-bold text-xs uppercase py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                      >
                        <span>Réserver ce modèle</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Specs Comparison Rows */}
              <div className="bg-[#161818] rounded-2xl border border-[#333535] overflow-hidden text-xs">
                
                {/* Row: Tarifs Semaine & Mois */}
                <div className="p-3 border-b border-[#282a2b] bg-[#1a1c1c] font-bold text-[#f2ca50] uppercase text-[10px] tracking-wider">
                  Grille Tarifaire (FCFA)
                </div>
                <div className={`p-3 border-b border-[#282a2b] grid ${
                  comparedVehicles.length === 1 ? 'grid-cols-1' : comparedVehicles.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                } gap-4`}>
                  {comparedVehicles.map(v => (
                    <div key={v.id} className="space-y-1">
                      <div className="flex justify-between text-[#99907c]">
                        <span>Semaine :</span>
                        <strong className="text-white">{v.pricePerWeek.toLocaleString()} F</strong>
                      </div>
                      <div className="flex justify-between text-[#99907c]">
                        <span>Mois :</span>
                        <strong className="text-white">{v.pricePerMonth.toLocaleString()} F</strong>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Row: Places & Portes */}
                <div className="p-3 border-b border-[#282a2b] bg-[#1a1c1c] font-bold text-[#f2ca50] uppercase text-[10px] tracking-wider">
                  Habitabilité & Capacité
                </div>
                <div className={`p-3 border-b border-[#282a2b] grid ${
                  comparedVehicles.length === 1 ? 'grid-cols-1' : comparedVehicles.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                } gap-4`}>
                  {comparedVehicles.map(v => (
                    <div key={v.id} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[#99907c]">Nombre de places :</span>
                        <strong className="text-white">{v.seats} Places</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#99907c]">Portes & Valises :</span>
                        <strong className="text-white">{v.doors} Portes / {v.luggage} Bagages</strong>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Row: Motorisation & Transmission */}
                <div className="p-3 border-b border-[#282a2b] bg-[#1a1c1c] font-bold text-[#f2ca50] uppercase text-[10px] tracking-wider">
                  Motorisation & Conduite
                </div>
                <div className={`p-3 border-b border-[#282a2b] grid ${
                  comparedVehicles.length === 1 ? 'grid-cols-1' : comparedVehicles.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                } gap-4`}>
                  {comparedVehicles.map(v => (
                    <div key={v.id} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[#99907c]">Boîte de vitesses :</span>
                        <strong className="text-white capitalize">{v.transmission}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#99907c]">Type Carburant :</span>
                        <strong className="text-white capitalize">{v.fuel}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#99907c]">Climatisation :</span>
                        <strong className="text-[#f2ca50]">Tropicalisée Haute Puissance</strong>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Row: Caution & Sécurité */}
                <div className="p-3 border-b border-[#282a2b] bg-[#1a1c1c] font-bold text-[#f2ca50] uppercase text-[10px] tracking-wider">
                  Caution & Garantie
                </div>
                <div className={`p-3 grid ${
                  comparedVehicles.length === 1 ? 'grid-cols-1' : comparedVehicles.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                } gap-4`}>
                  {comparedVehicles.map(v => (
                    <div key={v.id} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[#99907c]">Dépôt de garantie :</span>
                        <strong className="text-white">{v.depositAmount.toLocaleString()} FCFA</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#99907c]">Assurance :</span>
                        <strong className="text-emerald-400">Tous Risques Inclus</strong>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
