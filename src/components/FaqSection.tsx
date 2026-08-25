import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Toutes les questions' },
    { id: 'conditions', label: 'Conditions & Âge' },
    { id: 'paiement', label: 'Paiement & Caution' },
    { id: 'assurance', label: 'Assurance & Dépannage' },
    { id: 'services', label: 'Chauffeur & Carburant' },
  ];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#0c0f0f] border-t border-[#333535]/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f2ca50] mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Centre d'Aide & Foire Aux Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
            Tout Savoir sur la Location à <span className="text-gold-gradient">Libreville</span>
          </h2>
          <p className="text-sm sm:text-base text-[#d0c5af] mt-3">
            Trouvez les réponses claires à vos questions sur les permis, cautions, carburant et services au Gabon.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="w-4 h-4 text-[#99907c] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher une question (ex: caution, permis, airtel money, chauffeur)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121414] border border-[#333535] rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-[#99907c] focus:outline-none focus:border-[#f2ca50]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#f2ca50] text-[#121414] shadow-md shadow-[#f2ca50]/20'
                  : 'bg-[#121414] text-[#99907c] hover:text-white border border-[#333535]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 text-[#99907c] text-xs">
              Aucune réponse ne correspond à votre recherche. N'hésitez pas à nous contacter directement sur WhatsApp.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#121414] border border-[#333535] rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#1a1c1c]/50 transition-colors"
                  >
                    <span className="font-heading font-bold text-white text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#1a1c1c] border border-[#333535] flex items-center justify-center text-[#f2ca50] flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#d0c5af] leading-relaxed border-t border-[#282a2b]/60 bg-[#161818]/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
