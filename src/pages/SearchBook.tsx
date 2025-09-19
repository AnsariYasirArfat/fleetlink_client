import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { vehicleApi, bookingApi, apiErrorMessage } from "../services/api";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { formatDateForApi } from "@/lib/utils";

// Form validation schema
const searchSchema = z.object({
  capacityRequired: z.number().min(1, "Capacity must be at least 1 kg"),
  fromPincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  toPincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  startTime: z.string().min(1, "Start time is required"),
});

export default function SearchBook() {
  const [isSearching, setIsSearching] = useState(false);
  const [isBooking, setIsBooking] = useState<string | null>(null);
  const [availableVehicles, setAvailableVehicles] = useState<
    AvailableVehicle[]
  >([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const watchedValues = watch();

  const onSearch = async (data: SearchFormData) => {
    setIsSearching(true);
    setSearchPerformed(true);
    try {
      const vehicles = await vehicleApi.searchAvailableVehicles({
        ...data,
        startTime: formatDateForApi(new Date(data.startTime)),
      });
      setAvailableVehicles(vehicles);
      if (vehicles.length === 0) {
        toast.info("No vehicles available for the specified criteria");
      }
    } catch (error) {
      console.error("Error searching vehicles:", error);
      toast.error(apiErrorMessage(error));
    } finally {
      setIsSearching(false);
    }
  };

  const onBookVehicle = async (vehicle: AvailableVehicle) => {
    setIsBooking(vehicle._id);
    try {
      const customerId = uuidv4();
      await bookingApi.createBooking({
        vehicleId: vehicle._id,
        fromPincode: watchedValues.fromPincode,
        toPincode: watchedValues.toPincode,
        startTime: formatDateForApi(new Date(watchedValues.startTime)),
        customerId,
      });

      toast.success("Vehicle booked successfully!");
      // Remove the booked vehicle from the list
      setAvailableVehicles((prev) => prev.filter((v) => v._id !== vehicle._id));
    } catch (error: unknown) {
      console.error("Error booking vehicle:", error);
      toast.error(apiErrorMessage(error));
    } finally {
      setIsBooking(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Search & Book Vehicles
        </h1>
        <p className="mt-2 text-gray-600">
          Find available vehicles based on your requirements and book them
          instantly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Search Form */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Search Criteria
            </h2>
            <form onSubmit={handleSubmit(onSearch)} className="space-y-4">
              {/* Capacity Required */}
              <div>
                <label
                  htmlFor="capacityRequired"
                  className="block text-sm font-medium text-gray-700"
                >
                  Capacity Required (KG) *
                </label>
                <input
                  {...register("capacityRequired", { valueAsNumber: true })}
                  type="number"
                  id="capacityRequired"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 500"
                  min="1"
                />
                {errors.capacityRequired && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.capacityRequired.message}
                  </p>
                )}
              </div>

              {/* From Pincode */}
              <div>
                <label
                  htmlFor="fromPincode"
                  className="block text-sm font-medium text-gray-700"
                >
                  From Pincode *
                </label>
                <input
                  {...register("fromPincode")}
                  type="text"
                  id="fromPincode"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 110001"
                  maxLength={6}
                />
                {errors.fromPincode && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fromPincode.message}
                  </p>
                )}
              </div>

              {/* To Pincode */}
              <div>
                <label
                  htmlFor="toPincode"
                  className="block text-sm font-medium text-gray-700"
                >
                  To Pincode *
                </label>
                <input
                  {...register("toPincode")}
                  type="text"
                  id="toPincode"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 400001"
                  maxLength={6}
                />
                {errors.toPincode && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.toPincode.message}
                  </p>
                )}
              </div>

              {/* Start Time */}
              <div>
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date & Time *
                </label>
                <input
                  {...register("startTime")}
                  type="datetime-local"
                  id="startTime"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.startTime && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? "Searching..." : "Search Availability"}
              </button>
            </form>
          </div>
        </div>

        {/* Search Results */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-lg border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Available Vehicles
              </h2>
              {searchPerformed && (
                <p className="text-sm text-gray-600 mt-1">
                  Found {availableVehicles.length} vehicle(s) matching your
                  criteria
                </p>
              )}
            </div>

            <div className="p-6">
              {!searchPerformed ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <p className="text-gray-500">
                    Enter your search criteria to find available vehicles
                  </p>
                </div>
              ) : availableVehicles.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🚫</div>
                  <p className="text-gray-500">
                    No vehicles available for the specified criteria
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Try adjusting your search parameters
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {availableVehicles.map((vehicle) => (
                    <div
                      key={vehicle._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {vehicle.name}
                          </h3>
                          <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Capacity:</span>{" "}
                              {vehicle.capacityKg} KG
                            </div>
                            <div>
                              <span className="font-medium">Tyres:</span>{" "}
                              {vehicle.tyres}
                            </div>
                            <div>
                              <span className="font-medium">
                                Estimated Duration:
                              </span>{" "}
                              {vehicle.estimatedRideDurationHours} hours
                            </div>
                            <div>
                              <span className="font-medium">Route:</span>{" "}
                              {watchedValues.fromPincode} →{" "}
                              {watchedValues.toPincode}
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={() => onBookVehicle(vehicle)}
                            disabled={isBooking === vehicle._id}
                            className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isBooking === vehicle._id
                              ? "Booking..."
                              : "Book Now"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
