import { Link } from 'react-router';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">FleetLink Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage your logistics vehicle fleet and bookings
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/add-vehicle"
          className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">➕</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Add Vehicle</h3>
              <p className="text-gray-500">Add a new vehicle to your fleet</p>
            </div>
          </div>
        </Link>

        <Link
          to="/search-book"
          className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Search & Book</h3>
              <p className="text-gray-500">Find and book available vehicles</p>
            </div>
          </div>
        </Link>

        <Link
          to="/bookings"
          className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">My Bookings</h3>
              <p className="text-gray-500">View and manage your bookings</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">100</div>
            <div className="text-sm text-gray-500">Total Vehicles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">50</div>
            <div className="text-sm text-gray-500">Available Now</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">29</div>
            <div className="text-sm text-gray-500">Active Bookings</div>
          </div>
        </div>
      </div>
    </div>
  );
}