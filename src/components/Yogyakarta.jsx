import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlane, FaHotel, FaUtensils, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import yogyakartaHero from "../assets/images/yogyakarta.png";

function Yogyakarta() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleBookTicket = () => {
    navigate("/flight", {
      state: {
        kotaAsal: "Jakarta",
        kotaTujuan: "Yogyakarta",
        tanggal: "",
        jam: "",
        penumpang: "1 Dewasa",
      },
    });
  };

  return (
    <div className="destinasi-detail-page">
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft /> Kembali
      </button>

      <div className="destinasi-hero">
        <img src={yogyakartaHero} alt="Yogyakarta" className="destinasi-hero-image" />
        <div className="destinasi-hero-overlay">
          <h1 className="destinasi-hero-title">Yogyakarta</h1>
          <p className="destinasi-hero-subtitle">Kota Pelajar, Gudeg, dan Budaya Jawa</p>
        </div>
      </div>

      <div className="destinasi-content-wrapper">
        {/* Rating & Info */}
        <div className="rating-section">
          <div className="rating-box">
            <FaStar className="star-icon" />
            <span className="rating-value">4.8/5</span>
            <span className="rating-text">(15.432 review)</span>
          </div>
          <div className="info-box">
            <FaMapMarkerAlt />
            <span>DIY, Indonesia</span>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="deskripsi-section">
          <h2>Tentang Yogyakarta</h2>
          <p>
            Yogyakarta adalah pusat kebudayaan Jawa yang kaya akan sejarah, seni, 
            dan kuliner khas. Candi Borobudur, Keraton, dan Pantai Parangtritis 
            menjadi destinasi wajib saat berkunjung ke Jogja. Kota ini juga dikenal 
            sebagai kota pelajar dengan suasana yang khas dan ramah.
          </p>
        </div>

        {/* Tempat Wisata Populer */}
        <div className="wisata-section">
          <h2>📍 Destinasi Wisata Populer</h2>
          <div className="wisata-grid">
            <div className="wisata-card">
              <div className="wisata-card-content">
                <h3>Candi Borobudur</h3>
                <p>Candi Buddha terbesar di dunia</p>
              </div>
            </div>
            <div className="wisata-card">
              <div className="wisata-card-content">
                <h3>Candi Prambanan</h3>
                <p>Candi Hindu yang megah dan indah</p>
              </div>
            </div>
            <div className="wisata-card">
              <div className="wisata-card-content">
                <h3>Malioboro</h3>
                <p>Jalan legenda dengan pusat oleh-oleh</p>
              </div>
            </div>
            <div className="wisata-card">
              <div className="wisata-card-content">
                <h3>Pantai Parangtritis</h3>
                <p>Pantai selatan dengan pasir hitam</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rekomendasi Hotel */}
        <div className="hotel-section">
          <h2>🏨 Rekomendasi Hotel</h2>
          <div className="hotel-grid">
            <div className="hotel-card">
              <h3>The Phoenix Hotel</h3>
              <p>⭐ 5.0 • Mulai Rp 1.200.000/malam</p>
            </div>
            <div className="hotel-card">
              <h3>Hyatt Regency Yogyakarta</h3>
              <p>⭐ 4.9 • Mulai Rp 1.000.000/malam</p>
            </div>
            <div className="hotel-card">
              <h3>Melia Purosani</h3>
              <p>⭐ 4.7 • Mulai Rp 800.000/malam</p>
            </div>
          </div>
        </div>

        {/* Kuliner Khas */}
        <div className="kuliner-section">
          <h2>🍴 Kuliner Khas Yogyakarta</h2>
          <div className="kuliner-grid">
            <div className="kuliner-card">
              <h3>Gudeg</h3>
              <p>Nangka muda dengan kuah santan</p>
            </div>
            <div className="kuliner-card">
              <h3>Bakpia</h3>
              <p>Kue isi kacang hijau legit</p>
            </div>
            <div className="kuliner-card">
              <h3>Yangko</h3>
              <p>Makanan manis kenyal khas Jogja</p>
            </div>
          </div>
        </div>

        {/* Tombol Pesan Tiket */}
        <button className="book-ticket-btn" onClick={handleBookTicket}>
          <FaPlane /> Pesan Tiket Pesawat ke Yogyakarta
        </button>
      </div>

      {/* Inject Styles */}
      <style dangerouslySetInnerHTML={{ __html: destinasiDetailStyles }} />
    </div>
  );
}

export default Yogyakarta;

const destinasiDetailStyles = `
.destinasi-detail-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1a2a3a 100%);
  padding-bottom: 60px;
}

.back-button {
  position: fixed;
  top: 85px;
  left: 20px;
  z-index: 100;
  background: rgba(0,0,0,0.6);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(5px);
  font-size: 14px;
}

.destinasi-hero {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.destinasi-hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.destinasi-hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 40px 20px 20px;
}

.destinasi-hero-title {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.destinasi-hero-subtitle {
  color: #facc15;
  font-size: 1rem;
}

.destinasi-content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.rating-section {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.rating-box, .info-box {
  background: #1e293b;
  padding: 12px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
}

.star-icon {
  color: #facc15;
}

.rating-value {
  font-weight: bold;
  font-size: 1.2rem;
}

.deskripsi-section h2,
.wisata-section h2,
.hotel-section h2,
.kuliner-section h2 {
  color: #facc15;
  margin-bottom: 20px;
}

.deskripsi-section p {
  color: #cbd5e1;
  line-height: 1.8;
  margin-bottom: 40px;
}

.wisata-grid, .hotel-grid, .kuliner-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.wisata-card, .hotel-card, .kuliner-card {
  background: #1e293b;
  padding: 20px;
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.wisata-card:hover, .hotel-card:hover, .kuliner-card:hover {
  transform: translateY(-5px);
}

.wisata-card h3, .hotel-card h3, .kuliner-card h3 {
  color: white;
  margin-bottom: 8px;
}

.wisata-card p, .hotel-card p, .kuliner-card p {
  color: #94a3b8;
  font-size: 14px;
}

.book-ticket-btn {
  width: 100%;
  background: #f59e0b;
  border: none;
  padding: 16px;
  border-radius: 12px;
  color: #0f172a;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.book-ticket-btn:hover {
  background: #fbbf24;
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .destinasi-hero-title {
    font-size: 1.5rem;
  }
  
  .rating-section {
    flex-direction: column;
  }
}
`;