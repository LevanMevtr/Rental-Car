import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  CreditCard, 
  Download, 
  Printer, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Car, 
  Sparkles, 
  Upload,
  Eye,
  LogOut,
  ChevronRight,
  Share2
} from 'lucide-react';
import { Booking, Customer, Invoice, Vehicle } from '../types';

interface CustomerDashboardProps {
  bookings: Booking[];
  currentCustomer: Customer;
  onOpenInvoiceModal: (booking: Booking) => void;
  onBookAgain: () => void;
  onClose: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  bookings,
  currentCustomer,
  onOpenInvoiceModal,
  onBookAgain,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'invoices' | 'documents' | 'profile' | 'support'>('bookings');
  const [uploadedLicense, setUploadedLicense] = useState<string | null>('Permis_B_Mba_Allogo.pdf');
  const [uploadedId, setUploadedId] = useState<string | null>('CNI_Gabon_Valide_2028.pdf');

  // Customer specific bookings
  const myBookings = bookings;
  const activeBookings = myBookings.filter(b => b.status === 'en_cours' || b.status === 'confirmee');
  const pastBookings = myBookings.filter(b => b.status === 'terminee' || b.status === 'annulee' || b.status === 'en_attente');

  return (
    <div className="py-12 bg-[#0c0f0f] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Customer Header Banner */}
        <div className="bg-[#121414] border border-[#4d4635]/60 rounded-3xl p-6 sm:p-8 mb-8 ambient-card-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f2ca50]/5 blur-[90px] rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f2ca50] to-[#b38e1b] p-0.5 shadow-lg shadow-[#f2ca50]/20 flex items-center justify-center">
                <div className="w-full h-full bg-[#121414] rounded-[14px] flex items-center justify-center text-xl font-heading font-black text-[#f2ca50]">
                  {currentCustomer.name.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-heading font-black text-white">
                    {currentCustomer.name}
                  </h1>
                  <span className="bg-[#f2ca50]/20 text-[#f2ca50] text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-[#f2ca50]/40">
                    Membre VIP Gold
                  </span>
                </div>
                <p className="text-xs text-[#99907c] mt-1 flex items-center gap-3">
                  <span>{currentCustomer.email}</span>
                  <span>•</span>
                  <span>{currentCustomer.phone}</span>
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 sm:gap-6 bg-[#1a1c1c] p-3.5 rounded-2xl border border-[#333535]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#99907c] block">Réservations</span>
                <span className="text-lg font-heading font-extrabold text-white">{myBookings.length}</span>
              </div>
              <div className="w-px h-8 bg-[#333535]"></div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#99907c] block">Statut Permis</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Vérifié
                </span>
              </div>
              <div className="w-px h-8 bg-[#333535]"></div>
              <button
                onClick={onBookAgain}
                className="bg-[#f2ca50] hover:bg-[#ffe088] text-[#121414] font-bold text-xs uppercase px-4 py-2 rounded-xl transition-all shadow-md shadow-[#f2ca50]/20"
              >
                Nouvelle Location
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#333535] pb-4 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'bg-[#f2ca50] text-[#121414] shadow-md shadow-[#f2ca50]/20'
                : 'bg-[#121414] text-[#d0c5af] hover:text-white border border-[#333535]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Mes Réservations ({myBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'invoices'
                ? 'bg-[#f2ca50] text-[#121414] shadow-md shadow-[#f2ca50]/20'
                : 'bg-[#121414] text-[#d0c5af] hover:text-white border border-[#333535]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Mes Factures & Reçus</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'documents'
                ? 'bg-[#f2ca50] text-[#121414] shadow-md shadow-[#f2ca50]/20'
                : 'bg-[#121414] text-[#d0c5af] hover:text-white border border-[#333535]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Mes Documents</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-[#f2ca50] text-[#121414] shadow-md shadow-[#f2ca50]/20'
                : 'bg-[#121414] text-[#d0c5af] hover:text-white border border-[#333535]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Mon Profil</span>
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'support'
                ? 'bg-[#f2ca50] text-[#121414] shadow-md shadow-[#f2ca50]/20'
                : 'bg-[#121414] text-[#d0c5af] hover:text-white border border-[#333535]'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Assistance 24/7</span>
          </button>
        </div>

        {/* TAB 1: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {myBookings.length === 0 ? (
              <div className="bg-[#121414] border border-[#333535] rounded-3xl p-12 text-center max-w-xl mx-auto">
                <Car className="w-12 h-12 text-[#99907c] mx-auto mb-3 opacity-40" />
                <h3 className="text-base font-bold text-white mb-1">Aucune réservation pour le moment</h3>
                <p className="text-xs text-[#99907c] mb-4">
                  Découvrez nos véhicules et réservez en quelques clics à Libreville.
                </p>
                <button
                  onClick={onBookAgain}
                  className="bg-[#f2ca50] text-[#121414] font-bold text-xs uppercase px-5 py-2.5 rounded-xl"
                >
                  Explorer les Véhicules
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myBookings.map((bkg) => (
                  <div
                    key={bkg.id}
                    className="bg-[#121414] rounded-2xl border border-[#333535] p-5 hover:border-[#f2ca50]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-20 rounded-xl overflow-hidden bg-[#1a1c1c] border border-[#333535] flex-shrink-0">
                        <img src={bkg.vehicleImage} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase text-[#f2ca50] bg-[#1a1c1c] px-2 py-0.5 rounded border border-[#f2ca50]/30">
                            {bkg.bookingNumber}
                          </span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            bkg.status === 'confirmee'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : bkg.status === 'en_cours'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {bkg.status === 'confirmee' ? 'Confirmée' : bkg.status === 'en_cours' ? 'Location en cours' : 'En attente'}
                          </span>
                        </div>
                        <h3 className="font-heading text-base font-bold text-white mt-1">{bkg.vehicleName}</h3>
                        <p className="text-xs text-[#99907c] mt-0.5 flex flex-wrap items-center gap-2">
                          <span>Du {bkg.pickupDate} au {bkg.returnDate} ({bkg.days}j)</span>
                          <span>•</span>
                          <span>{bkg.pickupLocation}</span>
                          {bkg.withDriver && <span className="text-[#f2ca50] font-semibold">• Avec Chauffeur</span>}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#282a2b]">
                      <div className="text-right sm:mr-3">
                        <span className="text-[10px] text-[#99907c] block uppercase">Montant Total TTC</span>
                        <strong className="text-base font-extrabold text-[#f2ca50] font-heading">{bkg.totalPrice.toLocaleString()} FCFA</strong>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => onOpenInvoiceModal(bkg)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1a1c1c] text-white border border-[#333535] hover:border-[#f2ca50] text-xs font-semibold uppercase tracking-wider transition-all"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#f2ca50]" />
                          <span>Facture</span>
                        </button>

                        <a
                          href={`https://wa.me/24177000000?text=${encodeURIComponent(`Bonjour, concernant ma réservation ${bkg.bookingNumber} pour le ${bkg.vehicleName}...`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Support</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INVOICES */}
        {activeTab === 'invoices' && (
          <div className="bg-[#121414] border border-[#333535] rounded-3xl overflow-hidden p-5">
            <h3 className="font-heading font-bold text-base text-white mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#f2ca50]" />
              Historique de Facturation & Quittances
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#1a1c1c] text-[#99907c] uppercase text-[10px] tracking-wider border-b border-[#282a2b]">
                  <tr>
                    <th className="p-3">N° Facture</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Véhicule</th>
                    <th className="p-3">Période</th>
                    <th className="p-3">Mode Paiement</th>
                    <th className="p-3">Montant TTC</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#282a2b] text-[#d0c5af]">
                  {myBookings.map((bkg) => (
                    <tr key={bkg.id} className="hover:bg-[#1a1c1c]/50">
                      <td className="p-3 font-bold text-[#f2ca50]">{bkg.invoiceNumber}</td>
                      <td className="p-3">{new Date(bkg.createdAt).toLocaleDateString('fr-FR')}</td>
                      <td className="p-3 text-white font-medium">{bkg.vehicleName}</td>
                      <td className="p-3">{bkg.days} jours ({bkg.pickupDate} au {bkg.returnDate})</td>
                      <td className="p-3 uppercase">{bkg.paymentMethod.replace('_', ' ')}</td>
                      <td className="p-3 font-bold text-white">{bkg.totalPrice.toLocaleString()} FCFA</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => onOpenInvoiceModal(bkg)}
                          className="bg-[#1a1c1c] hover:bg-[#282a2b] text-[#f2ca50] border border-[#4d4635] px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase transition-colors"
                        >
                          Imprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121414] border border-[#333535] rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#f2ca50]" />
                  <h3 className="font-heading font-bold text-base text-white">Permis de Conduire</h3>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Validé
                </span>
              </div>
              <p className="text-xs text-[#99907c]">
                Permis Catégorie B - N° {currentCustomer.licenseNumber}
              </p>
              
              <div className="bg-[#1a1c1c] p-3.5 rounded-xl border border-[#282a2b] flex items-center justify-between text-xs">
                <span className="text-[#d0c5af]">{uploadedLicense}</span>
                <span className="text-[10px] text-emerald-400 font-semibold">Conforme</span>
              </div>

              <label className="block bg-[#161818] border-2 border-dashed border-[#333535] hover:border-[#f2ca50]/50 p-6 rounded-2xl text-center cursor-pointer transition-all">
                <Upload className="w-6 h-6 text-[#f2ca50] mx-auto mb-2" />
                <span className="text-xs font-bold text-white block">Mettre à jour le Permis</span>
                <span className="text-[10px] text-[#99907c]">PDF, JPG ou PNG (Max 10 Mo)</span>
                <input type="file" className="hidden" onChange={(e) => {
                  if (e.target.files?.[0]) setUploadedLicense(e.target.files[0].name);
                }} />
              </label>
            </div>

            <div className="bg-[#121414] border border-[#333535] rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#f2ca50]" />
                  <h3 className="font-heading font-bold text-base text-white">Pièce d'Identité (CNI / Passeport)</h3>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Validé
                </span>
              </div>
              <p className="text-xs text-[#99907c]">
                Document d'identité officiel pour la signature du contrat de location.
              </p>
              
              <div className="bg-[#1a1c1c] p-3.5 rounded-xl border border-[#282a2b] flex items-center justify-between text-xs">
                <span className="text-[#d0c5af]">{uploadedId}</span>
                <span className="text-[10px] text-emerald-400 font-semibold">Conforme</span>
              </div>

              <label className="block bg-[#161818] border-2 border-dashed border-[#333535] hover:border-[#f2ca50]/50 p-6 rounded-2xl text-center cursor-pointer transition-all">
                <Upload className="w-6 h-6 text-[#f2ca50] mx-auto mb-2" />
                <span className="text-xs font-bold text-white block">Mettre à jour la Pièce d'Identité</span>
                <span className="text-[10px] text-[#99907c]">PDF, JPG ou PNG (Max 10 Mo)</span>
                <input type="file" className="hidden" onChange={(e) => {
                  if (e.target.files?.[0]) setUploadedId(e.target.files[0].name);
                }} />
              </label>
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-[#121414] border border-[#333535] rounded-3xl p-6 sm:p-8 max-w-3xl space-y-6 text-xs">
            <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
              <User className="w-4 h-4 text-[#f2ca50]" />
              Coordonnées Personnelles & Préférences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">Nom complet</label>
                <input
                  type="text"
                  defaultValue={currentCustomer.name}
                  className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">Email</label>
                <input
                  type="email"
                  defaultValue={currentCustomer.email}
                  className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">Téléphone Libreville</label>
                <input
                  type="tel"
                  defaultValue={currentCustomer.phone}
                  className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">Adresse de Résidence</label>
                <input
                  type="text"
                  defaultValue={currentCustomer.address}
                  className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#282a2b]">
              <button className="bg-[#f2ca50] text-[#121414] font-bold text-xs uppercase px-6 py-2.5 rounded-xl hover:bg-[#ffe088] transition-colors">
                Enregistrer les modifications
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: SUPPORT */}
        {activeTab === 'support' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121414] border border-[#333535] rounded-3xl p-6 space-y-4">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#f2ca50]" />
                Ligne Directe Conciergerie LBG
              </h3>
              <p className="text-xs text-[#d0c5af] leading-relaxed">
                Notre équipe est joignable 24 heures sur 24 et 7 jours sur 7 pour toute urgence, prolongation de contrat, changement d'itinéraire ou dépannage sur tout le Gabon.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href="tel:+24177000000"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#1a1c1c] border border-[#333535] hover:border-[#f2ca50] transition-colors text-xs text-white"
                >
                  <span>Permanence Téléphonique 24/7 :</span>
                  <strong className="text-[#f2ca50]">+241 77 00 00 00</strong>
                </a>

                <a
                  href="tel:+24111000000"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#1a1c1c] border border-[#333535] hover:border-[#f2ca50] transition-colors text-xs text-white"
                >
                  <span>Agence Siège (Boulevard Triomphal) :</span>
                  <strong className="text-[#f2ca50]">+241 11 00 00 00</strong>
                </a>
              </div>
            </div>

            <div className="bg-[#121414] border border-[#333535] rounded-3xl p-6 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#f2ca50]" />
                  Concierge WhatsApp Exécutif
                </h3>
                <p className="text-xs text-[#d0c5af] leading-relaxed mt-2">
                  Pour une assistance instantanée par messagerie, écrivez directement à notre responsable d'exploitation.
                </p>
              </div>

              <a
                href="https://wa.me/24177000000?text=Bonjour%20LBG%20Car%20Rental%2C%20je%20suis%20client%20et%20j%27ai%20besoin%20d%27assistance."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <Share2 className="w-4 h-4" />
                <span>Ouvrir WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
