import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FaPlane, FaUser, FaIdCard, FaCalendarAlt, FaMoneyBillWave, FaTag, 
  FaArrowLeft, FaCheckCircle, FaChild, FaBaby, FaPhone, FaEnvelope, 
  FaBirthdayCake, FaVenusMars, FaChair, FaSuitcase, FaShieldAlt, 
  FaCheckSquare, FaSquare, FaWindowMaximize, FaBed, FaClock
} from "react-icons/fa";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { GiAirplane } from "react-icons/gi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FormBookingTiketPesawat() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // ========== PERUBAHAN: Ambil data tanggal dari Flight.jsx ==========
  const { 
    selectedFlight, 
    kotaAsal, 
    kotaTujuan, 
    tanggalBerangkat,     // <-- TAMBAHAN
    tanggalPulang,        // <-- TAMBAHAN
    jenisPenerbangan,     // <-- TAMBAHAN
    penumpang: penumpangDariFlight 
  } = location.state || {};

  const [penumpang, setPenumpang] = useState({ dewasa: 1, anak: 0, bayi: 0 });
  const [showSeatMap, setShowSeatMap] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState({});

  const [formData, setFormData] = useState({
    nik: "", namaLengkap: "", tanggalLahir: "", jenisKelamin: "",
    noHp: "", email: "", pilihKursi: "checkin", bagasiTambahan: "none",
    asuransi: false, setuju: false
  });

  const [errors, setErrors] = useState({});

  const hargaDasar = selectedFlight?.hargaPromo || 550000;
  const hargaDewasa = hargaDasar;
  const hargaAnak = Math.floor(hargaDasar * 0.75);
  const hargaBayi = Math.floor(hargaDasar * 0.1);
  const biayaBagasi = { none: 0, "20kg": 50000, "30kg": 100000 };
  
  const totalPenumpang = penumpang.dewasa + penumpang.anak + penumpang.bayi;
  const biayaPilihKursi = formData.pilihKursi === "now" ? 25000 : 0;
  const biayaAsuransi = formData.asuransi ? 25000 : 0;
  const totalTiket = (penumpang.dewasa * hargaDewasa) + (penumpang.anak * hargaAnak) + (penumpang.bayi * hargaBayi);
  const totalBiaya = totalTiket + (biayaBagasi[formData.bagasiTambahan] * totalPenumpang) + (biayaPilihKursi * totalPenumpang) + biayaAsuransi;

  // Data kursi pesawat
  const seats = [
    { id: "1A", row: 1, col: "A", status: "available", type: "window" },
    { id: "1B", row: 1, col: "B", status: "available", type: "middle" },
    { id: "1C", row: 1, col: "C", status: "available", type: "middle" },
    { id: "1D", row: 1, col: "D", status: "available", type: "window" },
    { id: "2A", row: 2, col: "A", status: "available", type: "window" },
    { id: "2B", row: 2, col: "B", status: "available", type: "middle" },
    { id: "2C", row: 2, col: "C", status: "available", type: "middle" },
    { id: "2D", row: 2, col: "D", status: "available", type: "window" },
    { id: "3A", row: 3, col: "A", status: "booked", type: "window" },
    { id: "3B", row: 3, col: "B", status: "available", type: "middle" },
    { id: "3C", row: 3, col: "C", status: "available", type: "middle" },
    { id: "3D", row: 3, col: "D", status: "available", type: "window" },
    { id: "4A", row: 4, col: "A", status: "available", type: "window" },
    { id: "4B", row: 4, col: "B", status: "available", type: "middle" },
    { id: "4C", row: 4, col: "C", status: "available", type: "middle" },
    { id: "4D", row: 4, col: "D", status: "available", type: "window" },
    { id: "5A", row: 5, col: "A", status: "available", type: "window" },
    { id: "5B", row: 5, col: "B", status: "available", type: "middle" },
    { id: "5C", row: 5, col: "C", status: "available", type: "middle" },
    { id: "5D", row: 5, col: "D", status: "available", type: "window" },
  ];

  useEffect(() => {
    if (!selectedFlight) navigate("/flight");
  }, [selectedFlight, navigate]);

  // ========== TAMBAHAN: Fungsi format tanggal ke Indonesia ==========
  const formatTanggalIndonesia = (tanggal) => {
    if (!tanggal) return "Belum pilih tanggal";
    const parts = tanggal.split("-");
    if (parts.length !== 3) return tanggal;
    const bulan = {
      "01": "Januari", "02": "Februari", "03": "Maret", "04": "April",
      "05": "Mei", "06": "Juni", "07": "Juli", "08": "Agustus",
      "09": "September", "10": "Oktober", "11": "November", "12": "Desember"
    };
    return `${parts[2]} ${bulan[parts[1]]} ${parts[0]}`;
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency", currency: "IDR", minimumFractionDigits: 0
    }).format(angka);
  };

  const updatePenumpang = (jenis, operasi) => {
    setPenumpang(prev => ({
      ...prev,
      [jenis]: operasi === "increment" ? prev[jenis] + 1 : Math.max(0, prev[jenis] - 1)
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "nik") {
      const newValue = value.replace(/\D/g, "").slice(0, 16);
      setFormData({ ...formData, [name]: newValue });
      if (errors[name]) setErrors({ ...errors, [name]: "" });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
      if (errors[name]) setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSeatSelect = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat.status === "booked") return;
    
    setSelectedSeats(prev => {
      const newSeats = { ...prev };
      if (newSeats[seatId]) {
        delete newSeats[seatId];
      } else {
        if (Object.keys(newSeats).length < totalPenumpang) {
          newSeats[seatId] = seat;
        } else {
          alert(`Maksimal pilih ${totalPenumpang} kursi sesuai jumlah penumpang`);
        }
      }
      return newSeats;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nik || formData.nik.length !== 16) newErrors.nik = "NIK harus 16 digit angka";
    if (!formData.namaLengkap || formData.namaLengkap.length < 3) newErrors.namaLengkap = "Nama lengkap minimal 3 karakter";
    if (!formData.tanggalLahir) newErrors.tanggalLahir = "Tanggal lahir wajib diisi";
    if (!formData.jenisKelamin) newErrors.jenisKelamin = "Jenis kelamin wajib diisi";
    if (!formData.noHp) newErrors.noHp = "Nomor HP wajib diisi";
    if (!formData.email) newErrors.email = "Email wajib diisi";
    if (!formData.setuju) newErrors.setuju = "Harus menyetujui syarat & ketentuan";
    
    if (formData.pilihKursi === "now" && Object.keys(selectedSeats).length !== totalPenumpang) {
      newErrors.kursi = `Pilih ${totalPenumpang} kursi untuk semua penumpang`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      const bookingData = {
        ...formData, penumpang, totalPenumpang, totalBiaya,
        selectedSeats: Object.values(selectedSeats),
        rincian: {
          hargaDewasa, hargaAnak, hargaBayi, totalTiket,
          biayaBagasi: biayaBagasi[formData.bagasiTambahan] * totalPenumpang,
          biayaKursi: biayaPilihKursi * totalPenumpang, biayaAsuransi
        },
        maskapai: selectedFlight.maskapai, logo: selectedFlight.logo,
        bandaraKeberangkatan: selectedFlight.bandaraKeberangkatan,
        bandaraTujuan: selectedFlight.bandaraTujuan,
        kotaAsal: kotaAsal || "Jakarta", kotaTujuan: kotaTujuan || "Bali",
        // ========== PERUBAHAN: Gunakan tanggal dari Flight.jsx ==========
        tanggalBerangkat: tanggalBerangkat,
        tanggalPulang: tanggalPulang,
        jenisPenerbangan: jenisPenerbangan || "oneway",
        jamBerangkat: selectedFlight.jamBerangkat, jamTiba: selectedFlight.jamTiba,
        harga: selectedFlight.hargaPromo, hargaAsli: selectedFlight.harga,
        promo: selectedFlight.promo, kelas: selectedFlight.kelas,
        kodeBooking: "TIX" + Math.floor(Math.random() * 1000000)
      };
      
      const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      existingBookings.push({ ...bookingData, bookingDate: new Date().toISOString() });
      localStorage.setItem("bookings", JSON.stringify(existingBookings));
      navigate("/tiket-pesawat", { state: { bookingData } });
    }
  };

  if (!selectedFlight) {
    return (
      <div className="form-booking-page">
        <Navbar />
        <div className="loading-content"><GiAirplane className="loading-icon" /><h2>Memuat data...</h2></div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="form-booking-page">
      <Navbar />
      <div className="form-booking-content">
        <div className="form-booking-container">
          {/* HEADER */}
          <div className="airline-header">
            <img src={selectedFlight.logo} alt={selectedFlight.maskapai} className="airline-logo-large" />
            <h2>{selectedFlight.maskapai}</h2>
            <div className="flight-route-badge"><FaPlane /> {kotaAsal || "Jakarta"} → {kotaTujuan || "Bali"}</div>
          </div>

          <h1 className="form-title"><FaIdCard /> Form Data Diri Penumpang</h1>
          
          {/* ========== INFO PENERBANGAN - DIPERBAHARUI DENGAN TANGGAL ========== */}
          <div className="flight-info-summary">
            <div className="info-row">
              <span className="info-label"><GiAirplane /> Nama Pesawat :</span>
              <span className="info-value">{selectedFlight.maskapai}</span>
            </div>
            <div className="info-row">
              <span className="info-label"><MdFlightTakeoff /> Bandara - Tujuan :</span>
              <span className="info-value">{selectedFlight.bandaraKeberangkatan} → {selectedFlight.bandaraTujuan}</span>
            </div>
            
            {/* TANGGAL BERANGKAT */}
            <div className="info-row">
              <span className="info-label"><FaCalendarAlt /> Tanggal Berangkat :</span>
              <span className="info-value">{formatTanggalIndonesia(tanggalBerangkat)}</span>
            </div>
            
            {/* TANGGAL PULANG (jika pulang pergi) */}
            {jenisPenerbangan === "roundtrip" && tanggalPulang && (
              <div className="info-row">
                <span className="info-label"><FaCalendarAlt /> Tanggal Pulang :</span>
                <span className="info-value">{formatTanggalIndonesia(tanggalPulang)}</span>
              </div>
            )}
            
            {/* JAM KEBERANGKATAN */}
            <div className="info-row">
              <span className="info-label"><FaClock /> Jam Keberangkatan :</span>
              <span className="info-value">{selectedFlight.jamBerangkat} - {selectedFlight.jamTiba}</span>
            </div>
            
            {/* JENIS PENERBANGAN */}
            <div className="info-row">
              <span className="info-label"><FaPlane /> Jenis Penerbangan :</span>
              <span className="info-value">{jenisPenerbangan === "roundtrip" ? "Pulang Pergi" : "Sekali Jalan"}</span>
            </div>
            
            <div className="info-row price-info">
              <span className="info-label"><FaMoneyBillWave /> Harga Dasar :</span>
              <span className="info-value">
                <span className="old-price-summary">{formatRupiah(selectedFlight.harga)}</span>
                <span className="new-price-summary">{formatRupiah(selectedFlight.hargaPromo)}</span>
                <span className="promo-badge-summary"><FaTag /> {selectedFlight.promo}</span>
              </span>
            </div>
          </div>

          {/* JUMLAH PENUMPANG */}
          <div className="section-card">
            <h3><FaUser /> Jumlah Penumpang</h3>
            <div className="penumpang-item"><div className="penumpang-label"><FaUser /> Dewasa <span className="harga-label">({formatRupiah(hargaDewasa)}/org)</span></div><div className="counter"><button onClick={() => updatePenumpang("dewasa", "decrement")}>-</button><span>{penumpang.dewasa}</span><button onClick={() => updatePenumpang("dewasa", "increment")}>+</button></div></div>
            <div className="penumpang-item"><div className="penumpang-label"><FaChild /> Anak <span className="harga-label">({formatRupiah(hargaAnak)}/org) Diskon 25%</span></div><div className="counter"><button onClick={() => updatePenumpang("anak", "decrement")}>-</button><span>{penumpang.anak}</span><button onClick={() => updatePenumpang("anak", "increment")}>+</button></div></div>
            <div className="penumpang-item"><div className="penumpang-label"><FaBaby /> Bayi <span className="harga-label">({formatRupiah(hargaBayi)}/org) Diskon 90%</span></div><div className="counter"><button onClick={() => updatePenumpang("bayi", "decrement")}>-</button><span>{penumpang.bayi}</span><button onClick={() => updatePenumpang("bayi", "increment")}>+</button></div></div>
            <div className="total-penumpang">Total: <strong>{totalPenumpang} Orang</strong></div>
          </div>

          {/* FORM DATA DIRI */}
          <div className="section-card">
            <h3><FaIdCard /> Data Penumpang Utama</h3>
            <div className="form-group"><label>NIK (16 digit) *</label><input type="text" name="nik" value={formData.nik} onChange={handleChange} maxLength="16" placeholder="Masukkan 16 digit NIK" className={errors.nik ? "error-input" : ""} />{errors.nik && <span className="error-message">{errors.nik}</span>}<small>Nomor Induk Kependudukan (16 digit angka)</small></div>
            <div className="form-group"><label>Nama Lengkap *</label><input type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} placeholder="Masukkan nama lengkap sesuai KTP" className={errors.namaLengkap ? "error-input" : ""} />{errors.namaLengkap && <span className="error-message">{errors.namaLengkap}</span>}</div>
            
            <div className="form-row">
              <div className="form-group"><label><FaBirthdayCake /> Tanggal Lahir *</label><input type="date" name="tanggalLahir" value={formData.tanggalLahir} onChange={handleChange} className={errors.tanggalLahir ? "error-input" : ""} />{errors.tanggalLahir && <span className="error-message">{errors.tanggalLahir}</span>}</div>
              <div className="form-group"><label><FaVenusMars /> Jenis Kelamin *</label><div className="radio-group"><label><input type="radio" name="jenisKelamin" value="Laki-laki" onChange={handleChange} /> Laki-laki</label><label><input type="radio" name="jenisKelamin" value="Perempuan" onChange={handleChange} /> Perempuan</label></div>{errors.jenisKelamin && <span className="error-message">{errors.jenisKelamin}</span>}</div>
            </div>
            
            <div className="form-row">
              <div className="form-group"><label><FaPhone /> Nomor HP/WA *</label><input type="tel" name="noHp" value={formData.noHp} onChange={handleChange} placeholder="081234567890" className={errors.noHp ? "error-input" : ""} />{errors.noHp && <span className="error-message">{errors.noHp}</span>}</div>
              <div className="form-group"><label><FaEnvelope /> Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="nama@gmail.com" className={errors.email ? "error-input" : ""} />{errors.email && <span className="error-message">{errors.email}</span>}</div>
            </div>
          </div>

          {/* PENGATURAN TAMBAHAN */}
          <div className="section-card">
            <h3>Pengaturan Tambahan</h3>
            
            <div className="form-group">
              <label><FaChair /> Pilih Kursi</label>
              <div className="radio-group">
                <label><input type="radio" name="pilihKursi" value="checkin" checked={formData.pilihKursi === "checkin"} onChange={handleChange} /> Nanti saat check-in (gratis)</label>
                <label><input type="radio" name="pilihKursi" value="now" checked={formData.pilihKursi === "now"} onChange={() => { setFormData({...formData, pilihKursi: "now"}); setShowSeatMap(true); }} /> Pilih sekarang (+{formatRupiah(25000)}/orang)</label>
              </div>
            </div>

            {formData.pilihKursi === "now" && (
              <div className="seat-map-container">
                <div className="seat-map-header">
                  <h4>Pilih Kursi Pesawat</h4>
                  <p>Kursi terpilih: {Object.keys(selectedSeats).length} / {totalPenumpang}</p>
                  <div className="seat-legend">
                    <span><div className="legend-box available"></div> Tersedia</span>
                    <span><div className="legend-box selected"></div> Dipilih</span>
                    <span><div className="legend-box booked"></div> Terisi</span>
                    <span><div className="legend-box window"></div> Jendela</span>
                  </div>
                </div>
                
                <div className="seat-map">
                  <div className="plane-front">
                    <div className="cockpit">✈️ KOKPIT</div>
                    <div className="galley">🚽 GALLEY</div>
                  </div>
                  {[1,2,3,4,5].map(row => (
                    <div key={row} className="seat-row">
                      <div className="row-number">{row}</div>
                      {["A","B","C","D"].map(col => {
                        const seatId = `${row}${col}`;
                        const seat = seats.find(s => s.id === seatId);
                        const isSelected = selectedSeats[seatId];
                        return (
                          <button
                            key={seatId}
                            className={`seat ${seat.status} ${isSelected ? "selected" : ""} ${seat.type}`}
                            onClick={() => handleSeatSelect(seatId)}
                            disabled={seat.status === "booked"}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                  <div className="plane-tail">🚽 TOILET</div>
                </div>
                {errors.kursi && <span className="error-message">{errors.kursi}</span>}
              </div>
            )}

            <div className="form-group">
              <label><FaSuitcase /> Tambah Bagasi</label>
              <div className="radio-group">
                <label><input type="radio" name="bagasiTambahan" value="none" checked={formData.bagasiTambahan === "none"} onChange={handleChange} /> Tidak ada</label>
                <label><input type="radio" name="bagasiTambahan" value="20kg" checked={formData.bagasiTambahan === "20kg"} onChange={handleChange} /> 20kg (+{formatRupiah(50000)}/orang)</label>
                <label><input type="radio" name="bagasiTambahan" value="30kg" checked={formData.bagasiTambahan === "30kg"} onChange={handleChange} /> 30kg (+{formatRupiah(100000)}/orang)</label>
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="asuransi" checked={formData.asuransi} onChange={handleChange} />
                <FaShieldAlt /> Tambah Asuransi Perjalanan (+{formatRupiah(25000)})
              </label>
            </div>
          </div>

          {/* RINCIAN BIAYA */}
          <div className="section-card">
            <h3>Rincian Biaya</h3>
            <div className="rincian-item"><span>Tiket ({totalPenumpang} orang)</span><span>{formatRupiah(totalTiket)}</span></div>
            {biayaBagasi[formData.bagasiTambahan] * totalPenumpang > 0 && <div className="rincian-item"><span>Bagasi ({formData.bagasiTambahan}) x{totalPenumpang}</span><span>{formatRupiah(biayaBagasi[formData.bagasiTambahan] * totalPenumpang)}</span></div>}
            {biayaPilihKursi * totalPenumpang > 0 && <div className="rincian-item"><span>Pilih kursi x{totalPenumpang}</span><span>{formatRupiah(biayaPilihKursi * totalPenumpang)}</span></div>}
            {biayaAsuransi > 0 && <div className="rincian-item"><span>Asuransi</span><span>{formatRupiah(biayaAsuransi)}</span></div>}
            <div className="rincian-total"><span>Total Pembayaran</span><span>{formatRupiah(totalBiaya)}</span></div>
          </div>

          {/* KONFIRMASI */}
          <div className="section-card">
            <label className="checkbox-label confirm-label">
              <input type="checkbox" name="setuju" checked={formData.setuju} onChange={handleChange} />
              {formData.setuju ? <FaCheckSquare /> : <FaSquare />}
              Saya menyatakan bahwa data yang diisi benar dan setuju dengan syarat & ketentuan
            </label>
            {errors.setuju && <span className="error-message">{errors.setuju}</span>}
          </div>

          {/* TOMBOL */}
          <div className="form-buttons">
            <button className="cancel-btn" onClick={() => navigate("/flight")}><FaArrowLeft /> Kembali</button>
            <button className="confirm-btn" onClick={handleConfirm}><FaCheckCircle /> Konfirmasi & Lanjut ke Tiket</button>
          </div>
        </div>
      </div>
      <Footer />

      <style>{`
        .form-booking-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a, #1e293b);
        }

        .loading-content {
          text-align: center;
          padding: 200px 20px;
          color: white;
        }

        .loading-icon {
          font-size: 50px;
          color: #facc15;
          animation: spin 2s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .form-booking-content {
          max-width: 700px;
          margin: 0 auto;
          padding: 100px 20px 60px;
        }

        .form-booking-container {
          background: #1e293b;
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 20px 35px -10px rgba(0,0,0,0.3);
        }

        .airline-header {
          text-align: center;
          border-bottom: 1px solid #334155;
          padding-bottom: 20px;
          margin-bottom: 25px;
        }

        .airline-logo-large {
          width: 200px;
          height: 80px;
          object-fit: contain;
          background: white;
          border-radius: 16px;
          padding: 10px;
          margin-bottom: 10px;
        }

        .airline-header h2 {
          color: white;
          margin: 10px 0 5px;
        }

        .flight-route-badge {
          background: #facc1520;
          color: #facc15;
          padding: 5px 12px;
          border-radius: 30px;
          font-size: 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .form-title {
          color: #facc15;
          font-size: 1.5rem;
          text-align: center;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .flight-info-summary {
          background: #0f172a;
          border-radius: 16px;
          padding: 15px 20px;
          margin-bottom: 20px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #334155;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          color: #94a3b8;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .info-value {
          color: white;
          font-weight: 500;
          font-size: 14px;
          text-align: right;
        }

        .price-info .info-value {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .old-price-summary {
          color: #94a3b8;
          font-size: 12px;
          text-decoration: line-through;
        }

        .new-price-summary {
          color: #facc15;
          font-size: 19px;
          font-weight: 700;
        }

        .promo-badge-summary {
          background: #f59e0b;
          color: #0f172a;
          font-size: 13px;
          padding: 2px 8px;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .section-card {
          background: #0f172a;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .section-card h3 {
          color: #facc15;
          font-size: 18px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .penumpang-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #334155;
        }

        .penumpang-label {
          color: white;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .harga-label {
          color: #94a3b8;
          font-size: 14px;
        }

        .counter {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .form-group small {
  color: #fde908;
  font-size: 13px;
  margin-top: 5px;
  display: block;
}

.input-hint {
  color: #facc15;  /* warna kuning */
  font-size: 12px;
  font-style: italic;
  margin-top: 8px;
}

        .counter button {
          background: #334155;
          border: none;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
        }

        .counter button:hover {
          background: #15fa52;
          color: #ffffff;
        }

        .counter span {
          color: white;
          min-width: 30px;
          text-align: center;
        }

        .total-penumpang {
          color: white;
          text-align: right;
          padding-top: 10px;
          margin-top: 10px;
          border-top: 1px solid #334155;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          color: white;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .form-group input, .form-group select {
          width: 100%;
          padding: 12px;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 8px;
          color: white;
        }

        .form-group input:focus {
          outline: none;
          border-color: #facc15;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .radio-group {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .radio-group label {
          display: flex;
          align-items: center;
          gap: 6px;
          color: white;
          cursor: pointer;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
          cursor: pointer;
        }

        .error-input {
          border-color: #ef4444 !important;
        }

        .error-message {
          color: #ef4444;
          font-size: 12px;
          margin-top: 5px;
          display: block;
        }

        /* SEAT MAP STYLES */
        .seat-map-container {
          background: #0f172a;
          border-radius: 12px;
          padding: 15px;
          margin: 15px 0;
        }

        .seat-map-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .seat-map-header h4 {
          color: #facc15;
          margin-bottom: 5px;
        }

        .seat-map-header p {
          color: white;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .seat-legend {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .seat-legend span {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #94a3b8;
          font-size: 12px;
        }

        .legend-box {
          width: 25px;
          height: 25px;
          border-radius: 6px;
        }

        .legend-box.available {
          background: #334155;
          border: 1px solid #475569;
        }

        .legend-box.selected {
          background: #10b981;
        }

        .legend-box.booked {
          background: #ef4444;
        }

        .legend-box.window {
          background: #f59e0b;
        }

        .seat-map {
          background: #1e293b;
          border-radius: 12px;
          padding: 20px;
        }

        .plane-front {
          text-align: center;
          margin-bottom: 20px;
        }

        .cockpit {
          background: #334155;
          color: white;
          padding: 8px;
          border-radius: 20px 20px 0 0;
          font-size: 12px;
        }

        .galley {
          background: #475569;
          color: white;
          padding: 5px;
          border-radius: 0 0 10px 10px;
          font-size: 10px;
        }

        .seat-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 12px;
        }

        .row-number {
          width: 30px;
          color: #94a3b8;
          font-size: 12px;
        }

        .seat {
          width: 45px;
          height: 45px;
          border-radius: 8px;
          background: #334155;
          border: 1px solid #475569;
          color: white;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .seat.available:hover {
          background: #f59e0b;
          transform: scale(1.05);
        }

        .seat.selected {
          background: #10b981;
          border-color: #34d399;
        }

        .seat.booked {
          background: #ef4444;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .seat.window {
          border-left: 3px solid #f59e0b;
        }

        .plane-tail {
          text-align: center;
          margin-top: 20px;
          padding: 8px;
          background: #334155;
          border-radius: 10px;
          color: white;
          font-size: 10px;
        }

        .rincian-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          color: #cbd5e1;
          border-bottom: 1px solid #334155;
        }

        .rincian-total {
          display: flex;
          justify-content: space-between;
          padding: 12px 0 0;
          margin-top: 10px;
          font-weight: bold;
          color: #facc15;
          font-size: 18px;
          border-top: 2px solid #facc15;
        }

        .form-buttons {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .cancel-btn {
          flex: 1;
          padding: 14px;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 40px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .confirm-btn {
          flex: 2;
          padding: 14px;
          background: #f59e0b;
          border: none;
          border-radius: 40px;
          color: #0f172a;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .confirm-btn:hover, .cancel-btn:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 700px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .penumpang-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .form-buttons {
            flex-direction: column;
          }
          .seat-row {
            gap: 8px;
          }
          .seat {
            width: 35px;
            height: 35px;
            font-size: 10px;
          }
          .row-number {
            width: 20px;
          }
          .info-row {
            flex-direction: column;
            gap: 5px;
          }
          .info-value {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
}

export default FormBookingTiketPesawat;