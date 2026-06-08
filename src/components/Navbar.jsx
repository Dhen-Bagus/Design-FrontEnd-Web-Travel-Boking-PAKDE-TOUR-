import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/pakde-tour-badge.png";
import { FaMapMarkedAlt, FaTags, FaInfoCircle, FaPhoneAlt, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // ============================================================
  // LOGIKA SCROLL NAVBAR
  // ============================================================
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ============================================================
  // FUNGSI LOGOUT
  // ============================================================
  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* ==================== LOGO ==================== */}
      <div className="navbar-logo">
        <img src={logo} alt="Pakde Tour" className="navbar-logo-img" />
        <div>
          <h1 className="navbar-title">PAKDE TOUR</h1>
          <p className="navbar-slogan">Nganter Sampai Tujuan</p>
        </div>
      </div>

      {/* ==================== MENU ==================== */}
      <div className="navbar-menu">
        <Link to="/destinations" className="navbar-link">
          <FaMapMarkedAlt size={14} />
          <span>Destinasi</span>
        </Link>
        <Link to="/promo" className="navbar-link">
          <FaTags size={14} />
          <span>Promo</span>
        </Link>
        <Link to="/about" className="navbar-link">
          <FaInfoCircle size={14} />
          <span>Tentang Kami</span>
        </Link>
        <Link to="/contact" className="navbar-link">
          <FaPhoneAlt size={14} />
          <span>Kontak</span>
        </Link>
      </div>

      {/* ==================== USER INFO & LOGOUT ==================== */}
      <div className="navbar-user">
        <div className="navbar-avatar">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Mas Bagus"
            className="navbar-avatar-img"
          />
        </div>
        <div>
          <div className="navbar-welcome">Selamat Datang</div>
          <div className="navbar-username">Mas Bagus 👋</div>
        </div>
        <button className="navbar-logout" onClick={handleLogout}>
          <FaSignOutAlt />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

// ============================================================
// ============================================================
// SEMUA STYLE ADA DI BAWAH INI
// ============================================================
// ============================================================

// ==================== STYLE NAVBAR ====================
const navbarStyles = `
/* ================================================================
   STYLE NAVBAR PAKDE TOUR
   ================================================================ */
.navbar {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  transition: all 0.3s ease;
  background-color: transparent;
  backdrop-filter: none;
  box-shadow: none;
}

/* Style saat scroll - HANYA BACKGROUND CARD SAJA YANG BERUBAH */
.navbar.scrolled {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(250, 204, 21, 0.15);
}

/* ==================== LOGO STYLES - UKURAN TETAP ==================== */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.navbar-logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.navbar-title {
  margin: 0;
  color: white;
  font-size: 20px;
  font-weight: 700;
  /* TIDAK BERUBAH SAAT SCROLL */
}

.navbar-slogan {
  margin: 0;
  color: #94a3b8;
  font-size: 14px;
  /* TIDAK BERUBAH SAAT SCROLL */
}

/* ==================== MENU STYLES - UKURAN TETAP ==================== */
.navbar-menu {
  display: flex;
  align-items: center;
  gap: 30px;
}

.navbar-link {
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 17px;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 8px 12px;
  border-radius: 8px;
  /* TIDAK BERUBAH SAAT SCROLL */
}

.navbar-link:hover {
  color: #facc15;
  background: rgba(250, 204, 21, 0.1);
}

/* HAPUS efek perubahan ukuran font saat scroll */
/* .navbar.scrolled .navbar-link { font-size: 15px; } - DIHAPUS */

/* ==================== USER INFO STYLES - UKURAN TETAP ==================== */
.navbar-user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 5px 12px 5px 8px;
  border-radius: 40px;
  transition: all 0.3s ease;
}

/* Background card muncul saat scroll */
.navbar.scrolled .navbar-user {
  background: rgba(255, 255, 255, 0.08);
}

.navbar-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #facc15;
}

.navbar-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.navbar-welcome {
  color: white;
  font-size: 11px;
  opacity: 0.8;
  /* TIDAK BERUBAH SAAT SCROLL */
}

.navbar-username {
  color: #facc15;
  font-size: 14px;
  font-weight: 700;
  /* TIDAK BERUBAH SAAT SCROLL */
}

/* ==================== LOGOUT BUTTON STYLES ==================== */
.navbar-logout {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #facc15;
  font-size: 16px;
  transition: all 0.3s ease;
}

.navbar-logout:hover {
  background: #ef4444;
  color: white;
  transform: scale(1.05);
}

/* Background card untuk logout button saat scroll */
.navbar.scrolled .navbar-logout {
  background: rgba(255, 255, 255, 0.15);
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 768px) {
  .navbar {
    padding: 0 15px;
    height: 60px;
  }
  
  .navbar-menu {
    gap: 5px;
  }
  
  .navbar-link span {
    display: none;
  }
  
  .navbar-link {
    font-size: 16px;
    padding: 8px 10px;
  }
  
  .navbar-user {
    gap: 8px;
    padding: 3px 8px 3px 5px;
  }
  
  /* Sembunyikan teks welcome dan username di mobile */
  .navbar-welcome,
  .navbar-username {
    display: none;
  }
  
  .navbar-logo-img {
    width: 30px;
    height: 30px;
  }
  
  .navbar-title {
    font-size: 14px;
  }
  
  .navbar-slogan {
    font-size: 10px;
  }
}
`;

// ==================== INJECT STYLES ====================
if (typeof document !== "undefined") {
  // Cek apakah style sudah ada sebelumnya
  if (!document.getElementById("navbar-styles")) {
    const styleTag = document.createElement("style");
    styleTag.id = "navbar-styles";
    styleTag.textContent = navbarStyles;
    document.head.appendChild(styleTag);
  }
}