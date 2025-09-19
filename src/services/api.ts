import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export function apiErrorMessage(err: unknown): string {
  const fallback = "Something went wrong. Please try again.";

  if (!axios.isAxiosError(err)) return fallback;

  const axiosErr = err as AxiosError<{ message?: string }>;
  const status = axiosErr.response?.status;
  const data = axiosErr.response?.data;


  if (
    data &&
    typeof data === "object" &&
    "message" in data &&
    typeof data.message === "string"
  ) {
    return data.message;
  }

  if (!axiosErr.response) return "Network error. Check your connection.";

  // Status-based fallbacks
  if (status === 400) return "Invalid request. Please check your input.";
  if (status === 404) return "Not found.";
  if (status === 409) return "Conflict. Please try again.";
  if (typeof status === "number" && status >= 500) {
    return "Server error. Please try again later.";
  }
  return fallback;
}

export const vehicleApi = {
  /**
   * Add a new vehicle to the fleet
   */
  addVehicle: async (vehicleData: AddVehicleRequest): Promise<Vehicle> => {
    const response = await api.post<ApiResponse<Vehicle>>(
      "/vehicles",
      vehicleData
    );
    return response.data.data!;
  },

  /**
   * Search for available vehicles based on criteria
   */
  searchAvailableVehicles: async (
    searchParams: SearchVehiclesRequest
  ): Promise<AvailableVehicle[]> => {
    const response = await api.get<ApiResponse<AvailableVehicle[]>>(
      "/vehicles/available",
      {
        params: searchParams,
      }
    );
    return response.data.data!;
  },
};

export const bookingApi = {
  /**
   * Create a new booking
   */
  createBooking: async (
    bookingData: CreateBookingRequest
  ): Promise<Booking> => {
    const response = await api.post<ApiResponse<Booking>>(
      "/bookings",
      bookingData
    );
    return response.data.data!;
  },
};

export default api;
