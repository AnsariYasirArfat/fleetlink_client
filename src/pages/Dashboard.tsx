import { Link } from 'react-router';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          FleetLink Dashboard
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Manage your logistics vehicle fleet and bookings efficiently
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Link
          to="/add-vehicle"
          className="group bg-white p-4 sm:p-6 rounded-lg shadow-sm border hover:shadow-lg transition-all duration-200 hover:border-blue-300"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <span className="text-lg sm:text-2xl">➕</span>
              </div>
            </div>
            <div className="ml-3 sm:ml-4 flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                Add Vehicle
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Add a new vehicle to your fleet
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/search-book"
          className="group bg-white p-4 sm:p-6 rounded-lg shadow-sm border hover:shadow-lg transition-all duration-200 hover:border-green-300"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <span className="text-lg sm:text-2xl">🔍</span>
              </div>
            </div>
            <div className="ml-3 sm:ml-4 flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                Search & Book
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Find and book available vehicles
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/bookings"
          className="group bg-white p-4 sm:p-6 rounded-lg shadow-sm border hover:shadow-lg transition-all duration-200 hover:border-purple-300 sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <span className="text-lg sm:text-2xl">📋</span>
              </div>
            </div>
            <div className="ml-3 sm:ml-4 flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 group-hover:text-purple-700 transition-colors">
                My Bookings
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                View and manage your bookings
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
          System Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">100</div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">Total Vehicles</div>
            <div className="text-xs text-gray-500 mt-1">+5 this month</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">50</div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">Available Now</div>
            <div className="text-xs text-gray-500 mt-1">Ready for booking</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">29</div>
            <div className="text-xs sm:text-sm text-gray-600 font-medium">Active Bookings</div>
            <div className="text-xs text-gray-500 mt-1">In progress</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
          Recent Activity
        </h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New vehicle added</p>
              <p className="text-xs text-gray-500">Truck-001 • 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Booking completed</p>
              <p className="text-xs text-gray-500">Van-002 • 4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Vehicle maintenance</p>
              <p className="text-xs text-gray-500">Truck-003 • 1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}