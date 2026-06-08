import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import busImg from "../assets/images/bus.png";

function Bus() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state || {};
  const { kotaAsal = "Jakarta", kotaTujuan = "Yogyakarta", tanggal = "", penumpang = "1 Dewasa" } = searchParams;

  const [selectedBus, setSelectedBus] = useState(null);
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

  const buses = [
    { id: 1, nama: "Sumber Alam", kelas: "Executive", jamBerangkat: "07:00", jamTiba: "14:00", harga: 200000, promo: "Diskon 10%", hargaPromo: 180000 },
    { id: 2, nama: "Lorena", kelas: "Super", jamBerangkat: "09:30", jamTiba: "16:30", harga: 180000, promo: "Diskon 5%", hargaPromo: 171000 },
    { id: 3, nama: "Pahala Kencana", kelas: "VIP", jamBerangkat: "12:00", jamTiba: "19:00", harga: 220000, promo: "Hemat 30rb", hargaPromo: 190000 },
  ];

  const handleBook = (bus) => {
    setSelectedBus(bus);
    setShowModal(true);
  };

  const confirmBooking = () => {
    alert(`🚌 Tiket Bus berhasil dipesan!\n\nBus: ${selectedBus.nama} (${selectedBus.kelas})\nRute: ${kotaAsal} → ${kotaTujuan}\nTanggal: ${tanggal}\nPenumpang: ${penumpang}\nHarga: ${formatRupiah(selectedBus.hargaPromo)}`);
    setShowModal(false);
  };

  return (
    <div className="bus-page">
      <Navbar />
      <div className="bus-content">
        <div className="bus-header">
          <h1>🚌 Hasil Pencarian Bus</h1>
          <div className="search-info">
            <span>{kotaAsal} → {kotaTujuan}</span>
            <span>{tanggal || "Belum pilih tanggal"}</span>
            <span>{penumpang}</span>
          </div>
        </div>

        <div className="bus-list">
          {buses.map((bus) => (
            <div key={bus.id} className="bus-card">
              <div className="bus-left">
                <img src={busImg} alt="Bus" className="bus-logo" />
                <div>
                  <h3>{bus.nama}</h3>
                  <p>{bus.kelas} | {bus.jamBerangkat} → {bus.jamTiba}</p>
                </div>
              </div>
              <div className="bus-right">
                <div>
                  <span className="old-price">{formatRupiah(bus.harga)}</span>
                  <span className="new-price">{formatRupiah(bus.hargaPromo)}</span>
                  <span className="promo-tag">{bus.promo}</span>
                </div>
                <button className="book-btn" onClick={() => handleBook(bus)}>Pesan Tiket</button>
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
            <p><strong>{selectedBus?.nama} ({selectedBus?.kelas})</strong></p>
            <p>{kotaAsal} → {kotaTujuan}</p>
            <p>{tanggal} | {selectedBus?.jamBerangkat}</p>
            <p className="total-price">{formatRupiah(selectedBus?.hargaPromo)}</p>
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

export default Bus;

// ============================================================
// ============================================================
// SEMUA STYLE ADA DI BAWAH INI
// ============================================================
// ============================================================

// ==================== BUS PAGE STYLES ====================
const busStyles = `
.bus-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
}

.bus-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 20px 60px;
}

.bus-header {
  text-align: center;
  margin-bottom: 40px;
}

.bus-header h1 {
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

.bus-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.bus-card {
  background: #1e293b;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bus-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.bus-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.bus-left h3 {
  color: white;
  font-size: 1rem;
  margin-bottom: 4px;
}

.bus-left p {
  color: #94a3b8;
  font-size: 12px;
}

.bus-right {
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
  styleTag.textContent = busStyles;
  document.head.appendChild(styleTag);
}