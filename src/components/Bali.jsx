import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlane, FaHotel, FaUtensils, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import baliHero from "../assets/images/bali.png";

function Bali() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleBookTicket = () => {
    navigate("/flight", {
      state: {
        kotaAsal: "Jakarta",
        kotaTujuan: "Bali",
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
        <img src={baliHero} alt="Bali" className="destinasi-hero-image" />
        <div className="destinasi-hero-overlay">
          <h1 className="destinasi-hero-title">Bali</h1>
          <p className="destinasi-hero-subtitle">Pulau Dewata, Surga Dunia</p>
        </div>
      </div>

      <div className="destinasi-content-wrapper">
        {/* Rating & Info */}
        <div className="rating-section">
          <div className="rating-box">
            <FaStar className="star-icon" />
            <span className="rating-value">4.9/5</span>
            <span className="rating-text">(25.678 review)</span>
          </div>
          <div className="info-box">
            <FaMapMarkerAlt />
            <span>Bali, Indonesia</span>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="deskripsi-section">
          <h2>Tentang Bali</h2>
          <p>
            Bali adalah surga tropis yang menawarkan pantai eksotis, budaya yang kaya, 
            dan pemandangan alam yang memukau. Dari Kuta hingga Ubud, setiap sudut Bali 
            memiliki pesona tersendiri. Pulau ini juga dikenal dengan tradisi Hindu yang 
            kuat dan keramahan penduduknya.
          </p>
        </div>

        {/* Tempat Wisata Populer */}
        <div className="wisata-section">
          <h2>📍 Destinasi Wisata Populer</h2>
          <div className="wisata-grid">
            <div className="wisata-card">
              <div className="wisata-card-content">
                <h3>Pantai Kuta</h3>
                <p>Pantai ikonik dengan pemandangan sunset terbaik</p>
              </div>
            </div>
            <div className="wisata-card">
              <div className="wisata-card-content">
                <h3>Tanah Lot</h3>
                <p>Pura di atas batu karang di tengah laut</p>
              </div>
            </div>
            <div className="wisata-card">
              <div className="wisata-card-content">
                <h3>Tegallalang</h3>
                <p>Sawah terasering yang indah di Ubud</p>
              </div>
            </div>
            <div className="wisata-card">
              <div className="wisata-card-content">
                <h3>Garuda Wisnu Kencana</h3>
                <p>Patung Dewa Wisnu yang megah</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rekomendasi Hotel */}
        <div className="hotel-section">
          <h2>🏨 Rekomendasi Hotel</h2>
          <div className="hotel-grid">
            <div className="hotel-card">
              <h3>Ayana Resort Bali</h3>
              <p>⭐ 5.0 • Mulai Rp 2.500.000/malam</p>
            </div>
            <div className="hotel-card">
              <h3>Mulia Resort</h3>
              <p>⭐ 5.0 • Mulai Rp 2.000.000/malam</p>
            </div>
            <div className="hotel-card">
              <h3>Padma Resort Legian</h3>
              <p>⭐ 4.8 • Mulai Rp 1.500.000/malam</p>
            </div>
          </div>
        </div>

        {/* Kuliner Khas */}
        <div className="kuliner-section">
          <h2>🍴 Kuliner Khas Bali</h2>
          <div className="kuliner-grid">
            <div className="kuliner-card">
              <h3>Babi Guling</h3>
              <p>Babi panggang dengan bumbu rempah khas</p>
            </div>
            <div className="kuliner-card">
              <h3>Ayam Betutu</h3>
              <p>Ayam utuh dengan bumbu genep khas Bali</p>
            </div>
            <div className="kuliner-card">
              <h3>Sate Lilit</h3>
              <p>Sate dari daging cincang dengan kelapa</p>
            </div>
          </div>
        </div>

        {/* Tombol Pesan Tiket */}
        <button className="book-ticket-btn" onClick={handleBookTicket}>
          <FaPlane /> Pesan Tiket Pesawat ke Bali
        </button>
      </div>

      {/* Inject Styles */}
      <style dangerouslySetInnerHTML={{ __html: destinasiDetailStyles }} />
    </div>
  );
}

export default Bali;

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