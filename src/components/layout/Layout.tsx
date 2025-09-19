import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import logo from "@/assets/logo.png";

const navigation = [
  { name: "Dashboard", href: "/", icon: "🏠" },
  { name: "Add Vehicle", href: "/add-vehicle", icon: "➕" },
  { name: "Search & Book", href: "/search-book", icon: "🔍" },
  { name: "My Bookings", href: "/bookings", icon: "📋" },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="FleetLink logo"
                className="h-8 w-8 object-contain"
                loading="eager"
                decoding="async"
              />
              <span className="text-2xl font-bold text-blue-600">FleetLink</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors",
                      isActive
                        ? "border-blue-500 text-gray-900"
                        : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
