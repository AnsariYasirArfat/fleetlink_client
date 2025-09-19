import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { vehicleApi, bookingApi, apiErrorMessage } from "@/services/api";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { formatDateForApi } from "@/lib/utils";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";

const searchSchema = z.object({
  capacityRequired: z.coerce
    .number<number>({ error: "Capacity required" })
    .int("Capacity must be an integer")
    .min(1, "Capacity must be at least 1 kg"),
  fromPincode: z
    .string({ error: "From pincode is required" })
    .regex(/^\d{6}$/, "Pincode must be 6 digits"),
  toPincode: z
    .string({ error: "To pincode is required" })
    .regex(/^\d{6}$/, "Pincode must be 6 digits"),
  startTime: z
    .string({ error: "Start time is required" })
    .min(1, "Start time is required"),
});

export default function SearchBook() {
  const [isSearching, setIsSearching] = useState(false);
  const [isBooking, setIsBooking] = useState<string | null>(null);
  const [availableVehicles, setAvailableVehicles] = useState<AvailableVehicle[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const dateTimeLocalNow = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  const defaultValues = {
    capacityRequired: "" as unknown as number,
    fromPincode: "",
    toPincode: "",
    startTime: dateTimeLocalNow,
  };

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    mode: "onTouched",
    defaultValues,
  });

  const watchedValues = form.watch();

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
      setAvailableVehicles((prev) => prev.filter((v) => v._id !== vehicle._id));
    } catch (error: unknown) {
      console.error("Error booking vehicle:", error);
      toast.error(apiErrorMessage(error));
    } finally {
      setIsBooking(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Search & Book Vehicles
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Find available vehicles based on your requirements and book them instantly
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Search Form */}
        <div className="xl:col-span-1">
          <div className="bg-white shadow-sm rounded-lg border p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
              Search Criteria
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSearch)} className="space-y-4 sm:space-y-6">
                <FormField
                  control={form.control}
                  name="capacityRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity Required (KG) *</FormLabel>
                      <FormControl>
                        <Input
                          id="capacityRequired"
                          type="number"
                          inputMode="numeric"
                          placeholder="e.g., 500"
                          min={1}
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fromPincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Pincode *</FormLabel>
                        <FormControl>
                          <Input
                            id="fromPincode"
                            placeholder="e.g., 110001"
                            maxLength={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="toPincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To Pincode *</FormLabel>
                        <FormControl>
                          <Input
                            id="toPincode"
                            placeholder="e.g., 400001"
                            maxLength={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date & Time *</FormLabel>
                      <FormControl>
                        <Input
                          id="startTime"
                          type="datetime-local"
                          {...field}
                          value={field.value ?? ""}
                          defaultValue={dateTimeLocalNow}
                          min={dateTimeLocalNow}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSearching}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSearching && <Spinner />}
                  {isSearching ? "Searching..." : "Search Availability"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Search Results */}
        <div className="xl:col-span-2">
          <div className="bg-white shadow-sm rounded-lg border">
            <div className="p-4 sm:p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Available Vehicles</h2>
              {searchPerformed && (
                <p className="text-sm text-gray-600 mt-1">
                  Found {availableVehicles.length} vehicle(s) matching your criteria
                </p>
              )}
            </div>

            <div className="p-4 sm:p-6">
              {!searchPerformed ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-gray-400 text-4xl sm:text-6xl mb-4">🔍</div>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Enter your search criteria to find available vehicles
                  </p>
                </div>
              ) : availableVehicles.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-gray-400 text-4xl sm:text-6xl mb-4">🚫</div>
                  <p className="text-gray-500 text-sm sm:text-base">
                    No vehicles available for the specified criteria
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-2">
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
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                            {vehicle.name}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                            <div className="flex items-center">
                              <span className="font-medium mr-2">Capacity:</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {vehicle.capacityKg} KG
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium mr-2">Tyres:</span>
                              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                                {vehicle.tyres}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium mr-2">Duration:</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                {vehicle.estimatedRideDurationHours} hours
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium mr-2">Route:</span>
                              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                                {watchedValues.fromPincode} → {watchedValues.toPincode}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Button
                            onClick={() => onBookVehicle(vehicle)}
                            disabled={isBooking === vehicle._id}
                            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isBooking === vehicle._id && <Spinner />}
                            {isBooking === vehicle._id ? "Booking..." : "Book Now"}
                          </Button>
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
