import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import hotelImg from "../assets/images/hotel.png";

function Hotel() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state || {};
  const { lokasi = "Yogyakarta", checkIn = "", checkOut = "", tamu = "1 Dewasa" } = searchParams;

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) navigate("/");
  }, [navigate]);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const hotels = [
    { id: 1, nama: "Hotel Majapahit", bintang: 5, lokasi: "Yogyakarta", harga: 850000, promo: "Diskon 20%", hargaPromo: 680000, fasilitas: "Kolam Renang, Spa, WiFi" },
    { id: 2, nama: "Grand Inna", bintang: 4, lokasi: "Yogyakarta", harga: 550000, promo: "Diskon 10%", hargaPromo: 495000, fasilitas: "Restoran, Gym, WiFi" },
    { id: 3, nama: "Pondok Indah", bintang: 3, lokasi: "Yogyakarta", harga: 350000, promo: "Hemat 50rb", hargaPromo: 300000, fasilitas: "Parkir, WiFi, TV" },
  ];

  const handleBook = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  const confirmBooking = () => {
    alert(`🏨 Hotel berhasil dipesan!\n\nHotel: ${selectedHotel.nama} (⭐ ${selectedHotel.bintang})\nLokasi: ${lokasi}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nTamu: ${tamu}\nHarga: ${formatRupiah(selectedHotel.hargaPromo)}/malam`);
    setShowModal(false);
  };

  return (
    <div className="hotel-page">
      <Navbar />
      <div className="hotel-content">
        <div className="hotel-header">
          <h1>🏨 Hasil Pencarian Hotel</h1>
          <div className="search-info">
            <span>📍 {lokasi}</span>
            <span>📅 {checkIn || "Belum pilih"} → {checkOut || "Belum pilih"}</span>
            <span>👥 {tamu}</span>
          </div>
        </div>

        <div className="hotel-list">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <div className="hotel-left">
                <img src={hotelImg} alt="Hotel" className="hotel-logo" />
                <div>
                  <h3>{hotel.nama} {'⭐'.repeat(hotel.bintang)}</h3>
                  <p>{hotel.fasilitas}</p>
                </div>
              </div>
              <div className="hotel-right">
                <div>
                  <span className="old-price">{formatRupiah(hotel.harga)}</span>
                  <span className="new-price">{formatRupiah(hotel.hargaPromo)}</span>
                  <span className="promo-tag">{hotel.promo}</span>
                  <span className="per-malam">/malam</span>
                </div>
                <button className="book-btn" onClick={() => handleBook(hotel)}>Pesan Kamar</button>
              </div>
            </div>
          ))}
        </div>

        <button className="back-btn" onClick={() => navigate("/home")}>← Kembali</button>
      </div>

      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Konfirmasi Booking</h2>
            <p><strong>{selectedHotel?.nama} (⭐ {selectedHotel?.bintang})</strong></p>
            <p>📍 {lokasi}</p>
            <p>📅 {checkIn} → {checkOut}</p>
            <p>👥 {tamu}</p>
            <p className="total-price">{formatRupiah(selectedHotel?.hargaPromo)} <span style={{fontSize: "12px"}}>/malam</span></p>
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Batal</button>
              <button onClick={confirmBooking}>Konfirmasi</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Hotel;

// ============================================================
// ============================================================
// SEMUA STYLE ADA DI BAWAH INI
// ============================================================
// ============================================================

// ==================== HOTEL PAGE STYLES ====================
const hotelStyles = `
.hotel-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
}

.hotel-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 20px 60px;
}

.hotel-header {
  text-align: center;
  margin-bottom: 40px;
}

.hotel-header h1 {
  color: #facc15;
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.search-info {
  display: flex;
  justify-content: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 40px;
  width: fit-content;
  margin: 0 auto;
  color: white;
  font-size: 13px;
}

.hotel-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.hotel-card {
  background: #1e293b;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hotel-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.hotel-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.hotel-left h3 {
  color: white;
  font-size: 1rem;
  margin-bottom: 4px;
}

.hotel-left p {
  color: #94a3b8;
  font-size: 11px;
}

.hotel-right {
  text-align: right;
}

.old-price {
  color: #94a3b8;
  font-size: 12px;
  text-decoration: line-through;
  display: block;
}

.new-price {
  color: #facc15;
  font-weight: 700;
  font-size: 1.3rem;
}

.per-malam {
  color: #94a3b8;
  font-size: 10px;
  margin-left: 4px;
}

.promo-tag {
  background: #f59e0b;
  color: #0f172a;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 20px;
  margin-left: 8px;
}

.book-btn {
  background: #f59e0b;
  border: none;
  padding: 8px 20px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
}

.back-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 10px 24px;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  display: block;
  margin: 30px auto 0;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #1e293b;
  border-radius: 20px;
  padding: 25px;
  width: 350px;
  text-align: center;
}

.modal-content h2 {
  color: #facc15;
  margin-bottom: 20px;
}

.modal-content p {
  color: white;
  margin-bottom: 10px;
}

.total-price {
  color: #facc15;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 15px 0;
}

.modal-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.modal-buttons button {
  flex: 1;
  padding: 10px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
}

.modal-buttons button:first-child {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.modal-buttons button:last-child {
  background: #f59e0b;
  color: #0f172a;
  font-weight: 600;
}
`;

if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.textContent = hotelStyles;
  document.head.appendChild(styleTag);
}