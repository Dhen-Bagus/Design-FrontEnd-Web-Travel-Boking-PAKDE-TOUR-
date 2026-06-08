import { useNavigate } from "react-router-dom";
import { 
  FaStar, 
  FaMapMarkerAlt,
  FaBuilding,
  FaHotel,
  FaUtensils,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { useState } from "react";

// Import gambar dari folder destinasi
import jakarta1 from "../assets/images/destinasi/jakarta 1.jpg";
import jakarta2 from "../assets/images/destinasi/jakarta 2.jpg";
import jakarta3 from "../assets/images/destinasi/jakarta 3.jpg";
import jakartaHero from "../assets/images/destinasi/jakarta.jpg";
import ancol from "../assets/images/destinasi/ancol.jpg";
import kotaTua from "../assets/images/destinasi/Kota Tua Jakarta, 2017.jpg";
import grandIndonesia from "../assets/images/destinasi/grand indonesia.jpg";
import hotelKempinski from "../assets/images/destinasi/Hotel Indonesia Kempinski Jakarta.jpg";
import hotelPullman from "../assets/images/destinasi/Pullman Hai Phong Grand Hotel.jpg";
import hotelIbis from "../assets/images/destinasi/ibis Styles Jakarta Airport.jpg";
import kerakTelor from "../assets/images/destinasi/kerak telor.jpg";
import sotoBetawi from "../assets/images/destinasi/soto betawi.jpg";
import kembangGoyang from "../assets/images/destinasi/kembang goyang.jpg";

// Array untuk slider hero
const heroImages = [jakartaHero, jakarta1, jakarta2, jakarta3];

function Jakarta() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
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
      {/* Hero Slider Section */}
      <div className="destinasi-hero">
        <img src={heroImages[currentSlide]} alt="Jakarta" className="destinasi-hero-image" />
        
        <button className="slider-btn prev-btn" onClick={handlePrevSlide}>
          <FaChevronLeft />
        </button>
        
        <button className="slider-btn next-btn" onClick={handleNextSlide}>
          <FaChevronRight />
        </button>
        
        <div className="slider-dots">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        
        <div className="destinasi-hero-overlay">
          <h1 className="destinasi-hero-title">Jakarta</h1>
          <p className="destinasi-hero-subtitle">Ibukota Negara Kesatuan Republik Indonesia</p>
        </div>
      </div>

      <div className="destinasi-content-wrapper">
        {/* Rating & Info */}
        <div className="rating-section">
          <div className="rating-box">
            <FaStar className="star-icon" />
            <span className="rating-value">4.5/5</span>
            <span className="rating-text">(12.345 review)</span>
          </div>
          <div className="info-box">
            <FaMapMarkerAlt />
            <span>DKI Jakarta, Indonesia</span>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="deskripsi-section">
          <h2>Tentang Jakarta</h2>
          <p>
            Jakarta adalah ibu kota Indonesia yang dinamis dan penuh dengan energi. 
            Kota ini merupakan pusat bisnis, politik, dan budaya dengan berbagai 
            destinasi menarik seperti Monas, Kota Tua, Ancol, dan berbagai pusat 
            perbelanjaan modern.
          </p>
        </div>

        {/* Tempat Wisata Populer */}
        <div className="wisata-section">
          <h2><FaBuilding /> Destinasi Wisata Populer</h2>
          <div className="wisata-grid">
            <div className="wisata-card">
              <img src={kotaTua} alt="Kota Tua" className="wisata-image" />
              <div className="wisata-card-content">
                <h3>Kota Tua</h3>
                <p>Bangunan bersejarah peninggalan Belanda</p>
              </div>
            </div>
            <div className="wisata-card">
              <img src={ancol} alt="Ancol" className="wisata-image" />
              <div className="wisata-card-content">
                <h3>Ancol Dreamland</h3>
                <p>Wisata keluarga dengan pantai dan wahana</p>
              </div>
            </div>
            <div className="wisata-card">
              <img src={grandIndonesia} alt="Grand Indonesia" className="wisata-image" />
              <div className="wisata-card-content">
                <h3>Grand Indonesia</h3>
                <p>Pusat perbelanjaan mewah di jantung kota</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rekomendasi Hotel */}
        <div className="hotel-section">
          <h2><FaHotel /> Rekomendasi Hotel</h2>
          <div className="hotel-grid">
            <div className="hotel-card">
              <img src={hotelKempinski} alt="Hotel Kempinski" className="hotel-image" />
              <div className="hotel-card-content">
                <h3>Hotel Indonesia Kempinski</h3>
                <p><FaStar className="small-star" /> 5.0 • Mulai Rp 1.500.000/malam</p>
              </div>
            </div>
            <div className="hotel-card">
              <img src={hotelPullman} alt="Pullman" className="hotel-image" />
              <div className="hotel-card-content">
                <h3>Pullman Jakarta Central Park</h3>
                <p><FaStar className="small-star" /> 4.8 • Mulai Rp 1.200.000/malam</p>
              </div>
            </div>
            <div className="hotel-card">
              <img src={hotelIbis} alt="Ibis" className="hotel-image" />
              <div className="hotel-card-content">
                <h3>Ibis Budget Jakarta</h3>
                <p><FaStar className="small-star" /> 4.0 • Mulai Rp 350.000/malam</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kuliner Khas */}
        <div className="kuliner-section">
          <h2><FaUtensils /> Kuliner Khas Jakarta</h2>
          <div className="kuliner-grid">
            <div className="kuliner-card">
              <img src={kerakTelor} alt="Kerak Telor" className="kuliner-image" />
              <div className="kuliner-card-content">
                <h3>Kerak Telor</h3>
                <p>Makanan tradisional Betawi</p>
              </div>
            </div>
            <div className="kuliner-card">
              <img src={sotoBetawi} alt="Soto Betawi" className="kuliner-image" />
              <div className="kuliner-card-content">
                <h3>Soto Betawi</h3>
                <p>Soto dengan kuah santan</p>
              </div>
            </div>
            <div className="kuliner-card">
              <img src={kembangGoyang} alt="Kembang Goyang" className="kuliner-image" />
              <div className="kuliner-card-content">
                <h3>Kembang Goyang</h3>
                <p>Camilan khas Betawi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol Pesan Tiket */}
        <button className="book-ticket-btn" onClick={handleBookTicket}>
          <MdOutlineFlightTakeoff /> Pesan Tiket Pesawat ke Jakarta
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: destinasiDetailStyles }} />
    </div>
  );
}

export default Jakarta;

const destinasiDetailStyles = `
.destinasi-detail-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1a2a3a 100%);
  padding-bottom: 60px;
}

/* Hero Slider */
.destinasi-hero {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.destinasi-hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
}

.slider-btn:hover {
  background: rgba(0,0,0,0.8);
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}

.slider-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  border: none;
  cursor: pointer;
  padding: 0;
}

.dot.active {
  background: #facc15;
  width: 20px;
  border-radius: 10px;
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

/* Rating Section */
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

.small-star {
  color: #facc15;
  font-size: 10px;
  margin-right: 4px;
}

.rating-value {
  font-weight: bold;
  font-size: 1.2rem;
}

.rating-text {
  color: #94a3b8;
  font-size: 12px;
}

/* Deskripsi */
.deskripsi-section h2,
.wisata-section h2,
.hotel-section h2,
.kuliner-section h2 {
  color: #facc15;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.3rem;
}

.deskripsi-section p {
  color: #cbd5e1;
  line-height: 1.8;
  margin-bottom: 40px;
}

/* Grid Layout */
.wisata-grid, .hotel-grid, .kuliner-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

/* Cards */
.wisata-card, .hotel-card, .kuliner-card {
  background: #1e293b;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.wisata-card:hover, .hotel-card:hover, .kuliner-card:hover {
  transform: translateY(-5px);
}

.wisata-image, .hotel-image, .kuliner-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.wisata-card-content, .hotel-card-content, .kuliner-card-content {
  padding: 16px;
}

.wisata-card-content h3, .hotel-card-content h3, .kuliner-card-content h3 {
  color: white;
  margin-bottom: 8px;
  font-size: 1rem;
}

.wisata-card-content p, .kuliner-card-content p {
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.5;
}

.hotel-card-content p {
  color: #facc15;
  font-size: 12px;
}

/* Tombol Pesan Tiket */
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

/* Responsive */
@media (max-width: 768px) {
  .destinasi-hero {
    height: 350px;
  }
  
  .destinasi-hero-title {
    font-size: 1.5rem;
  }
  
  .rating-section {
    flex-direction: column;
  }
  
  .wisata-grid, .hotel-grid, .kuliner-grid {
    grid-template-columns: 1fr;
  }
  
  .slider-btn {
    width: 30px;
    height: 30px;
  }
}
`;