import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { FleetSection } from './components/FleetSection';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { BookingFunnelModal } from './components/BookingFunnelModal';
import { ComparisonModal } from './components/ComparisonModal';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminPortal } from './components/AdminPortal';
import { ServicesSection } from './components/ServicesSection';
import { LongTermRentalSection } from './components/LongTermRentalSection';
import { EnterpriseB2BSection } from './components/EnterpriseB2BSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { InvoiceModal } from './components/InvoiceModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

import { 
  PageView, 
  Vehicle, 
  Booking, 
  Customer, 
  SearchParams, 
  BookingStatus 
} from './types';

import { 
  MOCK_VEHICLES, 
  MOCK_BOOKINGS, 
  MOCK_MAINTENANCE, 
  MOCK_CUSTOMER 
} from './data/mockData';

import { Layers, Car, Sparkles, Check } from 'lucide-react';

export default function App() {
  // Navigation state
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  // Main data state
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [maintenanceList, setMaintenanceList] = useState(MOCK_MAINTENANCE);
  const [currentCustomer, setCurrentCustomer] = useState<Customer>(MOCK_CUSTOMER);

  // Search & Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchParams, setSearchParams] = useState<SearchParams>({
    pickupLocation: 'Aéroport International Léon-Mba (LBV)',
    returnLocation: 'Aéroport International Léon-Mba (LBV)',
    pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    pickupTime: '10:00',
    returnDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    returnTime: '18:00',
    category: 'all',
    withDriver: false,
  });

  // Modal states
  const [detailVehicle, setDetailVehicle] = useState<Vehicle | null>(null);
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null);
  const [invoiceBooking, setInvoiceBooking] = useState<Booking | null>(null);
  const [comparedVehicles, setComparedVehicles] = useState<Vehicle[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast trigger helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Search submit from Hero
  const handleSearchSubmit = (params: SearchParams) => {
    setSearchParams(params);
    if (params.category && params.category !== 'all') {
      setSelectedCategory(params.category);
    }
    setCurrentPage('fleet');
    showToast('Recherche actualisée selon vos critères.');
  };

  // Compare handlers
  const handleToggleCompare = (vehicle: Vehicle) => {
    const isAlready = comparedVehicles.some(v => v.id === vehicle.id);
    if (isAlready) {
      setComparedVehicles(prev => prev.filter(v => v.id !== vehicle.id));
      showToast(`${vehicle.name} retiré du comparateur.`);
    } else {
      if (comparedVehicles.length >= 3) {
        showToast('Vous pouvez comparer au maximum 3 véhicules simultanément.');
        return;
      }
      setComparedVehicles(prev => [...prev, vehicle]);
      showToast(`${vehicle.name} ajouté au comparateur.`);
    }
  };

  const handleRemoveCompare = (id: string) => {
    setComparedVehicles(prev => prev.filter(v => v.id !== id));
  };

  const handleClearCompare = () => {
    setComparedVehicles([]);
  };

  // Open booking flow
  const handleOpenBooking = (vehicle: Vehicle) => {
    setDetailVehicle(null);
    setBookingVehicle(vehicle);
  };

  // Finalize booking from modal
  const handleBookingSuccess = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Réservation ${newBooking.bookingNumber} enregistrée avec succès !`);
  };

  // Open invoice modal
  const handleOpenInvoiceModal = (booking: Booking) => {
    setInvoiceBooking(booking);
  };

  // Admin handlers
  const handleToggleVehicleAvailability = (id: string) => {
    setVehicles(prev =>
      prev.map(v => (v.id === id ? { ...v, available: !v.available } : v))
    );
    showToast('Statut du véhicule mis à jour.');
  };

  const handleUpdateBookingStatus = (id: string, newStatus: BookingStatus) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
    );
    showToast('Statut de la réservation actualisé.');
  };

  return (
    <div className="min-h-screen bg-[#0c0f0f] text-[#e2e2e2] flex flex-col selection:bg-[#f2ca50] selection:text-[#121414]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#1a1c1c] border border-[#f2ca50] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-6 h-6 rounded-full bg-[#f2ca50] text-[#121414] flex items-center justify-center font-bold">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Global Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        onToggleLanguage={() => setLanguage(l => (l === 'fr' ? 'en' : 'fr'))}
        compareCount={comparedVehicles.length}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* PAGE 1: HOME */}
        {currentPage === 'home' && (
          <div>
            <HeroSection
  searchParams={searchParams}
  setSearchParams={setSearchParams}
  onSearch={() => handleSearchSubmit(searchParams)}
  onExploreFleet={() => {
    setCurrentPage('fleet');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
  onOpenLongTerm={() => {
    setCurrentPage('long_term');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
  onQuickBook={() => {
    setCurrentPage('fleet');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
/>

            <CategoriesSection
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                setCurrentPage('fleet');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Featured Fleet Preview */}
            <FleetSection
              vehicles={vehicles}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectVehicle={(v) => setDetailVehicle(v)}
              onBookVehicle={handleOpenBooking}
              comparedVehicles={comparedVehicles}
              onToggleCompare={handleToggleCompare}
            />

            <ServicesSection
              onBookNow={() => {
                setCurrentPage('fleet');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenLongTerm={() => {
                setCurrentPage('long_term');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenB2B={() => {
                setCurrentPage('b2b');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <AboutSection />
            <FaqSection />
            <ContactSection />
          </div>
        )}

        {/* PAGE 2: FLEET */}
        {currentPage === 'fleet' && (
          <div className="pt-6">
            <FleetSection
              vehicles={vehicles}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectVehicle={(v) => setDetailVehicle(v)}
              onBookVehicle={handleOpenBooking}
              comparedVehicles={comparedVehicles}
              onToggleCompare={handleToggleCompare}
            />
            <FaqSection />
          </div>
        )}

        {/* PAGE 3: SERVICES */}
        {currentPage === 'services' && (
          <div className="pt-6">
            <ServicesSection
              onBookNow={() => {
                setCurrentPage('fleet');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenLongTerm={() => {
                setCurrentPage('long_term');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenB2B={() => {
                setCurrentPage('b2b');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <AboutSection />
          </div>
        )}

        {/* PAGE 4: LONG TERM RENTAL (LLD) */}
        {currentPage === 'long_term' && (
          <div className="pt-6">
            <LongTermRentalSection />
            <EnterpriseB2BSection />
          </div>
        )}

        {/* PAGE 5: B2B CORPORATE */}
        {currentPage === 'b2b' && (
          <div className="pt-6">
            <EnterpriseB2BSection />
            <LongTermRentalSection />
          </div>
        )}

        {/* PAGE 6: ABOUT */}
        {currentPage === 'about' && (
          <div className="pt-6">
            <AboutSection />
            <ServicesSection
              onBookNow={() => {
                setCurrentPage('fleet');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenLongTerm={() => {
                setCurrentPage('long_term');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenB2B={() => {
                setCurrentPage('b2b');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* PAGE 7: FAQ */}
        {currentPage === 'faq' && (
          <div className="pt-6">
            <FaqSection />
            <ContactSection />
          </div>
        )}

        {/* PAGE 8: CONTACT */}
        {currentPage === 'contact' && (
          <div className="pt-6">
            <ContactSection />
          </div>
        )}

        {/* PAGE 9: CUSTOMER PORTAL */}
        {currentPage === 'customer_portal' && (
          <CustomerDashboard
            bookings={bookings}
            currentCustomer={currentCustomer}
            onOpenInvoiceModal={handleOpenInvoiceModal}
            onBookAgain={() => {
              setCurrentPage('fleet');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onClose={() => setCurrentPage('home')}
          />
        )}

        {/* PAGE 10: ADMIN PORTAL */}
        {currentPage === 'admin_portal' && (
          <AdminPortal
            vehicles={vehicles}
            bookings={bookings}
            maintenanceList={maintenanceList}
            onToggleVehicleAvailability={handleToggleVehicleAvailability}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onOpenInvoiceModal={handleOpenInvoiceModal}
            onClose={() => setCurrentPage('home')}
          />
        )}
      </main>

      {/* Floating Sticky Compare Floating Bar (if vehicles are selected) */}
      {comparedVehicles.length > 0 && !isCompareOpen && (
        <div className="fixed bottom-6 left-6 z-40 print:hidden animate-in slide-in-from-bottom-6">
          <button
            onClick={() => setIsCompareOpen(true)}
            className="bg-[#121414] border-2 border-[#f2ca50] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 hover:bg-[#1a1c1c] transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#f2ca50] text-[#121414] flex items-center justify-center font-black text-xs font-heading">
              {comparedVehicles.length}
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-white block">Voir le Comparateur</span>
              <span className="text-[10px] text-[#99907c]">{comparedVehicles.map(v => v.name).join(', ')}</span>
            </div>
          </button>
        </div>
      )}

      {/* Floating WhatsApp Concierge */}
      <FloatingWhatsApp />

      {/* Modals */}
      <VehicleDetailModal
        vehicle={detailVehicle}
        isOpen={Boolean(detailVehicle)}
        onClose={() => setDetailVehicle(null)}
        onBookNow={handleOpenBooking}
        onToggleCompare={handleToggleCompare}
        isCompared={detailVehicle ? comparedVehicles.some(v => v.id === detailVehicle.id) : false}
      />

      <BookingFunnelModal
        isOpen={Boolean(bookingVehicle)}
        onClose={() => setBookingVehicle(null)}
        selectedVehicle={bookingVehicle}
        onBookingSuccess={handleBookingSuccess}
        onOpenInvoiceModal={handleOpenInvoiceModal}
      />

      <ComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedVehicles={comparedVehicles}
        onRemoveVehicle={handleRemoveCompare}
        onClearAll={handleClearCompare}
        onBookVehicle={handleOpenBooking}
      />

      <InvoiceModal
        isOpen={Boolean(invoiceBooking)}
        onClose={() => setInvoiceBooking(null)}
        booking={invoiceBooking}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage('fleet');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
