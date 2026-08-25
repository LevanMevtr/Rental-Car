import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Share2, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { LOCATIONS_GABON } from '../data/mockData';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [subject, setSubject] = useState<string>('Renseignement Général');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section className="py-20 bg-[#0c0f0f] border-t border-[#333535]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f2ca50] mb-2">
            <MapPin className="w-3.5 h-3.5" />
            Nous Rencontrer & Nous Contacter
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
            Agences & Service Client à <span className="text-gold-gradient">Libreville</span>
          </h2>
          <p className="text-sm sm:text-base text-[#d0c5af] mt-3">
            Nos conseillers vous accueillent au siège ou à notre comptoir aéroport 7 jours sur 7.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="bg-[#121414] border border-[#333535] rounded-3xl p-6 space-y-4 hover:border-[#f2ca50]/50 transition-all ambient-card-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#1a1c1c] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-base">Agence Siège Social</h3>
              <p className="text-xs text-[#d0c5af] mt-1">
                Boulevard Triomphal Omar Bongo, Immeuble LBG Prestige, Libreville, Gabon
              </p>
            </div>
            <div className="text-[11px] text-[#99907c] pt-2 border-t border-[#282a2b] space-y-1">
              <p>Lun - Sam : 07h30 - 19h00</p>
              <p>Dimanche : 08h30 - 16h00</p>
            </div>
          </div>

          <div className="bg-[#121414] border border-[#333535] rounded-3xl p-6 space-y-4 hover:border-[#f2ca50]/50 transition-all ambient-card-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#1a1c1c] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-base">Comptoir Aéroport Léon-Mba</h3>
              <p className="text-xs text-[#d0c5af] mt-1">
                Terminal International des Arrivées, Hall VIP, Libreville
              </p>
            </div>
            <div className="text-[11px] text-[#99907c] pt-2 border-t border-[#282a2b] space-y-1">
              <p className="text-emerald-400 font-bold">Ouvert 24h/24 & 7j/7</p>
              <p>Prise en charge à l'atterrissage des vols</p>
            </div>
          </div>

          <div className="bg-[#121414] border border-[#333535] rounded-3xl p-6 space-y-4 hover:border-[#f2ca50]/50 transition-all ambient-card-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#1a1c1c] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-base">Lignes Téléphoniques Directes</h3>
              <div className="space-y-1 mt-1">
                <a href="tel:+24177000000" className="text-xs text-[#f2ca50] font-bold block hover:underline">
                  +241 77 00 00 00 (WhatsApp & Urgences 24/7)
                </a>
                <a href="tel:+24111000000" className="text-xs text-white block hover:underline">
                  +241 11 00 00 00 (Standard Agence)
                </a>
              </div>
            </div>
            <div className="text-[11px] text-[#99907c] pt-2 border-t border-[#282a2b]">
              <p>Email : contact@lbgcarrental.ga</p>
            </div>
          </div>

        </div>

        {/* Form and Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[#121414] border border-[#333535] rounded-3xl p-6 sm:p-8">
            <h3 className="font-heading font-bold text-lg text-white mb-1 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#f2ca50]" />
              Envoyez-nous un Message
            </h3>
            <p className="text-xs text-[#99907c] mb-6">
              Remplissez ce formulaire pour toute demande de devis sur-mesure ou information complémentaire.
            </p>

            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-bold text-lg text-white">Message Envoyé avec Succès</h4>
                <p className="text-xs text-[#d0c5af]">
                  Merci {name}. Notre service client à Libreville vous répondra dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs text-[#f2ca50] underline font-medium"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">Nom et Prénom *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Jean-Marc Allogo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">Email de contact *</label>
                    <input
                      type="email"
                      required
                      placeholder="votre.email@domaine.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">Téléphone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+241 77 00 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">Objet du message</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                    >
                      <option value="Renseignement Général">Renseignement Général</option>
                      <option value="Réservation Particulier">Réservation Véhicule Particulier</option>
                      <option value="Contrat Entreprise / LLD">Contrat Entreprise / LLD</option>
                      <option value="Service Chauffeur VIP">Service Chauffeur VIP & Escorte</option>
                      <option value="Partenariat & Recrutement">Partenariat & Recrutement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">Votre Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Détaillez votre demande, vos dates souhaitées, la catégorie de voiture ou votre itinéraire..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#f2ca50] hover:bg-[#ffe088] text-[#121414] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md shadow-[#f2ca50]/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer ma demande à l'équipe</span>
                </button>
              </form>
            )}
          </div>

          {/* Right side: Points de prise en charge & WhatsApp Hotline */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121414] border border-[#333535] rounded-3xl p-6 space-y-4">
              <h3 className="font-heading font-bold text-base text-white">Points de Restitution à Libreville</h3>
              <p className="text-xs text-[#99907c]">
                Nos véhicules peuvent être livrés et récupérés sans surcoût sur nos agences principales ou à votre convenance.
              </p>

              <div className="space-y-2">
                {LOCATIONS_GABON.map((loc) => (
                  <div key={loc.id} className="p-3 rounded-xl bg-[#1a1c1c] border border-[#282a2b] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#f2ca50]" />
                      <span className="text-white font-medium">{loc.name}</span>
                    </div>
                    {loc.surcharge > 0 ? (
                      <span className="text-[10px] text-[#f2ca50] font-semibold">+{loc.surcharge.toLocaleString()} F</span>
                    ) : (
                      <span className="text-[10px] text-emerald-400 font-semibold">Gratuit</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="bg-gradient-to-br from-[#121414] to-[#1a1c1c] border border-[#25D366]/40 rounded-3xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mx-auto">
                <Share2 className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-white text-base">Besoin d'une réponse immédiate ?</h4>
              <p className="text-xs text-[#d0c5af]">
                Notre conseiller WhatsApp est en ligne actuellement pour vous orienter.
              </p>
              <a
                href="https://wa.me/24177000000?text=Bonjour%20LBG%20Car%20Rental%2C%20je%20souhaite%20louer%20une%20voiture%20%C3%A0%20Libreville."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <span>Discuter sur WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
