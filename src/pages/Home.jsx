import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";
import {
  FaSearch,
  FaExchangeAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";

import heroBg from "../assets/images/hero-bg.png";

// ============================================================
// IMPORT GAMBAR UNTUK TAB MENU
// ============================================================
import planeImg from "../assets/images/plane.png";
import trainImg from "../assets/images/train.png";
import busImg from "../assets/images/bus.png";
import hotelImg from "../assets/images/hotel.png";

// ============================================================
// IMPORT GAMBAR DESTINASI
// ============================================================
import jakartaImg from "../assets/images/jakarta.png";
import bandungImg from "../assets/images/bandung.png";
import baliImg from "../assets/images/bali.png";
import yogyakartaImg from "../assets/images/yogyakarta.png";

// ============================================================
// IMPORT GAMBAR PROMO
// ============================================================
import garudaImg from "../assets/images/garuda.png";
import citilinkImg from "../assets/images/citilink.png";
import lionImg from "../assets/images/lion.png";

// ============================================================
// IMPORT GAMBAR TIKET INTERNASIONAL
// ============================================================
import singaporeImg from "../assets/images/singapore.png";
import kualaLumpurImg from "../assets/images/kuala_lumpur.png";
import bangkokImg from "../assets/images/bangkok.png";
import tokyoImg from "../assets/images/tokyo.png";
import seoulImg from "../assets/images/seoul.png";
import sydneyImg from "../assets/images/sydney.png";
import parisImg from "../assets/images/paris.png";
import newYorkImg from "../assets/images/new_york.png";

// ============================================================
// KOMPONEN UTAMA HOME
// ============================================================
function Home() {
  const navigate = useNavigate();

  // STATE UNTUK TAB YANG AKTIF
  const [activeTab, setActiveTab] = useState("Pesawat");

  // STATE UNTUK FORM HOTEL
  const [lokasi, setLokasi] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [tamu, setTamu] = useState("1 Dewasa");

  // STATE UNTUK FORM TRANSPORTASI
  const [kotaAsal, setKotaAsal] = useState("Jakarta");
  const [kotaTujuan, setKotaTujuan] = useState("Bali");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [penumpang, setPenumpang] = useState("1 Dewasa");

  // ============================================================
  // LOGIKA AUTO LOGIN & REDIRECT
  // ============================================================
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      navigate("/");
    }
  }, [navigate]);

  // ============================================================
  // FUNGSI SWAP KOTA ASAL & TUJUAN
  // ============================================================
  const handleSwap = () => {
    setKotaAsal(kotaTujuan);
    setKotaTujuan(kotaAsal);
  };

  // ============================================================
  // FUNGSI NAVIGASI KE HALAMAN TUJUAN
  // ============================================================
  const handleSearch = () => {
    if (activeTab === "Pesawat") {
      navigate("/flight", {
        state: {
          kotaAsal: kotaAsal,
          kotaTujuan: kotaTujuan,
          tanggal: tanggal,
          jam: jam,
          penumpang: penumpang,
        },
      });
    } else if (activeTab === "Kereta") {
      navigate("/train", {
        state: {
          kotaAsal: kotaAsal,
          kotaTujuan: kotaTujuan,
          tanggal: tanggal,
          jam: jam,
          penumpang: penumpang,
        },
      });
    } else if (activeTab === "Bus") {
      navigate("/bus", {
        state: {
          kotaAsal: kotaAsal,
          kotaTujuan: kotaTujuan,
          tanggal: tanggal,
          jam: jam,
          penumpang: penumpang,
        },
      });
    } else if (activeTab === "Hotel") {
      navigate("/hotel", {
        state: {
          lokasi: lokasi,
          checkIn: checkIn,
          checkOut: checkOut,
          tamu: tamu,
        },
      });
    }
  };

  // ============================================================
  // FUNGSI UNTUK DESTINASI FAVORIT
  // ============================================================
  const handleDestinasiClick = (destinasi) => {
    const routes = {
      Jakarta: "/destinasi/jakarta",
      Bandung: "/destinasi/bandung",
      Bali: "/destinasi/bali",
      Yogyakarta: "/destinasi/yogyakarta",
    };
    navigate(routes[destinasi]);
  };

  // ============================================================
  // RENDER FORM BERDASARKAN TAB YANG AKTIF
  // ============================================================
  const renderForm = () => {
    // FORM HOTEL
    if (activeTab === "Hotel") {
      return (
        <>
          <div className="form-grid">
            <div>
              <label className="booking-label">
                <FaMapMarkerAlt size={12} style={{ marginRight: "4px" }} />
                Lokasi / Kota / Destinasi
              </label>
              <input
                type="text"
                placeholder="Cth: Yogyakarta, Bali, Jakarta"
                className="booking-input"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
              />
            </div>
            <div>
              <label className="booking-label">
                <FaCalendarAlt size={12} style={{ marginRight: "4px" }} />
                Check-in
              </label>
              <input
                type="date"
                className="booking-input"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div>
              <label className="booking-label">
                <FaCalendarAlt size={12} style={{ marginRight: "4px" }} />
                Check-out
              </label>
              <input
                type="date"
                className="booking-input"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div>
              <label className="booking-label">
                <FaUser size={12} style={{ marginRight: "4px" }} />
                Tamu & Kamar
              </label>
              <select
                className="booking-input"
                value={tamu}
                onChange={(e) => setTamu(e.target.value)}
              >
                <option>1 Dewasa</option>
                <option>2 Dewasa</option>
                <option>3 Dewasa</option>
                <option>4 Dewasa</option>
                <option>1 Dewasa + 1 Anak</option>
                <option>2 Dewasa + 1 Anak</option>
                <option>2 Dewasa + 2 Anak</option>
              </select>
            </div>
          </div>
          <button className="search-btn" onClick={handleSearch}>
            <FaSearch size={14} />
            Cari Hotel Sekarang
          </button>
        </>
      );
    }

    // FORM KERETA & BUS (sama seperti pesawat)
    if (activeTab === "Kereta" || activeTab === "Bus") {
      const buttonText = activeTab === "Kereta" ? "Cari Tiket Kereta" : "Cari Tiket Bus";
      return (
        <>
          <div className="form-grid-swap">
            <div>
              <label className="booking-label">Kota Asal</label>
              <select
                className="booking-input"
                value={kotaAsal}
                onChange={(e) => setKotaAsal(e.target.value)}
              >
                <option>Jakarta</option>
                <option>Bandung</option>
                <option>Surabaya</option>
                <option>Yogyakarta</option>
                <option>Semarang</option>
              </select>
            </div>
            <button className="swap-btn" onClick={handleSwap}>
              <FaExchangeAlt />
            </button>
            <div>
              <label className="booking-label">Kota Tujuan</label>
              <select
                className="booking-input"
                value={kotaTujuan}
                onChange={(e) => setKotaTujuan(e.target.value)}
              >
                <option>Bali</option>
                <option>Lombok</option>
                <option>Bandung</option>
                <option>Yogyakarta</option>
                <option>Jakarta</option>
              </select>
            </div>
          </div>
          <div className="form-grid">
            <div>
              <label className="booking-label">Tanggal</label>
              <input
                type="date"
                className="booking-input"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
              />
            </div>
            <div>
              <label className="booking-label">Jam</label>
              <input
                type="time"
                className="booking-input"
                value={jam}
                onChange={(e) => setJam(e.target.value)}
              />
            </div>
            <div>
              <label className="booking-label">Penumpang</label>
              <select
                className="booking-input"
                value={penumpang}
                onChange={(e) => setPenumpang(e.target.value)}
              >
                <option>1 Dewasa</option>
                <option>2 Dewasa</option>
                <option>3 Dewasa</option>
                <option>4 Dewasa</option>
              </select>
            </div>
          </div>
          <button className="search-btn" onClick={handleSearch}>
            <FaSearch size={14} />
            {buttonText}
          </button>
        </>
      );
    }

    // DEFAULT: FORM PESAWAT
    return (
      <>
        <div className="form-grid-swap">
          <div>
            <label className="booking-label">Kota Asal</label>
            <select
              className="booking-input"
              value={kotaAsal}
              onChange={(e) => setKotaAsal(e.target.value)}
            >
              <option>Jakarta</option>
              <option>Bandung</option>
              <option>Surabaya</option>
              <option>Yogyakarta</option>
              <option>Semarang</option>
              <option>Medan</option>
              <option>Makassar</option>
            </select>
          </div>
          <button className="swap-btn" onClick={handleSwap}>
            <FaExchangeAlt />
          </button>
          <div>
            <label className="booking-label">Kota Tujuan</label>
            <select
              className="booking-input"
              value={kotaTujuan}
              onChange={(e) => setKotaTujuan(e.target.value)}
            >
              <option>Bali</option>
              <option>Lombok</option>
              <option>Bandung</option>
              <option>Yogyakarta</option>
              <option>Jakarta</option>
              <option>Surabaya</option>
            </select>
          </div>
        </div>
        <div className="form-grid">
          <div>
            <label className="booking-label">Tanggal</label>
            <input
              type="date"
              className="booking-input"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
            />
          </div>
          <div>
            <label className="booking-label">Jam</label>
            <input
              type="time"
              className="booking-input"
              value={jam}
              onChange={(e) => setJam(e.target.value)}
            />
          </div>
          <div>
            <label className="booking-label">Penumpang</label>
            <select
              className="booking-input"
              value={penumpang}
              onChange={(e) => setPenumpang(e.target.value)}
            >
              <option>1 Dewasa</option>
              <option>2 Dewasa</option>
              <option>3 Dewasa</option>
              <option>4 Dewasa</option>
            </select>
          </div>
        </div>
        <button className="search-btn" onClick={handleSearch}>
          <FaSearch size={14} />
          Cari Tiket Pesawat
        </button>
      </>
    );
  };

  // ============================================================
  // RENDER UTAMA
  // ============================================================
  return (
    <div className="home-container">
      {/* ==================== HERO SECTION ==================== */}
      <div className="hero-section">
        <div className="hero-overlay" />
        <Navbar />
        <div className="content-wrapper">
          {/* ==================== TEKS HERO ==================== */}
          <div className="hero-text-container">
            <span className="badge">Website booking liburan paling murah rek!</span>
            <h1 className="main-title">Sugeng Rawuh Rek!</h1>
            <h2 className="sub-title">
              Nganter Sampai Tujuan,
              <br />
              Ora Sampai Kuburan.
            </h2>
            <p className="description">
              Temukan tiket pesawat, kereta, bus dan hotel terbaik untuk
              perjalananmu ke seluruh Indonesia bersama Pakde Tour.
            </p>
          </div>

          {/* Header Cari */}
          <div className="search-header">
            <h1 className="search-title">Cari {activeTab}</h1>
            <p className="search-subtitle">
              Temukan penawaran terbaik untuk perjalananmu
            </p>
          </div>

          {/* Tab Menu */}
          <div className="tab-container">
            <button
              className={activeTab === "Pesawat" ? "tab-active" : "tab-btn"}
              onClick={() => setActiveTab("Pesawat")}
            >
              <img src={planeImg} alt="Pesawat" className="tab-icon" />
              <span>Pesawat</span>
            </button>
            <button
              className={activeTab === "Kereta" ? "tab-active" : "tab-btn"}
              onClick={() => setActiveTab("Kereta")}
            >
              <img src={trainImg} alt="Kereta" className="tab-icon" />
              <span>Kereta</span>
            </button>
            <button
              className={activeTab === "Bus" ? "tab-active" : "tab-btn"}
              onClick={() => setActiveTab("Bus")}
            >
              <img src={busImg} alt="Bus" className="tab-icon" />
              <span>Bus</span>
            </button>
            <button
              className={activeTab === "Hotel" ? "tab-active" : "tab-btn"}
              onClick={() => setActiveTab("Hotel")}
            >
              <img src={hotelImg} alt="Hotel" className="tab-icon" />
              <span>Hotel</span>
            </button>
          </div>

          {/* Form Dinamis */}
          {renderForm()}
        </div>
      </div>

      {/* ==================== DESTINASI FAVORIT ==================== */}
      <div className="destinasi-section">
        <div className="destinasi-container">
          <h2 className="destinasi-title">Destinasi Favorit Pakde ✈️</h2>
          <p className="destinasi-subtitle">
            Rek, iki destinasi sing paling laris manise!
          </p>
          <div className="destinasi-grid">
            {/* Jakarta Card */}
            <div className="destinasi-card" onClick={() => handleDestinasiClick("Jakarta")}>
              <img src={jakartaImg} alt="Jakarta" className="destinasi-image" />
              <div className="destinasi-content">
                <h3 className="destinasi-card-title">Jakarta</h3>
                <p className="destinasi-price">Mulai Rp450.000</p>
                <p className="destinasi-caption">💬 Mrono Rek, Ati-Ati Macet!</p>
              </div>
            </div>

            {/* Bandung Card */}
            <div className="destinasi-card" onClick={() => handleDestinasiClick("Bandung")}>
              <img src={bandungImg} alt="Bandung" className="destinasi-image" />
              <div className="destinasi-content">
                <h3 className="destinasi-card-title">Bandung</h3>
                <p className="destinasi-price">Mulai Rp350.000</p>
                <p className="destinasi-caption">💬 Adem, Enek, Lan Endah!</p>
              </div>
            </div>

            {/* Bali Card */}
            <div className="destinasi-card" onClick={() => handleDestinasiClick("Bali")}>
              <img src={baliImg} alt="Bali" className="destinasi-image" />
              <div className="destinasi-content">
                <h3 className="destinasi-card-title">Bali</h3>
                <p className="destinasi-price">Mulai Rp750.000</p>
                <p className="destinasi-caption">💬 Melali Rek, Ojo Kanti Kliangan KTP!</p>
              </div>
            </div>

            {/* Yogyakarta Card */}
            <div className="destinasi-card" onClick={() => handleDestinasiClick("Yogyakarta")}>
              <img src={yogyakartaImg} alt="Yogyakarta" className="destinasi-image" />
              <div className="destinasi-content">
                <h3 className="destinasi-card-title">Yogyakarta</h3>
                <p className="destinasi-price">Mulai Rp400.000</p>
                <p className="destinasi-caption">💬 Ojo Lali Tuku Bakpia, Rek!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      {/* ==================== TIKET PESAWAT INTERNASIONAL ==================== */}
      <div className="international-section">
        <div className="international-container">
          <h2 className="international-title">🌏 Tiket Pesawat Internasional</h2>
          <p className="international-subtitle">
            Gas dolan nang luar negeri, Rek! Diskon khusus kanggo sedulur Pakde!
          </p>
          <div className="international-grid">
            <div className="international-card">
              <img src={singaporeImg} alt="Singapore" className="international-image" />
              <h3>Singapore</h3>
              <p className="international-price">Mulai Rp850.000</p>
              <span className="international-promo">🔥 Hemat 100rb</span>
            </div>
            <div className="international-card">
              <img src={kualaLumpurImg} alt="Kuala Lumpur" className="international-image" />
              <h3>Kuala Lumpur</h3>
              <p className="international-price">Mulai Rp750.000</p>
              <span className="international-promo">🔥 Hemat 80rb</span>
            </div>
            <div className="international-card">
              <img src={bangkokImg} alt="Bangkok" className="international-image" />
              <h3>Bangkok</h3>
              <p className="international-price">Mulai Rp950.000</p>
              <span className="international-promo">🔥 Hemat 120rb</span>
            </div>
            <div className="international-card">
              <img src={tokyoImg} alt="Tokyo" className="international-image" />
              <h3>Tokyo</h3>
              <p className="international-price">Mulai Rp2.500.000</p>
              <span className="international-promo">💥 Diskon 15%</span>
            </div>
            <div className="international-card">
              <img src={seoulImg} alt="Seoul" className="international-image" />
              <h3>Seoul</h3>
              <p className="international-price">Mulai Rp2.200.000</p>
              <span className="international-promo">💥 Diskon 10%</span>
            </div>
            <div className="international-card">
              <img src={sydneyImg} alt="Sydney" className="international-image" />
              <h3>Sydney</h3>
              <p className="international-price">Mulai Rp3.000.000</p>
              <span className="international-promo">✨ Diskon 20%</span>
            </div>
            <div className="international-card">
              <img src={parisImg} alt="Paris" className="international-image" />
              <h3>Paris</h3>
              <p className="international-price">Mulai Rp4.500.000</p>
              <span className="international-promo">🎉 Flash Sale!</span>
            </div>
            <div className="international-card">
              <img src={newYorkImg} alt="New York" className="international-image" />
              <h3>New York</h3>
              <p className="international-price">Mulai Rp5.500.000</p>
              <span className="international-promo">⭐ Best Deal</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== PROMO MASKAPAI ==================== */}
      <div className="promo-section">
        <div className="promo-container">
          <h2 className="promo-title">Promo Spesial 🔥</h2>
          <p className="promo-subtitle">
            Mumpung Murah, Rek! Ojo Sampe Ketinggalan
          </p>
          <div className="promo-grid">
            <div className="promo-card">
              <img src={garudaImg} alt="Garuda" className="promo-image" />
              <h3 className="promo-card-title">Garuda Indonesia</h3>
              <p className="promo-discount">Diskon hingga 30%</p>
              <p className="promo-caption">💬 Terbang Kaya Sultan, Nanging Hemat Rek!</p>
            </div>
            <div className="promo-card">
              <img src={citilinkImg} alt="Citilink" className="promo-image" />
              <h3 className="promo-card-title">Citilink</h3>
              <p className="promo-discount">Promo hemat akhir pekan</p>
              <p className="promo-caption">💬 Rek, Iki Lagi Murah-Murahe!</p>
            </div>
            <div className="promo-card">
              <img src={lionImg} alt="Lion Air" className="promo-image" />
              <h3 className="promo-card-title">Lion Air</h3>
              <p className="promo-discount">Mulai Rp399.000</p>
              <p className="promo-caption">💬 Tepati Janji, Ning Ojo Telat Rek!</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
// SEMUA STYLE
const globalStyles = `
/* ================================================================
   STYLE UTAMA HOME
   ================================================================ */
.home-container {
  position: relative;
  min-height: 100vh;
}

/* ==================== HERO SECTION STYLES ==================== */
.hero-section {
  position: relative;
  min-height: 100vh;
  background-image: url(${heroBg});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
}

.content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 40px 80px;
}

/* ==================== HERO TEXT STYLES ==================== */
.hero-text-container {
  text-align: center;
  color: #fff;
  margin-bottom: 50px;
}

.badge {
  display: inline-block;
  padding: 8px 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  margin-bottom: 20px;
  font-size: 16px;
}

.main-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 10px;
}

.sub-title {
  font-size: 1.5rem;
  color: #facc15;
  margin-bottom: 10px;
  font-weight: 600;
}

.description {
  max-width: 700px;
  margin: 0 auto;
  margin-bottom: 0px;
  font-size: 18px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

/* ==================== SEARCH HEADER STYLES ==================== */
.search-header {
  margin-bottom: 20px;
}

.search-title {
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6px;
}

.search-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin-bottom: 20px;
}

/* ==================== TAB MENU STYLES ==================== */
.tab-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 30px;
}

.tab-active {
  background: #f59e0b;
  color: #0f172a;
  border: none;
  padding: 6px 12px;
  border-radius: 40px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  height: 44px;
}

.tab-btn {
  background: rgba(255, 255, 255, 0.12);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 40px;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  height: 44px;
}

.tab-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

/* ==================== FORM STYLES ==================== */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  align-items: end;
}

.form-grid-swap {
  display: grid;
  grid-template-columns: 1fr 50px 1fr;
  gap: 12px;
  align-items: end;
  margin-bottom: 12px;
}

.booking-label {
  color: white;
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 500;
}

.booking-input {
  width: 100%;
  height: 48px;
  background: white;
  border-radius: 12px;
  border: none;
  padding: 0 14px;
  font-size: 14px;
  outline: none;
}

.swap-btn {
  height: 48px;
  width: 48px;
  border: none;
  border-radius: 12px;
  background: #f59e0b;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 24px;
}

.search-btn {
  width: 100%;
  margin-top: 20px;
  border: none;
  height: 52px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  cursor: pointer;
  background: #f59e0b;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

/* ==================== DESTINASI STYLES ==================== */
.destinasi-section {
  background: linear-gradient(180deg, #0f172a 0%, #070b17 100%);
  padding: 60px 40px;
}

.destinasi-container {
  max-width: 1200px;
  margin: auto;
}

.destinasi-title {
  text-align: center;
  color: #fff;
  font-size: 2rem;
  margin-bottom: 10px;
}

.destinasi-subtitle {
  text-align: center;
  color: #94a3b8;
  margin-bottom: 40px;
  font-size: 14px;
}

.destinasi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
}

.destinasi-card {
  background: #1e293b;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

/* EFEK HOVER */
.destinasi-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(250, 204, 21, 0.4);
}

.destinasi-card:hover .destinasi-image {
  transform: scale(1.05);
}

.destinasi-card:hover .destinasi-card-title {
  color: #facc15;
}

.destinasi-card:hover .destinasi-price {
  transform: translateX(5px);
}

.destinasi-card:hover .destinasi-caption {
  color: #cbd5e1;
}

.destinasi-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.4s ease-in-out;
}

.destinasi-content {
  padding: 20px;
  transition: all 0.3s ease;
}

.destinasi-card-title {
  color: #fff;
  font-size: 18px;
  margin-bottom: 5px;
  transition: color 0.3s ease;
}

.destinasi-price {
  color: #facc15;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
  transition: transform 0.3s ease;
}

.destinasi-caption {
  color: #94a3b8;
  font-size: 14px;
  font-style: italic;
  transition: color 0.3s ease;
}

/* ==================== TIKET PESAWAT INTERNASIONAL STYLES ==================== */
.international-section {
  background: linear-gradient(135deg, #0f172a 0%, #1a2a3a 100%);
  padding: 30px 40px;
}

.international-container {
  max-width: 1200px;
  margin: auto;
}

.international-title {
  text-align: center;
  color: #facc15;
  font-size: 2rem;
  margin-bottom: 10px;
}

.international-subtitle {
  text-align: center;
  color: #94a3b8;
  margin-bottom: 40px;
  font-size: 14px;
}

.international-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.international-card {
  background: #1e293b;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(250, 204, 21, 0.1);
}

.international-card:hover {
  transform: translateY(-5px);
  background: #2d3a4e;
  border-color: rgba(250, 204, 21, 0.3);
}

.international-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.international-card h3 {
  color: white;
  font-size: 1.1rem;
  margin-top: 12px;
  margin-bottom: 4px;
  padding: 0 15px;
}

.international-price {
  color: #facc15;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 8px;
  padding: 0 15px;
}

.international-promo {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  display: inline-block;
  margin: 0 15px 15px 15px;
}

/* ==================== PROMO STYLES ==================== */
.promo-section {
  background: #111827;
  padding: 30px 40px;
}

.promo-container {
  max-width: 1200px;
  margin: auto;
}

.promo-title {
  text-align: center;
  color: #fff;
  font-size: 2rem;
  margin-bottom: 10px;
}

.promo-subtitle {
  text-align: center;
  color: #94a3b8;
  margin-bottom: 40px;
  font-size: 14px;
}

.promo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.promo-card {
  background: #1f2937;
  border-radius: 20px;
  padding: 25px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.promo-card:hover {
  transform: translateY(-5px);
}

.promo-image {
  height: 80px;
  object-fit: contain;
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 16px;
}

.promo-card-title {
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.promo-discount {
  color: #facc15;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 10px;
}

.promo-caption {
  color: #94a3b8;
  font-size: 12px;
  font-style: italic;
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 100px 20px 40px;
  }
  
  .main-title {
    font-size: 28px;
  }
  
  .sub-title {
    font-size: 1.2rem;
  }
  
  .description {
    font-size: 14px;
  }
  
  .tab-container {
    gap: 8px;
  }
  
  .tab-active, .tab-btn {
    padding: 4px 8px;
    font-size: 11px;
    height: 36px;
  }
  
  .tab-icon {
    width: 20px;
    height: 20px;
  }
  
  .international-grid {
    grid-template-columns: 1fr;
  }
}
`;

// ==================== INJECT GLOBAL STYLES ====================
if (typeof document !== "undefined") {
  // Hapus style lama jika ada untuk menghindari duplikasi
  const oldStyle = document.getElementById("home-styles");
  if (oldStyle) {
    oldStyle.remove();
  }
  const styleTag = document.createElement("style");
  styleTag.id = "home-styles";
  styleTag.textContent = globalStyles;
  document.head.appendChild(styleTag);
}