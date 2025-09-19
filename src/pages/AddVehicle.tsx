import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiErrorMessage, vehicleApi } from "../services/api";
import { toast } from "sonner";

// Form validation schema
const addVehicleSchema = z.object({
  name: z.string().min(1, "Vehicle name is required").max(100, "Name too long"),
  capacityKg: z
    .number()
    .min(1, "Capacity must be at least 1 kg")
    .max(100000, "Capacity too high"),
  tyres: z
    .number()
    .min(2, "Must have at least 2 tyres")
    .max(20, "Too many tyres"),
});

export default function AddVehicle() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddVehicleFormData>({
    resolver: zodResolver(addVehicleSchema),
  });

  const onSubmit = async (data: AddVehicleFormData) => {
    setIsLoading(true);
    try {
      await vehicleApi.addVehicle(data);
      toast.success("Vehicle added successfully!");
      reset();
    } catch (error) {
      console.error("Error adding vehicle:", error);
      toast.error(apiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Vehicle</h1>
        <p className="mt-2 text-gray-600">
          Add a new vehicle to your fleet with capacity and specifications
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg border">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Vehicle Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Vehicle Name *
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Truck-001, Van-002"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Capacity */}
          <div>
            <label
              htmlFor="capacityKg"
              className="block text-sm font-medium text-gray-700"
            >
              Capacity (KG) *
            </label>
            <input
              {...register("capacityKg", { valueAsNumber: true })}
              type="number"
              id="capacityKg"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 1000"
              min="1"
              max="100000"
            />
            {errors.capacityKg && (
              <p className="mt-1 text-sm text-red-600">
                {errors.capacityKg.message}
              </p>
            )}
          </div>

          {/* Tyres */}
          <div>
            <label
              htmlFor="tyres"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Tyres *
            </label>
            <input
              {...register("tyres", { valueAsNumber: true })}
              type="number"
              id="tyres"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 6"
              min="2"
              max="20"
            />
            {errors.tyres && (
              <p className="mt-1 text-sm text-red-600">
                {errors.tyres.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Adding Vehicle..." : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
