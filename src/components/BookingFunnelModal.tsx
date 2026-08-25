import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Clock, 
  UserCheck, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  FileText, 
  Download, 
  Share2, 
  CheckCircle2, 
  Sparkles,
  Users,
  Car,
  Phone,
  Mail,
  User,
  Shield,
  Printer
} from 'lucide-react';
import { Vehicle, BookingOption, Booking, PaymentMethod } from '../types';
import { LOCATIONS_GABON, BOOKING_OPTIONS } from '../data/mockData';

interface BookingFunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVehicle: Vehicle | null;
  onBookingSuccess: (newBooking: Booking) => void;
  onOpenInvoiceModal: (booking: Booking) => void;
}

export const BookingFunnelModal: React.FC<BookingFunnelModalProps> = ({
  isOpen,
  onClose,
  selectedVehicle,
  onBookingSuccess,
  onOpenInvoiceModal,
}) => {
  if (!isOpen || !selectedVehicle) return null;

  const [step, setStep] = useState<number>(1);
  const totalSteps = 6;

  // Step 2: Itinerary & Dates
  const [pickupDate, setPickupDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [pickupTime, setPickupTime] = useState<string>('10:00');
  const [returnDate, setReturnDate] = useState<string>(
    new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0]
  );
  const [returnTime, setReturnTime] = useState<string>('18:00');

  // Step 3: Locations
  const [pickupLocation, setPickupLocation] = useState<string>(
    'Aéroport International Léon-Mba (LBV)'
  );
  const [returnLocation, setReturnLocation] = useState<string>(
    'Aéroport International Léon-Mba (LBV)'
  );

  // Step 4: Options & Driver
  const [withDriver, setWithDriver] = useState<boolean>(false);
  const [options, setOptions] = useState<BookingOption[]>(BOOKING_OPTIONS);

  // Step 5: Customer identity
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerCountry, setCustomerCountry] = useState<string>('Gabon');
  const [customerAddress, setCustomerAddress] = useState<string>('Libreville');
  const [licenseNumber, setLicenseNumber] = useState<string>('');
  const [createAccount, setCreateAccount] = useState<boolean>(true);
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Step 6: Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('airtel_money');
  const [mobileNumberPay, setMobileNumberPay] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');

  // Post booking confirmation state
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Calculate rental duration
  const calcDays = Math.max(
    1,
    Math.round(
      (new Date(returnDate).getTime() - new Date(pickupDate).getTime()) /
        (1000 * 3600 * 24)
    ) || 1
  );

  // Financial calculations
  const baseRentalPrice = selectedVehicle.pricePerDay * calcDays;
  const driverCost = withDriver ? 25000 * calcDays : 0;

  // Options total
  const selectedOptionsList = options.filter(o => o.selected);
  const optionsCost = selectedOptionsList.reduce((sum, opt) => {
    return sum + (opt.priceType === 'per_day' ? opt.pricePerDay * calcDays : opt.pricePerDay);
  }, 0);

  // Location surcharge (e.g. domicile delivery)
  const pickupLocObj = LOCATIONS_GABON.find(l => l.name === pickupLocation);
  const locationSurcharge = pickupLocObj ? pickupLocObj.surcharge : 0;

  const subtotal = baseRentalPrice + driverCost + optionsCost + locationSurcharge;
  const taxesTotal = Math.round(subtotal * 0.18); // 18% TVA
  const totalPrice = subtotal + taxesTotal;

  const toggleOption = (id: string) => {
    setOptions(prev =>
      prev.map(opt =>
        opt.id === id ? { ...opt, selected: !opt.selected } : opt
      )
    );
  };

  // Submit complete booking
  const handleFinalizeBooking = () => {
    const bookingNum = `LBG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const invoiceNum = `FAC-LBG-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newBkg: Booking = {
      id: `bkg-${Date.now()}`,
      bookingNumber: bookingNum,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      vehicleImage: selectedVehicle.images[0],
      category: selectedVehicle.category,
      categoryLabel: selectedVehicle.categoryLabel,
      customerName: customerName || 'Client Libreville',
      customerEmail: customerEmail || 'client@lbgcarrental.ga',
      customerPhone: customerPhone || '+241 77 00 00 00',
      customerCountry: customerCountry,
      customerAddress: customerAddress,
      licenseNumber: licenseNumber || 'GA-2024-9988',
      hasAccount: createAccount,
      pickupLocation,
      returnLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      days: calcDays,
      withDriver,
      selectedOptions: selectedOptionsList.map(o => ({
        id: o.id,
        name: o.name,
        price: o.priceType === 'per_day' ? o.pricePerDay * calcDays : o.pricePerDay
      })),
      dailyRate: selectedVehicle.pricePerDay,
      baseRentalPrice,
      optionsTotal: optionsCost,
      driverTotal: driverCost,
      taxesTotal,
      totalPrice,
      depositAmount: selectedVehicle.depositAmount,
      status: paymentMethod === 'sur_place' ? 'en_attente' : 'confirmee',
      paymentMethod,
      paymentStatus: paymentMethod === 'sur_place' ? 'en_attente' : 'paye',
      createdAt: new Date().toISOString(),
      invoiceNumber: invoiceNum,
      specialRequests
    };

    setCreatedBooking(newBkg);
    onBookingSuccess(newBkg);
  };

  const stepsLabels = [
    'Véhicule',
    'Dates',
    'Lieux',
    'Options',
    'Conducteur',
    'Paiement'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-[#121414] border border-[#4d4635]/60 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative text-[#e2e2e2] flex flex-col">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-[#333535] flex items-center justify-between bg-[#0c0f0f]/60 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1a1c1c] border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50]">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#f2ca50] tracking-widest">
                LBG Car Rental • Réservation en ligne
              </span>
              <h2 className="text-base sm:text-lg font-heading font-extrabold text-white">
                {createdBooking ? 'Réservation Confirmée !' : selectedVehicle.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1a1c1c] border border-[#333535] text-[#d0c5af] hover:text-white hover:border-[#f2ca50] flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Progress Bar (Only before completion) */}
        {!createdBooking && (
          <div className="bg-[#161818] border-b border-[#282a2b] px-4 py-3">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {stepsLabels.map((lbl, idx) => {
                const stepNum = idx + 1;
                const isPassed = step > stepNum;
                const isCurrent = step === stepNum;

                return (
                  <div key={idx} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isPassed
                            ? 'bg-[#f2ca50] text-[#121414]'
                            : isCurrent
                            ? 'bg-[#121414] text-[#f2ca50] border-2 border-[#f2ca50] shadow-md shadow-[#f2ca50]/20'
                            : 'bg-[#282a2b] text-[#99907c]'
                        }`}
                      >
                        {isPassed ? <Check className="w-3.5 h-3.5" /> : stepNum}
                      </div>
                      <span className={`text-[10px] mt-1 hidden sm:block font-medium ${
                        isCurrent ? 'text-[#f2ca50]' : 'text-[#99907c]'
                      }`}>
                        {lbl}
                      </span>
                    </div>

                    {idx < stepsLabels.length - 1 && (
                      <div
                        className={`w-6 sm:w-12 h-0.5 mx-1 transition-all ${
                          step > stepNum ? 'bg-[#f2ca50]' : 'bg-[#282a2b]'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Main Body */}
        <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto">
          
          {/* CONFIRMATION SCREEN (When booking is submitted) */}
          {createdBooking ? (
            <div className="space-y-6 text-center max-w-2xl mx-auto py-4">
              <div className="w-16 h-16 rounded-full bg-[#f2ca50]/20 border-2 border-[#f2ca50] flex items-center justify-center text-[#f2ca50] mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-[#f2ca50]" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-[#f2ca50] tracking-widest block mb-1">
                  Confirmation Immédiate
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                  Félicitations, votre réservation est validée !
                </h3>
                <p className="text-xs sm:text-sm text-[#d0c5af] mt-2">
                  Un email et un SMS de confirmation ont été transmis à <strong>{createdBooking.customerEmail}</strong>.
                </p>
              </div>

              {/* Booking Summary Ticket */}
              <div className="bg-[#1a1c1c] rounded-2xl border border-[#4d4635]/60 p-5 text-left space-y-4 text-xs">
                <div className="flex justify-between items-center border-b border-[#282a2b] pb-3">
                  <div>
                    <span className="text-[10px] text-[#99907c] block uppercase">N° de Réservation</span>
                    <strong className="text-base font-extrabold text-[#f2ca50] font-heading">{createdBooking.bookingNumber}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#99907c] block uppercase">Statut</span>
                    <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-1 rounded-full border border-emerald-500/40 text-[10px] uppercase">
                      {createdBooking.status === 'confirmee' ? 'Confirmée' : 'En attente'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#99907c] block">Véhicule :</span>
                    <strong className="text-white text-sm">{createdBooking.vehicleName}</strong>
                  </div>
                  <div>
                    <span className="text-[#99907c] block">Durée :</span>
                    <strong className="text-white">{createdBooking.days} jour(s) ({createdBooking.pickupDate} au {createdBooking.returnDate})</strong>
                  </div>
                  <div>
                    <span className="text-[#99907c] block">Prise en charge :</span>
                    <strong className="text-white">{createdBooking.pickupLocation} ({createdBooking.pickupTime})</strong>
                  </div>
                  <div>
                    <span className="text-[#99907c] block">Restitution :</span>
                    <strong className="text-white">{createdBooking.returnLocation} ({createdBooking.returnTime})</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#282a2b] flex justify-between items-baseline">
                  <span className="text-xs text-[#99907c]">Total TTC Réglé :</span>
                  <span className="text-xl font-heading font-black text-[#f2ca50]">
                    {createdBooking.totalPrice.toLocaleString()} FCFA
                  </span>
                </div>
              </div>

              {/* Post Booking Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => onOpenInvoiceModal(createdBooking)}
                  className="flex items-center justify-center gap-2 bg-[#1a1c1c] hover:bg-[#282a2b] text-white border border-[#f2ca50]/50 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <Printer className="w-4 h-4 text-[#f2ca50]" />
                  <span>Imprimer la Facture / Reçu</span>
                </button>

                <a
                  href={`https://wa.me/24177000000?text=${encodeURIComponent(`Bonjour LBG Car Rental, je viens de réserver le véhicule ${createdBooking.vehicleName} (N° ${createdBooking.bookingNumber}) du ${createdBooking.pickupDate} au ${createdBooking.returnDate}. Merci de confirmer la prise en charge.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Assistance WhatsApp Immédiate</span>
                </a>
              </div>

              <button
                onClick={onClose}
                className="text-xs text-[#99907c] hover:text-[#f2ca50] underline font-medium"
              >
                Fermer et retourner au site
              </button>
            </div>
          ) : (
            <div>
              {/* STEP 1: VEHICLE RECAP */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-6 h-60 rounded-2xl overflow-hidden bg-[#1a1c1c] border border-[#333535]">
                      <img
                        src={selectedVehicle.images[0]}
                        alt={selectedVehicle.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="md:col-span-6 space-y-3 text-xs">
                      <span className="bg-[#1a1c1c] text-[#f2ca50] font-bold px-3 py-1 rounded-full border border-[#f2ca50]/30 uppercase text-[10px]">
                        {selectedVehicle.categoryLabel}
                      </span>
                      <h3 className="text-2xl font-heading font-black text-white">
                        {selectedVehicle.name}
                      </h3>
                      <p className="text-[#99907c]">{selectedVehicle.description}</p>
                      
                      <div className="grid grid-cols-3 gap-2 bg-[#1a1c1c] p-3 rounded-xl border border-[#333535] text-center">
                        <div>
                          <span className="text-[#99907c] block text-[10px]">Places</span>
                          <strong className="text-white">{selectedVehicle.seats}</strong>
                        </div>
                        <div>
                          <span className="text-[#99907c] block text-[10px]">Boîte</span>
                          <strong className="text-white capitalize">{selectedVehicle.transmission}</strong>
                        </div>
                        <div>
                          <span className="text-[#99907c] block text-[10px]">Carburant</span>
                          <strong className="text-white capitalize">{selectedVehicle.fuel}</strong>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-between items-baseline">
                        <span className="text-[#99907c]">Tarif de base journalier :</span>
                        <span className="text-xl font-heading font-black text-[#f2ca50]">
                          {selectedVehicle.pricePerDay.toLocaleString()} FCFA <span className="text-xs text-[#d0c5af]">/jour</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: DATES & DURATION */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Dates et Heures de Location</h3>
                    <p className="text-xs text-[#99907c]">
                      Sélectionnez votre période de location. La durée minimale est de 24 heures.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Departure */}
                    <div className="bg-[#1a1c1c] p-5 rounded-2xl border border-[#333535] space-y-3">
                      <label className="block text-xs font-bold uppercase text-[#f2ca50] flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Prise en charge (Départ)
                      </label>
                      <input
                        type="date"
                        value={pickupDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-[#121414] border border-[#333535] rounded-xl px-4 py-3 text-sm text-white font-medium focus:border-[#f2ca50] focus:outline-none"
                      />
                      <label className="block text-xs text-[#99907c] flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#f2ca50]" />
                        Heure de départ
                      </label>
                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full bg-[#121414] border border-[#333535] rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:border-[#f2ca50] focus:outline-none"
                      />
                    </div>

                    {/* Return */}
                    <div className="bg-[#1a1c1c] p-5 rounded-2xl border border-[#333535] space-y-3">
                      <label className="block text-xs font-bold uppercase text-[#f2ca50] flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Restitution (Retour)
                      </label>
                      <input
                        type="date"
                        value={returnDate}
                        min={pickupDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full bg-[#121414] border border-[#333535] rounded-xl px-4 py-3 text-sm text-white font-medium focus:border-[#f2ca50] focus:outline-none"
                      />
                      <label className="block text-xs text-[#99907c] flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#f2ca50]" />
                        Heure de retour
                      </label>
                      <input
                        type="time"
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="w-full bg-[#121414] border border-[#333535] rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:border-[#f2ca50] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Duration banner */}
                  <div className="bg-[#161818] p-4 rounded-xl border border-[#4d4635]/40 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#99907c]">Durée totale calculée :</span>
                      <strong className="text-white text-sm ml-2">{calcDays} Jour(s)</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[#99907c]">Sous-total Véhicule :</span>
                      <strong className="text-[#f2ca50] text-sm ml-2">{baseRentalPrice.toLocaleString()} FCFA</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: LOCATIONS */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Lieux de Prise en Charge et Restitution</h3>
                    <p className="text-xs text-[#99907c]">
                      Choisissez votre agence ou bénéficiez d'une livraison personnalisée à votre hôtel ou domicile à Libreville.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pickup Location */}
                    <div className="bg-[#1a1c1c] p-5 rounded-2xl border border-[#333535] space-y-3">
                      <label className="block text-xs font-bold uppercase text-[#f2ca50] flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Lieu de prise en charge
                      </label>
                      <div className="space-y-2">
                        {LOCATIONS_GABON.map((loc) => (
                          <label
                            key={loc.id}
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                              pickupLocation === loc.name
                                ? 'bg-[#121414] border-[#f2ca50] text-white font-medium'
                                : 'bg-[#161818] border-[#282a2b] text-[#d0c5af] hover:border-[#333535]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="pickupLoc"
                                checked={pickupLocation === loc.name}
                                onChange={() => setPickupLocation(loc.name)}
                                className="accent-[#f2ca50]"
                              />
                              <span>{loc.name}</span>
                            </div>
                            {loc.surcharge > 0 ? (
                              <span className="text-[10px] text-[#f2ca50] font-bold">
                                +{loc.surcharge.toLocaleString()} F
                              </span>
                            ) : (
                              <span className="text-[10px] text-emerald-400 font-semibold">Gratuit</span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Return Location */}
                    <div className="bg-[#1a1c1c] p-5 rounded-2xl border border-[#333535] space-y-3">
                      <label className="block text-xs font-bold uppercase text-[#f2ca50] flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Lieu de restitution
                      </label>
                      <div className="space-y-2">
                        {LOCATIONS_GABON.map((loc) => (
                          <label
                            key={loc.id}
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                              returnLocation === loc.name
                                ? 'bg-[#121414] border-[#f2ca50] text-white font-medium'
                                : 'bg-[#161818] border-[#282a2b] text-[#d0c5af] hover:border-[#333535]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="returnLoc"
                                checked={returnLocation === loc.name}
                                onChange={() => setReturnLocation(loc.name)}
                                className="accent-[#f2ca50]"
                              />
                              <span>{loc.name}</span>
                            </div>
                            {loc.surcharge > 0 ? (
                              <span className="text-[10px] text-[#f2ca50] font-bold">
                                +{loc.surcharge.toLocaleString()} F
                              </span>
                            ) : (
                              <span className="text-[10px] text-emerald-400 font-semibold">Gratuit</span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: DRIVER & OPTIONS */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Services Optionnels & Chauffeur</h3>
                    <p className="text-xs text-[#99907c]">
                      Personnalisez votre expérience avec nos prestations haut de gamme.
                    </p>
                  </div>

                  {/* Chauffeur Featured Banner */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    withDriver ? 'bg-[#1a1c1c] border-[#f2ca50]' : 'bg-[#161818] border-[#333535]'
                  }`}>
                    <label className="flex items-start justify-between cursor-pointer">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={withDriver}
                          onChange={(e) => setWithDriver(e.target.checked)}
                          className="w-5 h-5 mt-0.5 accent-[#f2ca50] rounded"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-[#f2ca50]" />
                            <strong className="text-white text-sm">Chauffeur Privé Professionnel LBG</strong>
                            <span className="bg-[#f2ca50] text-[#121414] text-[9px] font-black uppercase px-2 py-0.5 rounded">Recommandé</span>
                          </div>
                          <p className="text-xs text-[#d0c5af] mt-1">
                            Chauffeur gabonais bilingue, courtois, formé au protocole et connaissant parfaitement le réseau routier.
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <span className="text-sm font-bold text-[#f2ca50]">25 000 FCFA <span className="text-[10px] text-[#99907c]">/jour</span></span>
                        <span className="block text-[10px] text-[#99907c]">Total : {(25000 * calcDays).toLocaleString()} F</span>
                      </div>
                    </label>
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {options.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => toggleOption(opt.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                          opt.selected ? 'bg-[#1a1c1c] border-[#f2ca50]' : 'bg-[#161818] border-[#282a2b] hover:border-[#333535]'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <input
                            type="checkbox"
                            checked={opt.selected}
                            onChange={() => {}}
                            className="w-4 h-4 mt-0.5 accent-[#f2ca50]"
                          />
                          <div>
                            <strong className="text-xs text-white block">{opt.name}</strong>
                            <p className="text-[11px] text-[#99907c] mt-0.5">{opt.description}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-3 text-xs">
                          <span className="font-bold text-[#f2ca50]">
                            {opt.pricePerDay.toLocaleString()} F
                          </span>
                          <span className="block text-[9px] text-[#99907c]">
                            {opt.priceType === 'per_day' ? '/jour' : 'forfait'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: CUSTOMER DETAILS */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Informations du Conducteur / Locataire</h3>
                    <p className="text-xs text-[#99907c]">
                      Remplissez vos coordonnées. Vous pouvez continuer en tant qu'invité sans mot de passe obligatoire.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">
                        Nom Complet *
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Jean-Marc Mba Allogo"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">
                        Email (pour recevoir le contrat & reçu) *
                      </label>
                      <input
                        type="email"
                        placeholder="Ex: contact@entreprise.ga"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">
                        Téléphone / WhatsApp (avec indicatif) *
                      </label>
                      <input
                        type="tel"
                        placeholder="Ex: +241 77 00 00 00"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">
                        Numéro de Permis de Conduire
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: GA-2022-84910"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">
                        Pays de Résidence
                      </label>
                      <input
                        type="text"
                        value={customerCountry}
                        onChange={(e) => setCustomerCountry(e.target.value)}
                        className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">
                        Adresse / Quartier à Libreville
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Batterie IV, Louis, Angondjé..."
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[#99907c] mb-1 font-semibold uppercase text-[10px]">
                        Demandes particulières ou numéro de vol (Optionnel)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ex: Arrivée vol AF976 à 18h, besoin d'un siège rehausseur..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl px-4 py-2 text-white focus:border-[#f2ca50] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-[#161818] rounded-xl border border-[#333535] flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-[#d0c5af] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={createAccount}
                        onChange={(e) => setCreateAccount(e.target.checked)}
                        className="accent-[#f2ca50] w-4 h-4"
                      />
                      <span>Créer mon Espace Client pour retrouver mes factures et réservations futures</span>
                    </label>
                    <span className="text-[10px] text-[#99907c] hidden sm:inline">Optionnel</span>
                  </div>
                </div>
              )}

              {/* STEP 6: PAYMENT & SUMMARY */}
              {step === 6 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Mode de Paiement & Récapitulatif</h3>
                    <p className="text-xs text-[#99907c]">
                      Réglez en toute sécurité via Airtel Money, Moov Money, Carte Bancaire ou sur place.
                    </p>
                  </div>

                  {/* Payment Methods */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <label
                      onClick={() => setPaymentMethod('airtel_money')}
                      className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                        paymentMethod === 'airtel_money'
                          ? 'bg-[#1a1c1c] border-[#f2ca50] shadow-md shadow-[#f2ca50]/10'
                          : 'bg-[#161818] border-[#282a2b] text-[#99907c]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Smartphone className="w-5 h-5 text-red-500" />
                        <input type="radio" checked={paymentMethod === 'airtel_money'} readOnly className="accent-[#f2ca50]" />
                      </div>
                      <strong className="text-white block">Airtel Money</strong>
                      <span className="text-[10px] text-[#99907c]">Paiement instantané Gabon</span>
                    </label>

                    <label
                      onClick={() => setPaymentMethod('moov_money')}
                      className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                        paymentMethod === 'moov_money'
                          ? 'bg-[#1a1c1c] border-[#f2ca50] shadow-md shadow-[#f2ca50]/10'
                          : 'bg-[#161818] border-[#282a2b] text-[#99907c]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Smartphone className="w-5 h-5 text-blue-500" />
                        <input type="radio" checked={paymentMethod === 'moov_money'} readOnly className="accent-[#f2ca50]" />
                      </div>
                      <strong className="text-white block">Moov Money</strong>
                      <span className="text-[10px] text-[#99907c]">Flooz Gabon rapide</span>
                    </label>

                    <label
                      onClick={() => setPaymentMethod('carte')}
                      className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                        paymentMethod === 'carte'
                          ? 'bg-[#1a1c1c] border-[#f2ca50] shadow-md shadow-[#f2ca50]/10'
                          : 'bg-[#161818] border-[#282a2b] text-[#99907c]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <CreditCard className="w-5 h-5 text-[#f2ca50]" />
                        <input type="radio" checked={paymentMethod === 'carte'} readOnly className="accent-[#f2ca50]" />
                      </div>
                      <strong className="text-white block">Carte Bancaire</strong>
                      <span className="text-[10px] text-[#99907c]">Visa / Mastercard 3DS</span>
                    </label>

                    <label
                      onClick={() => setPaymentMethod('sur_place')}
                      className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                        paymentMethod === 'sur_place'
                          ? 'bg-[#1a1c1c] border-[#f2ca50] shadow-md shadow-[#f2ca50]/10'
                          : 'bg-[#161818] border-[#282a2b] text-[#99907c]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Building2 className="w-5 h-5 text-emerald-400" />
                        <input type="radio" checked={paymentMethod === 'sur_place'} readOnly className="accent-[#f2ca50]" />
                      </div>
                      <strong className="text-white block">Paiement en Agence</strong>
                      <span className="text-[10px] text-[#99907c]">À la prise en charge</span>
                    </label>
                  </div>

                  {/* Payment Inputs conditional */}
                  {(paymentMethod === 'airtel_money' || paymentMethod === 'moov_money') && (
                    <div className="bg-[#1a1c1c] p-4 rounded-xl border border-[#333535] text-xs">
                      <label className="block text-[#99907c] mb-1 font-semibold">
                        Numéro Mobile Money pour la demande de paiement :
                      </label>
                      <input
                        type="tel"
                        placeholder="Ex: 077 00 00 00 ou 066 00 00 00"
                        value={mobileNumberPay}
                        onChange={(e) => setMobileNumberPay(e.target.value)}
                        className="w-full bg-[#121414] border border-[#333535] rounded-xl px-4 py-2.5 text-white focus:border-[#f2ca50] focus:outline-none"
                      />
                      <p className="text-[10px] text-[#99907c] mt-2">
                        Une notification push vous invitera à saisir votre code PIN secret sur votre téléphone.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'carte' && (
                    <div className="bg-[#1a1c1c] p-4 rounded-xl border border-[#333535] space-y-3 text-xs">
                      <div>
                        <label className="block text-[#99907c] mb-1 font-semibold">Numéro de Carte Bancaire</label>
                        <input
                          type="text"
                          placeholder="4000 1234 5678 9010"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-[#121414] border border-[#333535] rounded-xl px-4 py-2 text-white focus:border-[#f2ca50] focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#99907c] mb-1 font-semibold">Expiration (MM/AA)</label>
                          <input
                            type="text"
                            placeholder="08/28"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-[#121414] border border-[#333535] rounded-xl px-4 py-2 text-white focus:border-[#f2ca50] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[#99907c] mb-1 font-semibold">Code CVV</label>
                          <input
                            type="password"
                            placeholder="123"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-[#121414] border border-[#333535] rounded-xl px-4 py-2 text-white focus:border-[#f2ca50] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Full Cost Breakdown Table */}
                  <div className="bg-[#1a1c1c] p-5 rounded-2xl border border-[#4d4635]/60 space-y-2 text-xs">
                    <h4 className="font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#f2ca50]" />
                      Décomposition du Tarif
                    </h4>

                    <div className="flex justify-between text-[#d0c5af]">
                      <span>Location {selectedVehicle.name} ({calcDays} jours x {selectedVehicle.pricePerDay.toLocaleString()} F)</span>
                      <strong className="text-white">{baseRentalPrice.toLocaleString()} FCFA</strong>
                    </div>

                    {withDriver && (
                      <div className="flex justify-between text-[#d0c5af]">
                        <span>Chauffeur Privé Pro ({calcDays} jours)</span>
                        <strong className="text-white">{driverCost.toLocaleString()} FCFA</strong>
                      </div>
                    )}

                    {selectedOptionsList.map(opt => (
                      <div key={opt.id} className="flex justify-between text-[#d0c5af]">
                        <span>{opt.name}</span>
                        <strong className="text-white">
                          {(opt.priceType === 'per_day' ? opt.pricePerDay * calcDays : opt.pricePerDay).toLocaleString()} FCFA
                        </strong>
                      </div>
                    ))}

                    {locationSurcharge > 0 && (
                      <div className="flex justify-between text-[#d0c5af]">
                        <span>Frais de livraison ({pickupLocation})</span>
                        <strong className="text-white">{locationSurcharge.toLocaleString()} FCFA</strong>
                      </div>
                    )}

                    <div className="flex justify-between text-[#99907c] pt-2 border-t border-[#282a2b]">
                      <span>TVA légale (18%)</span>
                      <strong className="text-white">{taxesTotal.toLocaleString()} FCFA</strong>
                    </div>

                    <div className="flex justify-between items-baseline pt-2 border-t border-[#282a2b]">
                      <span className="text-sm font-bold text-white">Total Net à Régler :</span>
                      <span className="text-2xl font-heading font-black text-[#f2ca50]">
                        {totalPrice.toLocaleString()} FCFA
                      </span>
                    </div>

                    <div className="pt-2 text-[10px] text-[#99907c] bg-[#121414] p-2.5 rounded-lg border border-[#282a2b]">
                      <Shield className="w-3.5 h-3.5 text-[#f2ca50] inline mr-1" />
                      Caution restituée après retour : <strong>{selectedVehicle.depositAmount.toLocaleString()} FCFA</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Stepper Controls (Only before completion) */}
        {!createdBooking && (
          <div className="p-4 sm:p-6 border-t border-[#333535] bg-[#0c0f0f]/80 flex items-center justify-between gap-4 sticky bottom-0 z-20 backdrop-blur-md">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a1c1c] text-[#d0c5af] hover:text-white border border-[#333535] text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Précédent</span>
              </button>
            ) : (
              <div></div>
            )}

            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#f2ca50] hover:bg-[#ffe088] text-[#121414] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#f2ca50]/20"
              >
                <span>Étape suivante</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinalizeBooking}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#f2ca50] hover:bg-[#ffe088] text-[#121414] font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#f2ca50]/30 hover:scale-105"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmer et Payer ({totalPrice.toLocaleString()} FCFA)</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
