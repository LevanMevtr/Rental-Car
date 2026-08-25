export type VehicleCategory = 'citadines' | 'suv' | 'pickup' | '4x4' | 'bus' | 'prestige';

export type TransmissionType = 'automatique' | 'manuelle';
export type FuelType = 'essence' | 'diesel' | 'hybride';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: VehicleCategory;
  categoryLabel: string;
  pricePerDay: number;
  pricePerWeek: number;
  pricePerMonth: number;
  transmission: TransmissionType;
  seats: number;
  doors: number;
  luggage: number;
  ac: boolean;
  fuel: FuelType;
  available: boolean;
  isFeatured?: boolean;
  year: number;
  mileage: string;
  description: string;
  features: string[];
  conditions: string[];
  images: string[];
  location: string;
  driverAvailable: boolean;
  rating: number;
  reviewCount: number;
  depositAmount: number;
}

export interface BookingOption {
  id: string;
  name: string;
  pricePerDay: number;
  priceType: 'per_day' | 'flat';
  selected: boolean;
  description: string;
  iconName: string;
}

export type BookingStatus = 'en_attente' | 'confirmee' | 'en_cours' | 'terminee' | 'annulee';
export type PaymentMethod = 'carte' | 'airtel_money' | 'moov_money' | 'sur_place';
export type PaymentStatus = 'paye' | 'en_attente' | 'rembourse';

export interface Booking {
  id: string;
  bookingNumber: string;
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  category: VehicleCategory;
  categoryLabel: string;
  
  // Customer info
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCountry: string;
  customerAddress: string;
  licenseNumber: string;
  hasAccount?: boolean;

  // Itinerary
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  days: number;
  
  // Service configuration
  withDriver: boolean;
  selectedOptions: {
    id: string;
    name: string;
    price: number;
  }[];

  // Financials (in FCFA)
  dailyRate: number;
  baseRentalPrice: number;
  optionsTotal: number;
  driverTotal: number;
  taxesTotal: number;
  totalPrice: number;
  depositAmount: number;

  // Status
  status: BookingStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  
  // Metadata
  createdAt: string;
  invoiceNumber: string;
  specialRequests?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  licenseNumber: string;
  licenseIssueDate?: string;
  totalBookings: number;
  totalSpent: number;
  createdAt: string;
  avatarUrl?: string;
  savedVehicles: string[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingNumber: string;
  bookingId: string;
  date: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  vehicleName: string;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  days: number;
  dailyRate: number;
  baseTotal: number;
  options: { name: string; amount: number }[];
  driverAmount: number;
  subtotal: number;
  taxTva: number;
  total: number;
  deposit: number;
  paymentMethod: PaymentMethod;
  status: 'paye' | 'en_attente' | 'annule';
}

export interface VehicleReview {
  id: string;
  vehicleId: string;
  author: string;
  authorLocation: string;
  rating: number;
  date: string;
  comment: string;
  verifiedRental: boolean;
}

export interface VehicleMaintenance {
  id: string;
  vehicleId: string;
  vehicleName: string;
  type: string;
  startDate: string;
  endDate: string;
  cost: number;
  technician: string;
  status: 'planifie' | 'en_cours' | 'termine';
  notes: string;
}

export interface SearchParams {
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  category: string;
  withDriver?: boolean;
}

export type PageView = 
  | 'home'
  | 'fleet'
  | 'services'
  | 'long_term'
  | 'b2b'
  | 'about'
  | 'faq'
  | 'contact'
  | 'customer_portal'
  | 'admin_portal';

export type ActivePage = PageView;
