import { Link } from "react-router-dom";
import heroBg from "../assets/images/hero-bg.png";
import logoText from "../assets/pakde-tour-logo-text.png";
import { FaPlaneDeparture, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Register() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.75))",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <form
          style={{
            width: "100%",
            maxWidth: "520px",
            background: "rgba(255,255,255,.08)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: "35px",
            padding: "50px",
            boxShadow: "0 25px 60px rgba(0,0,0,.4)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "35px" }}>
            <img
              src={logoText}
              alt="Pakde Tour"
              style={{
                width: "280px",
                marginBottom: "20px",
              }}
            />
            <p
              style={{
                color: "#facc15",
                fontWeight: "700",
                fontSize: "20px",
              }}
            >
              Nganter Sampai Tujuan, Ora Sampai Kuburan.
            </p>
          </div>

          <h2
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: "42px",
              marginBottom: "10px",
            }}
          >
            Ndaftar Rek! 📝
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#cbd5e1",
              marginBottom: "35px",
              fontSize: "16px",
            }}
          >
            Gas dolan, daftar disik rek!
          </p>

          <label style={{ color: "#fff", fontWeight: "700" }}>Nama Lengkap</label>
          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Masukkan Nama"
              style={{
                width: "100%",
                height: "55px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,.15)",
                background: "rgba(255,255,255,.08)",
                color: "#fff",
                fontSize: "16px",
                padding: "0 20px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <label style={{ color: "#fff", fontWeight: "700" }}>Email</label>
          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
            <input
              type="email"
              placeholder="Masukkan Email"
              style={{
                width: "100%",
                height: "55px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,.15)",
                background: "rgba(255,255,255,.08)",
                color: "#fff",
                fontSize: "16px",
                padding: "0 20px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <label style={{ color: "#fff", fontWeight: "700" }}>Password</label>
          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Masukkan Password"
              style={{
                width: "100%",
                height: "55px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,.15)",
                background: "rgba(255,255,255,.08)",
                color: "#fff",
                fontSize: "16px",
                padding: "0 20px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <label style={{ color: "#fff", fontWeight: "700" }}>Konfirmasi Password</label>
          <div style={{ marginTop: "10px", marginBottom: "30px" }}>
            <input
              type="password"
              placeholder="Konfirmasi Password"
              style={{
                width: "100%",
                height: "55px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,.15)",
                background: "rgba(255,255,255,.08)",
                color: "#fff",
                fontSize: "16px",
                padding: "0 20px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              height: "60px",
              border: "none",
              borderRadius: "18px",
              cursor: "pointer",
              color: "#fff",
              fontSize: "20px",
              fontWeight: "800",
              background: "linear-gradient(135deg,#f59e0b,#facc15)",
              boxShadow: "0 15px 30px rgba(245,158,11,.4)",
            }}
          >
            <FaUser style={{ marginRight: "10px" }} />
            Daftar Sekarang
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "25px",
              color: "#cbd5e1",
            }}
          >
            Wis nduwe akun?{" "}
            <Link to="/" style={{ color: "#facc15", textDecoration: "none" }}>
              Mlebu Rek!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;