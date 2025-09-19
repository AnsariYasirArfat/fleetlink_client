import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
