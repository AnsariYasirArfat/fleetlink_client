import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function Bookings() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          My Bookings
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          View and manage your vehicle bookings
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white shadow-sm rounded-lg border p-6 sm:p-8 lg:p-12 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-2xl sm:text-3xl">🕒</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
          Bookings Feature Coming Soon
        </h2>

        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
          We're working hard to bring you a comprehensive booking management
          system. You'll be able to view, track, and cancel your bookings
          easily.
        </p>

        {/* Feature Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-sm">👁️</span>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              View Bookings
            </h3>
            <p className="text-xs text-gray-500">
              See all your active bookings
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 mx-auto mb-2 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-sm">❌</span>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              Cancel Bookings
            </h3>
            <p className="text-xs text-gray-500">Cancel when needed</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/search-book">Search & Book Vehicles</Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link to="/add-vehicle">Add New Vehicle</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
