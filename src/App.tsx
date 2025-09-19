import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import AddVehicle from "@/pages/AddVehicle";
import SearchBook from "@/pages/SearchBook";
import Bookings from "@/pages/Bookings";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route  index element={<Dashboard />} />
          <Route path="add-vehicle" element={<AddVehicle />} />
          <Route path="search-book" element={<SearchBook />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
