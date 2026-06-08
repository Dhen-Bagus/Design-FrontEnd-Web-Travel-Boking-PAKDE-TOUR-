import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import trainImg from "../assets/images/train.png";

function Train() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state || {};
  const { kotaAsal = "Jakarta", kotaTujuan = "Bandung", tanggal = "", penumpang = "1 Dewasa" } = searchParams;

  const [selectedTrain, setSelectedTrain] = useState(null);
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

  const trains = [
    { id: 1, nama: "Argo Bromo", kelas: "Eksekutif", jamBerangkat: "06:00", jamTiba: "09:30", harga: 350000, promo: "Diskon 10%", hargaPromo: 315000 },
    { id: 2, nama: "Taksaka", kelas: "Bisnis", jamBerangkat: "08:15", jamTiba: "11:45", harga: 250000, promo: "Diskon 5%", hargaPromo: 237500 },
    { id: 3, nama: "Lodaya", kelas: "Ekonomi", jamBerangkat: "10:30", jamTiba: "14:00", harga: 150000, promo: "Hemat 20rb", hargaPromo: 130000 },
  ];

  const handleBook = (train) => {
    setSelectedTrain(train);
    setShowModal(true);
  };

  const confirmBooking = () => {
    alert(`🚂 Tiket Kereta berhasil dipesan!\n\nKereta: ${selectedTrain.nama} (${selectedTrain.kelas})\nRute: ${kotaAsal} → ${kotaTujuan}\nTanggal: ${tanggal}\nPenumpang: ${penumpang}\nHarga: ${formatRupiah(selectedTrain.hargaPromo)}`);
    setShowModal(false);
  };

  return (
    <div className="train-page">
      <Navbar />
      <div className="train-content">
        <div className="train-header">
          <h1>🚂 Hasil Pencarian Kereta</h1>
          <div className="search-info">
            <span>{kotaAsal} → {kotaTujuan}</span>
            <span>{tanggal || "Belum pilih tanggal"}</span>
            <span>{penumpang}</span>
          </div>
        </div>

        <div className="train-list">
          {trains.map((train) => (
            <div key={train.id} className="train-card">
              <div className="train-left">
                <img src={trainImg} alt="Kereta" className="train-logo" />
                <div>
                  <h3>{train.nama}</h3>
                  <p>{train.kelas} | {train.jamBerangkat} → {train.jamTiba}</p>
                </div>
              </div>
              <div className="train-right">
                <div>
                  <span className="old-price">{formatRupiah(train.harga)}</span>
                  <span className="new-price">{formatRupiah(train.hargaPromo)}</span>
                  <span className="promo-tag">{train.promo}</span>
                </div>
                <button className="book-btn" onClick={() => handleBook(train)}>Pesan Tiket</button>
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
            <p><strong>{selectedTrain?.nama} ({selectedTrain?.kelas})</strong></p>
            <p>{kotaAsal} → {kotaTujuan}</p>
            <p>{tanggal} | {selectedTrain?.jamBerangkat}</p>
            <p className="total-price">{formatRupiah(selectedTrain?.hargaPromo)}</p>
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

export default Train;

// ============================================================
// ============================================================
// SEMUA STYLE ADA DI BAWAH INI
// ============================================================
// ============================================================

// ==================== TRAIN PAGE STYLES ====================
const trainStyles = `
.train-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
}

.train-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 20px 60px;
}

.train-header {
  text-align: center;
  margin-bottom: 40px;
}

.train-header h1 {
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

.train-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.train-card {
  background: #1e293b;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.train-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.train-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.train-left h3 {
  color: white;
  font-size: 1rem;
  margin-bottom: 4px;
}

.train-left p {
  color: #94a3b8;
  font-size: 12px;
}

.train-right {
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
  styleTag.textContent = trainStyles;
  document.head.appendChild(styleTag);
}