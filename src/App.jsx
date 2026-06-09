import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Flight from "./pages/Flight";
import Train from "./pages/Train";
import Bus from "./pages/Bus";
import Hotel from "./pages/Hotel";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Import halaman destinasi
import Jakarta from "./components/Jakarta";
import Bandung from "./components/Bandung";
import Bali from "./components/Bali";
import Yogyakarta from "./components/Yogyakarta";

// ============================================================
// IMPORT UNTUK BOOKING TIKET PESAWAT (TAMBAHAN NANA)
// ============================================================
import FormBookingTiketPesawat from "./pages/FormBookingTiketPesawat";
import TiketPesawat from "./pages/TiketPesawat";

function App() {
  return (
    <Router>
      <Routes>
        {/* ==================== ROUTE AUTHENTIKASI ==================== */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* ==================== ROUTE UTAMA ==================== */}
        <Route path="/home" element={<Home />} />
        
        {/* ==================== ROUTE TRANSPORTASI ==================== */}
        <Route path="/flight" element={<Flight />} />
        <Route path="/train" element={<Train />} />
        <Route path="/bus" element={<Bus />} />
        <Route path="/hotel" element={<Hotel />} />
        
        {/* ==================== ROUTE BOOKING TIKET PESAWAT (TAMBAHAN NANA) ==================== */}
        <Route path="/form-booking" element={<FormBookingTiketPesawat />} />
        <Route path="/tiket-pesawat" element={<TiketPesawat />} />
        
        {/* ==================== ROUTE UNTUK DESTINASI FAVORIT ==================== */}
        <Route path="/destinasi/jakarta" element={<Jakarta />} />
        <Route path="/destinasi/bandung" element={<Bandung />} />
        <Route path="/destinasi/bali" element={<Bali />} />
        <Route path="/destinasi/yogyakarta" element={<Yogyakarta />} />
      </Routes>
    </Router>
  );
}

export default App;