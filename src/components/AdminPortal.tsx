import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Calendar, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Shield, 
  Wrench, 
  Users, 
  ArrowUpRight,
  Printer,
  ChevronRight
} from 'lucide-react';
import { Vehicle, Booking, VehicleMaintenance, BookingStatus } from '../types';

interface AdminPortalProps {
  vehicles: Vehicle[];
  bookings: Booking[];
  maintenanceList: VehicleMaintenance[];
  onToggleVehicleAvailability: (id: string) => void;
  onUpdateBookingStatus: (id: string, newStatus: BookingStatus) => void;
  onOpenInvoiceModal: (booking: Booking) => void;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  vehicles,
  bookings,
  maintenanceList,
  onToggleVehicleAvailability,
  onUpdateBookingStatus,
  onOpenInvoiceModal,
  onClose,
}) => {
  const [adminTab, setAdminTab] = useState<'overview' | 'fleet' | 'bookings' | 'calendar' | 'maintenance'>('overview');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fleet stats
  const totalFleet = vehicles.length;
  const availableFleet = vehicles.filter(v => v.available).length;
  const inMaintenanceFleet = maintenanceList.filter(m => m.status === 'en_cours').length;
  const occupiedFleet = totalFleet - availableFleet - inMaintenanceFleet;
  const occupancyRate = Math.round(((totalFleet - availableFleet) / totalFleet) * 100);

  // Revenue stats
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status !== 'annulee' ? b.totalPrice : 0), 0);
  const activeBookingsCount = bookings.filter(b => b.status === 'en_cours' || b.status === 'confirmee').length;

  // Filtered bookings
  const filteredBookings = bookings.filter(b => {
    if (filterStatus !== 'all' && b.status !== filterStatus) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        b.bookingNumber.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.vehicleName.toLowerCase().includes(q) ||
        b.customerPhone.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="py-10 bg-[#0c0f0f] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="bg-[#121414] border border-[#4d4635]/60 rounded-3xl p-6 mb-8 ambient-card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1a1c1c] border border-[#f2ca50]/40 flex items-center justify-center text-[#f2ca50]">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#f2ca50] tracking-widest">
                Portail d'Administration • Back-Office LBG
              </span>
              <h1 className="text-xl sm:text-2xl font-heading font-black text-white">
                Gestion de Flotte & Réservations Libreville
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#1a1c1c] text-[#d0c5af] hover:text-white border border-[#333535] text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Retour au site public
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#333535] pb-4 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              adminTab === 'overview'
                ? 'bg-[#f2ca50] text-[#121414] shadow-md shadow-[#f2ca50]/20'
                : 'bg-[#121414] text-[#d0c5af] hover:text-white border border-[#333535]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Vue d'ensemble & KPIs</span>
          </button>

          <button
            onClick={() => setAdminTab('bookings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              adminTab === 'bookings'
                ? 'bg-[#f2ca50] text-[#121414] shadow-md shadow-[#f2ca50]/20'
                : 'bg-[#121414] text-[#d0c5af] hover:text-white border border-[#333535]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Réservations ({bookings.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('fleet')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              adminTab === 'fleet'
                ? 'bg-[#f2ca50] text-[#121414] shadow-md shadow-[#f2ca50]/20'
                : 'bg-[#121414] text-[#d0c5af] hover:text-white border border-[#333535]'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Flotte ({vehicles.length} Véhicules)</span>
          </button>

          <button
            onClick={() => setAdminTab('calendar')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              adminTab === 'calendar'
                ? 'bg-[#f2ca50] text-[#121414] shadow-md shadow-[#f2ca50]/20'
                : 'bg-[#121414] text-[#d0c5af] hover:text-white border border-[#333535]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Calendrier des Disponibilités</span>
          </button>

          <button
            onClick={() => setAdminTab('maintenance')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              adminTab === 'maintenance'
                ? 'bg-[#f2ca50] text-[#121414] shadow-md shadow-[#f2ca50]/20'
                : 'bg-[#121414] text-[#d0c5af] hover:text-white border border-[#333535]'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Atelier & Entretien ({maintenanceList.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {adminTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#121414] border border-[#333535] rounded-2xl p-5">
                <div className="flex items-center justify-between text-xs text-[#99907c] uppercase font-bold mb-2">
                  <span>Chiffre d'Affaires</span>
                  <DollarSign className="w-4 h-4 text-[#f2ca50]" />
                </div>
                <div className="text-2xl font-heading font-black text-[#f2ca50]">
                  {totalRevenue.toLocaleString()} FCFA
                </div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +18.4% vs mois précédent
                </div>
              </div>

              <div className="bg-[#121414] border border-[#333535] rounded-2xl p-5">
                <div className="flex items-center justify-between text-xs text-[#99907c] uppercase font-bold mb-2">
                  <span>Locations Actives</span>
                  <Calendar className="w-4 h-4 text-[#f2ca50]" />
                </div>
                <div className="text-2xl font-heading font-black text-white">
                  {activeBookingsCount}
                </div>
                <div className="text-[11px] text-[#99907c] mt-1">
                  Sur les {vehicles.length} modèles en flotte
                </div>
              </div>

              <div className="bg-[#121414] border border-[#333535] rounded-2xl p-5">
                <div className="flex items-center justify-between text-xs text-[#99907c] uppercase font-bold mb-2">
                  <span>Taux d'Occupation</span>
                  <TrendingUp className="w-4 h-4 text-[#f2ca50]" />
                </div>
                <div className="text-2xl font-heading font-black text-white">
                  {occupancyRate}%
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">
                  Optimal pour Libreville
                </div>
              </div>

              <div className="bg-[#121414] border border-[#333535] rounded-2xl p-5">
                <div className="flex items-center justify-between text-xs text-[#99907c] uppercase font-bold mb-2">
                  <span>Disponibilité Flotte</span>
                  <Car className="w-4 h-4 text-[#f2ca50]" />
                </div>
                <div className="text-2xl font-heading font-black text-white">
                  {availableFleet} / {totalFleet}
                </div>
                <div className="text-[11px] text-amber-400 mt-1">
                  {inMaintenanceFleet} en révision technique
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-[#121414] border border-[#333535] rounded-2xl p-5">
                <h3 className="font-heading font-bold text-base text-white mb-4 flex items-center justify-between">
                  <span>Dernières Réservations Enregistrées</span>
                  <button onClick={() => setAdminTab('bookings')} className="text-xs text-[#f2ca50] hover:underline">
                    Tout voir
                  </button>
                </h3>

                <div className="space-y-3">
                  {bookings.slice(0, 4).map((b) => (
                    <div key={b.id} className="bg-[#1a1c1c] p-3.5 rounded-xl border border-[#282a2b] flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-white">{b.customerName}</strong>
                          <span className="text-[10px] text-[#f2ca50] font-bold">({b.bookingNumber})</span>
                        </div>
                        <p className="text-[11px] text-[#99907c] mt-0.5">
                          {b.vehicleName} • {b.days} jours ({b.pickupDate})
                        </p>
                      </div>

                      <div className="text-right">
                        <strong className="text-white font-heading font-bold">{b.totalPrice.toLocaleString()} F</strong>
                        <div className="text-[10px] text-emerald-400 font-semibold uppercase">{b.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#121414] border border-[#333535] rounded-2xl p-5 space-y-4">
                <h3 className="font-heading font-bold text-base text-white">
                  Gestion Rapide
                </h3>

                <button
                  onClick={() => setAdminTab('fleet')}
                  className="w-full p-3 rounded-xl bg-[#1a1c1c] border border-[#333535] hover:border-[#f2ca50] text-xs font-semibold text-white flex items-center justify-between transition-colors text-left"
                >
                  <span>Mettre à jour la disponibilité flotte</span>
                  <ChevronRight className="w-4 h-4 text-[#f2ca50]" />
                </button>

                <button
                  onClick={() => setAdminTab('calendar')}
                  className="w-full p-3 rounded-xl bg-[#1a1c1c] border border-[#333535] hover:border-[#f2ca50] text-xs font-semibold text-white flex items-center justify-between transition-colors text-left"
                >
                  <span>Consulter le planning des véhicules</span>
                  <ChevronRight className="w-4 h-4 text-[#f2ca50]" />
                </button>

                <button
                  onClick={() => setAdminTab('maintenance')}
                  className="w-full p-3 rounded-xl bg-[#1a1c1c] border border-[#333535] hover:border-[#f2ca50] text-xs font-semibold text-white flex items-center justify-between transition-colors text-left"
                >
                  <span>Planifier une révision atelier</span>
                  <ChevronRight className="w-4 h-4 text-[#f2ca50]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS MANAGEMENT */}
        {adminTab === 'bookings' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-[#121414] border border-[#333535] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="w-full md:w-96 relative">
                <Search className="w-4 h-4 text-[#99907c] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher réservation, client, téléphone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1a1c1c] border border-[#333535] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#99907c] focus:outline-none focus:border-[#f2ca50]"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-[#1a1c1c] text-xs text-[#d0c5af] border border-[#333535] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#f2ca50]"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="en_attente">En attente</option>
                  <option value="confirmee">Confirmée</option>
                  <option value="en_cours">En cours</option>
                  <option value="terminee">Terminée</option>
                  <option value="annulee">Annulée</option>
                </select>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-[#121414] border border-[#333535] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#1a1c1c] text-[#99907c] uppercase text-[10px] tracking-wider border-b border-[#282a2b]">
                    <tr>
                      <th className="p-3.5">N° Dossier</th>
                      <th className="p-3.5">Client & Contact</th>
                      <th className="p-3.5">Véhicule</th>
                      <th className="p-3.5">Période & Lieu</th>
                      <th className="p-3.5">Chauffeur</th>
                      <th className="p-3.5">Montant TTC</th>
                      <th className="p-3.5">Statut</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#282a2b] text-[#d0c5af]">
                    {filteredBookings.map((bkg) => (
                      <tr key={bkg.id} className="hover:bg-[#1a1c1c]/60">
                        <td className="p-3.5 font-bold text-[#f2ca50]">{bkg.bookingNumber}</td>
                        <td className="p-3.5">
                          <strong className="text-white block">{bkg.customerName}</strong>
                          <span className="text-[11px] text-[#99907c]">{bkg.customerPhone}</span>
                        </td>
                        <td className="p-3.5 text-white font-medium">{bkg.vehicleName}</td>
                        <td className="p-3.5">
                          <div>Du {bkg.pickupDate} au {bkg.returnDate} ({bkg.days}j)</div>
                          <div className="text-[10px] text-[#99907c]">{bkg.pickupLocation}</div>
                        </td>
                        <td className="p-3.5">
                          {bkg.withDriver ? (
                            <span className="text-emerald-400 font-semibold">Oui (+Chauffeur)</span>
                          ) : (
                            <span className="text-[#99907c]">Sans chauffeur</span>
                          )}
                        </td>
                        <td className="p-3.5 font-bold text-white">{bkg.totalPrice.toLocaleString()} FCFA</td>
                        <td className="p-3.5">
                          <select
                            value={bkg.status}
                            onChange={(e) => onUpdateBookingStatus(bkg.id, e.target.value as BookingStatus)}
                            className="bg-[#1a1c1c] text-[11px] font-bold text-white border border-[#333535] rounded-lg px-2 py-1 focus:border-[#f2ca50]"
                          >
                            <option value="en_attente">En attente</option>
                            <option value="confirmee">Confirmée</option>
                            <option value="en_cours">En cours</option>
                            <option value="terminee">Terminée</option>
                            <option value="annulee">Annulée</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => onOpenInvoiceModal(bkg)}
                            title="Imprimer Facture"
                            className="p-1.5 rounded-lg bg-[#1a1c1c] text-[#f2ca50] hover:bg-[#282a2b] border border-[#333535]"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FLEET MANAGEMENT */}
        {adminTab === 'fleet' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Gestion des {vehicles.length} Véhicules de la Flotte</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {vehicles.map((v) => (
                <div key={v.id} className="bg-[#121414] border border-[#333535] rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="h-36 rounded-xl overflow-hidden bg-[#1a1c1c] mb-3 relative">
                      <img src={v.images[0]} alt={v.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute top-2 left-2 bg-[#0c0f0f]/80 text-[#f2ca50] px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                        {v.categoryLabel}
                      </span>
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-heading font-bold text-white text-sm">{v.name}</h4>
                        <p className="text-[11px] text-[#99907c]">{v.model}</p>
                      </div>
                      <span className="font-bold text-[#f2ca50] font-heading">{v.pricePerDay.toLocaleString()} F/j</span>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#282a2b] flex items-center justify-between">
                    <span className="text-[11px] text-[#99907c]">Statut Disponibilité :</span>
                    <button
                      onClick={() => onToggleVehicleAvailability(v.id)}
                      className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase transition-all ${
                        v.available
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {v.available ? 'Disponible' : 'Indisponible'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CALENDAR / TIMELINE */}
        {adminTab === 'calendar' && (
          <div className="bg-[#121414] border border-[#333535] rounded-3xl p-6 space-y-6">
            <div>
              <h3 className="font-heading font-bold text-base text-white">Planning & Occupation des Véhicules (Août - Septembre 2026)</h3>
              <p className="text-xs text-[#99907c]">
                Visualisation des réservations actives et prévention des conflits de disponibilité.
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[800px] border border-[#282a2b] rounded-2xl overflow-hidden text-xs">
                {/* Header dates */}
                <div className="grid grid-cols-12 bg-[#1a1c1c] p-3 text-center font-bold text-[#99907c] text-[11px] border-b border-[#282a2b]">
                  <div className="col-span-3 text-left pl-2">Véhicule</div>
                  <div>24 Août</div>
                  <div>25 Août</div>
                  <div>26 Août</div>
                  <div>27 Août</div>
                  <div>28 Août</div>
                  <div>29 Août</div>
                  <div>30 Août</div>
                  <div>31 Août</div>
                  <div>01 Sept</div>
                </div>

                {/* Rows */}
                {vehicles.slice(0, 8).map((v, idx) => (
                  <div key={v.id} className="grid grid-cols-12 p-3 items-center border-b border-[#282a2b] hover:bg-[#1a1c1c]/40">
                    <div className="col-span-3 font-medium text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#f2ca50]"></span>
                      <span className="truncate">{v.name}</span>
                    </div>

                    {/* Timeline mock status */}
                    <div className="col-span-9 grid grid-cols-9 gap-1 text-[10px]">
                      {idx === 0 && (
                        <div className="col-span-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded p-1 text-center font-bold">
                          TotalEnergies (LBG-8941)
                        </div>
                      )}
                      {idx === 1 && (
                        <div className="col-start-3 col-span-5 bg-blue-500/20 text-blue-400 border border-blue-500/40 rounded p-1 text-center font-bold">
                          Cabinet Ministériel (LBG-8942)
                        </div>
                      )}
                      {idx === 2 && (
                        <div className="col-start-4 col-span-3 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded p-1 text-center font-bold">
                          C. Dupré (LBG-8943)
                        </div>
                      )}
                      {idx > 2 && (
                        <div className="col-span-9 text-center text-[#99907c] italic">
                          Disponible à la réservation
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MAINTENANCE */}
        {adminTab === 'maintenance' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white">Suivi Technique & Révisions Flotte Libreville</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {maintenanceList.map((m) => (
                <div key={m.id} className="bg-[#121414] border border-[#333535] rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-heading font-bold text-white text-sm">{m.vehicleName}</h4>
                      <span className="text-[11px] text-[#f2ca50]">{m.type}</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      m.status === 'termine' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {m.status === 'termine' ? 'Terminé' : 'En cours'}
                    </span>
                  </div>

                  <p className="text-[#99907c] text-[11px] bg-[#1a1c1c] p-2.5 rounded-xl border border-[#282a2b]">
                    {m.notes}
                  </p>

                  <div className="pt-2 border-t border-[#282a2b] flex justify-between text-[#99907c] text-[11px]">
                    <span>Atelier : {m.technician}</span>
                    <strong className="text-white">Coût : {m.cost.toLocaleString()} FCFA</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
