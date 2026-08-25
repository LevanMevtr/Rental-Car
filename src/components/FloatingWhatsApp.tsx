import React, { useState } from 'react';
import { Share2, MessageCircle, X, Check, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [customMsg, setCustomMsg] = useState<string>('');

  const sendWhatsApp = (msgText?: string) => {
    const textToSend = msgText || customMsg || "Bonjour LBG Car Rental, je souhaite réserver une voiture à Libreville.";
    const url = `https://wa.me/24177000000?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 print:hidden">
      {/* Popover popup */}
      {isOpen && (
        <div className="mb-3 bg-[#121414] border border-[#4d4635] rounded-3xl p-5 w-80 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-[#282a2b] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white text-xs block">Conciergerie LBG</strong>
                <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  En ligne à Libreville
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#99907c] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#d0c5af] mb-3 leading-relaxed">
            Bonjour ! Comment pouvons-nous vous aider aujourd'hui ? Choisissez une option rapide :
          </p>

          <div className="space-y-2 mb-3">
            <button
              onClick={() => sendWhatsApp("Bonjour, je souhaite connaître la disponibilité d'un 4x4 / SUV.")}
              className="w-full text-left p-2.5 rounded-xl bg-[#1a1c1c] hover:bg-[#282a2b] border border-[#333535] text-[11px] text-white transition-colors"
            >
              🚗 Disponibilité SUV / 4x4
            </button>
            <button
              onClick={() => sendWhatsApp("Bonjour, j'ai besoin d'un transfert avec chauffeur depuis l'Aéroport Léon-Mba.")}
              className="w-full text-left p-2.5 rounded-xl bg-[#1a1c1c] hover:bg-[#282a2b] border border-[#333535] text-[11px] text-white transition-colors"
            >
              ✈️ Transfert VIP Aéroport
            </button>
            <button
              onClick={() => sendWhatsApp("Bonjour, je souhaite un devis pour une Location Longue Durée (LLD Entreprise).")}
              className="w-full text-left p-2.5 rounded-xl bg-[#1a1c1c] hover:bg-[#282a2b] border border-[#333535] text-[11px] text-white transition-colors"
            >
              🏢 Devis LLD Entreprise
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Écrire un message personnalisé..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendWhatsApp()}
              className="flex-1 bg-[#1a1c1c] border border-[#333535] rounded-xl px-3 py-2 text-xs text-white placeholder-[#99907c] focus:outline-none focus:border-[#25D366]"
            />
            <button
              onClick={() => sendWhatsApp()}
              className="bg-[#25D366] hover:bg-[#20b858] text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}

      {/* Floating Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20b858] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 relative group"
        aria-label="Contacter sur WhatsApp"
      >
        <Share2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="absolute top-0 right-0 w-4 h-4 bg-[#f2ca50] rounded-full border-2 border-[#0c0f0f] animate-ping" />
        <span className="absolute top-0 right-0 w-4 h-4 bg-[#f2ca50] rounded-full border-2 border-[#0c0f0f]" />
      </button>
    </div>
  );
};
