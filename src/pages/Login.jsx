import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import heroBg from "../assets/images/hero-bg.png";
import logoText from "../assets/pakde-tour-logo-text.png";

import { FaPlaneDeparture, FaUserCheck } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "hadibagus21@gmail.com" && password === "dolanrek") {
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("userName", "Mas Bagus");
      navigate("/home");
    } else {
      alert("Email utawa Password salah rek 😅");
    }
  };

  const autoFill = () => {
    setEmail("hadibagus21@gmail.com");
    setPassword("dolanrek");
  };

  return (
    <div className="login-container">
      <div className="login-overlay" />
      <div className="login-content">
        {/* LEFT SIDE - TEKS JAWA */}
        <div className="login-left">
          <h1 className="login-title">
            Sugeng
            <br />
            Rawuh Rek! 👋
          </h1>
          <h2 className="login-subtitle">
            Dolan Sing Adoh,
            <br />
            Ning Ojo Lali Mulih Rek.
          </h2>
          <p className="login-description">
            Pakde Tour siap nganter perjalananmu keliling Indonesia. Pesawat,
            kereta, bus, hotel, kabeh ono rek!
          </p>
          <div className="login-quote">
            <h3 className="quote-text">
              "Urip iku Dolan, Yen Ora Dolan Yo Kerjo."
            </h3>
            <p className="quote-author">— Filosofi Pakde Tour</p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM LOGIN */}
        <div className="login-right">
          <form onSubmit={handleLogin} className="login-form">
            <div className="logo-area">
              <img src={logoText} alt="Pakde Tour" className="logo-image" />
              <p className="tagline">
                BERSAMA PAKDE TOUR AYO DOLAN.
              </p>
            </div>

            <h2 className="form-title">Mlebu Disik Rek ✈️</h2>
            <p className="form-subtitle">Banjur Gas Dolan Nang Endi Wae!</p>

            <button type="button" onClick={autoFill} className="auto-fill-btn">
              <FaUserCheck size={14} />
              Demo Login (Isi Otomatis)
            </button>

            <label className="input-label">Email</label>
            <input
              type="email"
              placeholder="Masukkan Email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="input-label">Password</label>
            <input
              type="password"
              placeholder="Masukkan Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">
              <FaPlaneDeparture size={14} />
              Masuk & Mulai Dolan
            </button>

            <p className="copyright">© 2026 Pakde Tour/ Design By Hadi Bagus Indrawan</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

// ============================================================
// ============================================================
// SEMUA STYLE ADA DI BAWAH INI (JARAK DIPERPEPET)
// ============================================================
// ============================================================

// ==================== STYLE LOGIN PAGE ====================
const loginStyles = `
/* ================================================================
   STYLE LOGIN PAKDE TOUR
   ================================================================ */

.login-container {
  min-height: 100vh;
  background-image: url(${heroBg});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.login-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
}

.login-content {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 40px;
}

/* ==================== LEFT SIDE STYLES ==================== */
.login-left {
  flex: 1;
  max-width: 480px;
  color: #fff;
}

.login-title {
  font-size: 42px;
  line-height: 1.2;
  margin-bottom: 12px;
  font-weight: 700;
}

.login-subtitle {
  color: #facc15;
  font-size: 24px;
  line-height: 1.3;
  margin-bottom: 12px;
  font-weight: 600;
  font-style: italic;
}

.login-description {
  font-size: 18px;
  line-height: 1.5;
  color: #e2e8f0;
  margin-bottom: 16px;
}

.login-quote {
  margin-top: 16px;
  padding: 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.quote-text {
  color: #facc15;
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: 500;
  font-style: italic;
}

.quote-author {
  color: #94a3b8;
  font-size: 16px;
}

/* ==================== RIGHT SIDE - FORM STYLES ==================== */
.login-form {
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  padding: 0 30px 16px 30px;  /* ← padding top = 0 */
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.logo-area {
  text-align: center;
  margin-bottom: 0;
  line-height: 1;
  padding-top: 0;
  margin-top: 0;
}

.logo-image {
  width: 350px;
  max-width: 100%;
  margin-bottom: 0;
  margin-top: 0;
  display: block;
}

.tagline {
  color: #facc15;
  font-weight: 500;
  font-size: 13px;
  margin-top: -4px;
  line-height: 1;
}

.form-title {
  text-align: center;
  color: #fff;
  font-size: 20px;
  margin-bottom: 2px;
  font-weight: 700;
  margin-top: 4px;
}

.form-subtitle {
  text-align: center;
  color: #cbd5e1;
  margin-bottom: 10px;
  font-size: 11px;
}

.auto-fill-btn {
  width: 100%;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  cursor: pointer;
  color: #facc15;
  font-size: 12px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.input-label {
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  margin-bottom: 3px;
  display: block;
}

.login-input {
  width: 100%;
  height: 38px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 12px;
  padding: 0 12px;
  box-sizing: border-box;
  outline: none;
  transition: all 0.3s ease;
  margin-bottom: 10px;
}

.login-btn {
  width: 100%;
  height: 42px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #0f172a;
  font-size: 13px;
  font-weight: 700;
  background: linear-gradient(135deg, #f59e0b, #facc15);
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 2px;
}

.copyright {
  text-align: center;
  margin-top: 10px;
  color: #94a3b8;
  font-size: 12px;
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 900px) {
  .login-content {
    flex-direction: column;
    padding: 40px 20px;
  }
  
  .login-left {
    text-align: center;
  }
  
  .login-title {
    font-size: 36px;
  }
  
  .login-subtitle {
    font-size: 20px;
  }
  
  .login-form {
    padding: 20px 24px;
  }
}
`;

if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.textContent = loginStyles;
  document.head.appendChild(styleTag);
}