import { Link } from "react-router";

export default function Bookings() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg border p-10 text-center">
        <div className="text-6xl mb-4">🕒</div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Bookings - Coming Soon
        </h1>
        <p className="text-gray-600 mb-6">
          This feature isn’t available yet. We’ll add viewing and cancelling bookings later.
        </p>
        <Link
          to="/search-book"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          Go to Search & Book
        </Link>
      </div>
    </div>
  );
}
