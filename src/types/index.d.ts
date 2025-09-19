// Core data types for FleetLink application

interface Vehicle {
  _id: string;
  name: string;
  capacityKg: number;
  tyres: number;
  createdAt: string;
  updatedAt: string;
}

interface Booking {
  _id: string;
  vehicleId: string;
  fromPincode: string;
  toPincode: string;
  startTime: string;
  customerId: string;
  estimatedRideDurationHours: number;
  bookingEndTime: string;
  createdAt: string;
  updatedAt: string;
}

interface AvailableVehicle extends Vehicle {
  estimatedRideDurationHours: number;
}

interface AddVehicleRequest {
  name: string;
  capacityKg: number;
  tyres: number;
}

interface SearchVehiclesRequest {
  capacityRequired: number;
  fromPincode: string;
  toPincode: string;
  startTime: string;
}

interface CreateBookingRequest {
  vehicleId: string;
  fromPincode: string;
  toPincode: string;
  startTime: string;
  customerId: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Form validation schemas
interface AddVehicleFormData {
  name: string;
  capacityKg: number;
  tyres: number;
}

interface SearchFormData {
  capacityRequired: number;
  fromPincode: string;
  toPincode: string;
  startTime: string;
}
