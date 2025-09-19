import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiErrorMessage, vehicleApi } from "../services/api";
import { toast } from "sonner";
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

const addVehicleSchema = z.object({
  name: z
    .string({ error: "Vehicle name is required" })
    .min(1, "Vehicle name is required")
    .max(100, "Name too long"),
  capacityKg: z.coerce
    .number<number>({ error: "Capacity is required" })
    .int("Capacity must be an integer")
    .min(1, "Capacity must be at least 1 kg")
    .max(50000, "Capacity too high"),
  tyres: z.coerce
    .number<number>({ error: "Number of tyres is required" })
    .int("Number of tyres must be an integer")
    .min(4, "Must have at least 4 tyres")
    .max(32, "Too many tyres"),
});

export default function AddVehicle() {
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    name: "",
    capacityKg: "" as unknown as number,
    tyres: "" as unknown as number,
  };

  const form = useForm<AddVehicleFormData>({
    resolver: zodResolver(addVehicleSchema),
    mode: "onTouched",
    defaultValues,
  });

  const onSubmit = async (data: AddVehicleFormData) => {
    setIsLoading(true);
    try {
      await vehicleApi.addVehicle(data);
      toast.success("Vehicle added successfully!");
      form.reset(defaultValues)
    } catch (error) {
      console.error("Error adding vehicle:", error);
      toast.error(apiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Add New Vehicle
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Add a new vehicle to your fleet with capacity and specifications
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 sm:p-6 lg:p-8 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Name *</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="e.g., Truck-001, Van-002"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <FormField
                control={form.control}
                name="capacityKg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity (KG) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="numeric"
                        id="capacityKg"
                        placeholder="e.g., 1000"
                        min={1}
                        max={50000}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tyres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Tyres *</FormLabel>
                    <FormControl>
                      <Input
                        id="tyres"
                        type="number"
                        inputMode="numeric"
                        placeholder="e.g., 6"
                        min={2}
                        max={32}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset(defaultValues)}
                className="w-full sm:w-auto"
              >
                Reset Form
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && <Spinner />}
                {isLoading ? "Adding Vehicle..." : "Add Vehicle"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
