import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Rooms from "./pages/Rooms";
import Fees from "./pages/Fees";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-950">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/fees" element={<Fees />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}