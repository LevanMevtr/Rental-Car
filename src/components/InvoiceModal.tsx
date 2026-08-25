import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Car, 
  Share2
} from 'lucide-react';
import { Booking } from '../types';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200 print:p-0 print:bg-white">
      <div className="bg-[#121414] border border-[#4d4635]/60 rounded-3xl w-full max-w-3xl max-h-[95vh] overflow-y-auto shadow-2xl relative text-[#e2e2e2] flex flex-col print:border-none print:shadow-none print:bg-white print:text-black print:max-w-none print:max-h-none print:w-full">
        
        {/* Header Actions (Hidden in Print) */}
        <div className="p-4 sm:p-6 border-b border-[#333535] flex items-center justify-between bg-[#0c0f0f]/80 sticky top-0 z-20 backdrop-blur-md print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1a1c1c] border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50]">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#f2ca50] tracking-widest">
                Document Officiel de Facturation
              </span>
              <h2 className="text-base sm:text-lg font-heading font-extrabold text-white">
                Facture N° {booking.invoiceNumber}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f2ca50] text-[#121414] font-bold text-xs uppercase tracking-wider hover:bg-[#ffe088] transition-all shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#1a1c1c] border border-[#333535] text-[#d0c5af] hover:text-white hover:border-[#f2ca50] flex items-center justify-center transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 space-y-8 bg-[#121414] print:bg-white print:text-black">
          
          {/* Top Logo & Company Info */}
          <div className="flex justify-between items-start border-b border-[#333535] print:border-gray-300 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f2ca50] to-[#b38e1b] flex items-center justify-center text-[#121414] font-black font-heading text-lg">
                  LBG
                </div>
                <div>
                  <h1 className="font-heading font-black text-xl text-white print:text-black tracking-tight leading-none">
                    LBG CAR RENTAL
                  </h1>
                  <span className="text-[9px] uppercase tracking-widest text-[#f2ca50] print:text-amber-800 font-bold">
                    Libreville • Gabon
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-[#99907c] print:text-gray-600 leading-tight space-y-0.5">
                <p>Siège : Boulevard Triomphal Omar Bongo, Libreville</p>
                <p>NIF : 0748293B • RCCM : GA-LBV-2016-B-1192</p>
                <p>Tél : +241 77 00 00 00 • contact@lbgcarrental.ga</p>
              </div>
            </div>

            <div className="text-right">
              <span className="bg-[#1a1c1c] print:bg-gray-100 text-[#f2ca50] print:text-amber-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#f2ca50]/30 print:border-gray-300 inline-block mb-2">
                {booking.paymentStatus === 'paye' ? 'Facture Acquittée' : 'Proforma / En attente'}
              </span>
              <h3 className="font-heading font-black text-lg text-white print:text-black">
                {booking.invoiceNumber}
              </h3>
              <p className="text-xs text-[#99907c] print:text-gray-600">
                Date : {new Date(booking.createdAt).toLocaleDateString('fr-FR')}
              </p>
              <p className="text-xs text-[#99907c] print:text-gray-600">
                Dossier : {booking.bookingNumber}
              </p>
            </div>
          </div>

          {/* Client & Rental Period Information */}
          <div className="grid grid-cols-2 gap-6 bg-[#161818] print:bg-gray-50 p-5 rounded-2xl border border-[#282a2b] print:border-gray-200 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#f2ca50] print:text-amber-800 tracking-wider block mb-1">
                Facturé à :
              </span>
              <strong className="text-sm font-bold text-white print:text-black block">{booking.customerName}</strong>
              <p className="text-[#99907c] print:text-gray-600 mt-1">{booking.customerAddress}</p>
              <p className="text-[#99907c] print:text-gray-600">Email : {booking.customerEmail}</p>
              <p className="text-[#99907c] print:text-gray-600">Tél : {booking.customerPhone}</p>
              <p className="text-[#99907c] print:text-gray-600">Permis N° : {booking.licenseNumber}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#f2ca50] print:text-amber-800 tracking-wider block mb-1">
                Itinéraire & Dates :
              </span>
              <p className="text-white print:text-black"><strong>Départ :</strong> {booking.pickupDate} à {booking.pickupTime}</p>
              <p className="text-[#99907c] print:text-gray-600 text-[11px]">Lieu : {booking.pickupLocation}</p>
              <p className="text-white print:text-black mt-2"><strong>Retour :</strong> {booking.returnDate} à {booking.returnTime}</p>
              <p className="text-[#99907c] print:text-gray-600 text-[11px]">Lieu : {booking.returnLocation}</p>
              <p className="text-[#f2ca50] print:text-amber-800 font-bold mt-2">Durée totale : {booking.days} Jour(s)</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-hidden border border-[#282a2b] print:border-gray-300 rounded-2xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#1a1c1c] print:bg-gray-100 text-[#99907c] print:text-gray-700 uppercase text-[10px] tracking-wider border-b border-[#282a2b] print:border-gray-300">
                <tr>
                  <th className="p-3.5">Désignation des Prestations</th>
                  <th className="p-3.5 text-center">Quantité</th>
                  <th className="p-3.5 text-right">Tarif Unitaire HT</th>
                  <th className="p-3.5 text-right">Total HT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#282a2b] print:divide-gray-200 text-[#d0c5af] print:text-gray-800">
                <tr>
                  <td className="p-3.5">
                    <strong className="text-white print:text-black block">Location {booking.vehicleName}</strong>
                    <span className="text-[10px] text-[#99907c] print:text-gray-500">Catégorie {booking.categoryLabel}</span>
                  </td>
                  <td className="p-3.5 text-center">{booking.days} j</td>
                  <td className="p-3.5 text-right">{booking.dailyRate.toLocaleString()} FCFA</td>
                  <td className="p-3.5 text-right font-medium text-white print:text-black">{booking.baseRentalPrice.toLocaleString()} FCFA</td>
                </tr>

                {booking.withDriver && (
                  <tr>
                    <td className="p-3.5">
                      <strong className="text-white print:text-black block">Prestation Chauffeur Professionnel LBG</strong>
                      <span className="text-[10px] text-[#99907c] print:text-gray-500">Chauffeur bilingue dédié 10h/jour</span>
                    </td>
                    <td className="p-3.5 text-center">{booking.days} j</td>
                    <td className="p-3.5 text-right">25 000 FCFA</td>
                    <td className="p-3.5 text-right font-medium text-white print:text-black">{booking.driverTotal.toLocaleString()} FCFA</td>
                  </tr>
                )}

                {booking.selectedOptions.map((opt, idx) => (
                  <tr key={idx}>
                    <td className="p-3.5 text-white print:text-black">{opt.name}</td>
                    <td className="p-3.5 text-center">1</td>
                    <td className="p-3.5 text-right">{opt.price.toLocaleString()} FCFA</td>
                    <td className="p-3.5 text-right font-medium text-white print:text-black">{opt.price.toLocaleString()} FCFA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Totals */}
          <div className="flex justify-end">
            <div className="w-72 space-y-2 text-xs">
              <div className="flex justify-between text-[#99907c] print:text-gray-600">
                <span>Total Prestations HT :</span>
                <span className="font-medium text-white print:text-black">{(booking.totalPrice - booking.taxesTotal).toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-[#99907c] print:text-gray-600">
                <span>TVA légale (18%) :</span>
                <span className="font-medium text-white print:text-black">{booking.taxesTotal.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#333535] print:border-gray-300 text-sm font-bold text-white print:text-black">
                <span>Total TTC Net :</span>
                <span className="text-[#f2ca50] print:text-amber-800 text-base font-heading font-black">
                  {booking.totalPrice.toLocaleString()} FCFA
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-[#99907c] print:text-gray-600 pt-1">
                <span>Dépôt de caution (restituable) :</span>
                <span>{booking.depositAmount.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#99907c] print:text-gray-600">
                <span>Règlement :</span>
                <span className="uppercase font-bold text-[#f2ca50] print:text-amber-800">{booking.paymentMethod.replace('_', ' ')}</span>
              </div>
            </div>
          </div>

          {/* Official Stamp & Legal Notice */}
          <div className="pt-6 border-t border-[#333535] print:border-gray-300 flex justify-between items-end text-[10px] text-[#99907c] print:text-gray-500">
            <div className="space-y-1 max-w-sm">
              <p>Conditions : Véhicule livré avec le plein et rendu avec le plein.</p>
              <p>Assurance tous risques avec franchise contractuelle incluse.</p>
              <p>Document généré électroniquement, certifié conforme pour justification comptable au Gabon.</p>
            </div>

            <div className="border border-[#4d4635] print:border-gray-400 rounded-xl p-3 text-center bg-[#1a1c1c]/50 print:bg-white">
              <div className="text-[9px] uppercase font-bold text-[#f2ca50] print:text-amber-800">Cachet & Signature</div>
              <div className="text-xs font-heading font-extrabold text-white print:text-black my-1">LBG CAR RENTAL GABON</div>
              <div className="text-[8px] text-emerald-400 font-bold">DIRECTION GÉNÉRALE • VALIDÉ</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
