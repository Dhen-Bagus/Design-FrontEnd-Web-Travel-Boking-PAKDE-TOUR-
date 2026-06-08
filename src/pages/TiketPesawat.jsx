import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPlane, FaQrcode, FaPrint, FaHome, FaUser, FaIdCard, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaTag, FaHeadset, FaChild, FaBaby, FaPhone, FaEnvelope, FaBirthdayCake, FaVenusMars, FaChair, FaSuitcase, FaShieldAlt, FaClock } from "react-icons/fa";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";

function TiketPesawat() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingData } = location.state || {};

  const [showFullDetails, setShowFullDetails] = useState(false);

  useEffect(() => {
    if (!bookingData) {
      navigate("/flight");
    }
  }, [bookingData, navigate]);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

  // Hitung total penumpang dari data penumpang
  const totalPenumpangCount = bookingData?.penumpang 
    ? (bookingData.penumpang.dewasa + bookingData.penumpang.anak + bookingData.penumpang.bayi)
    : 1;

  if (!bookingData) return null;

  return (
    <div className="ticket-page">
      <div className="ticket-background">
        <div className="ticket-container">
          {/* KERTAS TIKET */}
          <div className="ticket-paper">
            {/* HEADER TIKET */}
            <div className="ticket-header">
              <div className="airline-section">
                <img src={bookingData.logo} alt={bookingData.maskapai} className="ticket-logo" onError={(e) => e.target.src = "https://via.placeholder.com/200x60?text=Airline"} />
                <div>
                  <div className="airline-name">{bookingData.maskapai}</div>
                  <div className="booking-code">Kode Booking: {bookingData.kodeBooking}</div>
                </div>
              </div>
              <div className="ticket-type">
                <span className="ticket-badge">E-TICKET</span>
                <span className="class-badge">{bookingData.kelas || "Ekonomi"}</span>
              </div>
            </div>

            <div className="dashed-divider"></div>

            {/* RUTE PENERBANGAN */}
            <div className="route-section">
              <div className="route-point">
                <div className="city-name">{bookingData.kotaAsal}</div>
                <div className="airport-name">{bookingData.bandaraKeberangkatan}</div>
                <div className="time">
                  <MdFlightTakeoff className="icon-time" />
                  {bookingData.jamBerangkat}
                </div>
              </div>
              <div className="route-line">
                <div className="plane-icon">
                  <FaPlane />
                </div>
                <div className="duration">{bookingData.durasi || "Penerbangan"}</div>
              </div>
              <div className="route-point">
                <div className="city-name">{bookingData.kotaTujuan}</div>
                <div className="airport-name">{bookingData.bandaraTujuan}</div>
                <div className="time">
                  <MdFlightLand className="icon-time" />
                  {bookingData.jamTiba}
                </div>
              </div>
            </div>

            <div className="dashed-divider"></div>

            {/* TANGGAL & JAM KEBERANGKATAN */}
            <div className="date-section">
              <div className="date-item">
                <FaCalendarAlt className="date-icon" />
                <div>
                  <div className="date-label">Tanggal Keberangkatan</div>
                  <div className="date-value">{formatTanggalIndonesia(bookingData.tanggalBerangkat) || formatDate(bookingData.tanggal) || "-"}</div>
                </div>
              </div>
              {bookingData.jenisPenerbangan === "roundtrip" && bookingData.tanggalPulang && (
                <div className="date-item">
                  <FaCalendarAlt className="date-icon" />
                  <div>
                    <div className="date-label">Tanggal Pulang</div>
                    <div className="date-value">{formatTanggalIndonesia(bookingData.tanggalPulang)}</div>
                  </div>
                </div>
              )}
              <div className="date-item">
                <FaClock className="date-icon" />
                <div>
                  <div className="date-label">Jam Penerbangan</div>
                  <div className="date-value">{bookingData.jamBerangkat} - {bookingData.jamTiba}</div>
                </div>
              </div>
            </div>

            <div className="dashed-divider"></div>

            {/* DATA PENUMPANG UTAMA */}
            <div className="passenger-section">
              <h3>
                <FaUser className="section-icon" />
                Data Penumpang Utama
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label"><FaUser className="info-icon" /> Nama Lengkap</span>
                  <span className="info-value">{bookingData.namaLengkap}</span>
                </div>
                <div className="info-item">
                  <span className="info-label"><FaIdCard className="info-icon" /> NIK</span>
                  <span className="info-value">{bookingData.nik}</span>
                </div>
                <div className="info-item">
                  <span className="info-label"><FaBirthdayCake className="info-icon" /> Tanggal Lahir</span>
                  <span className="info-value">{formatDate(bookingData.tanggalLahir) || "-"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label"><FaVenusMars className="info-icon" /> Jenis Kelamin</span>
                  <span className="info-value">{bookingData.jenisKelamin || "-"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label"><FaPhone className="info-icon" /> No. HP/WA</span>
                  <span className="info-value">{bookingData.noHp}</span>
                </div>
                <div className="info-item">
                  <span className="info-label"><FaEnvelope className="info-icon" /> Email</span>
                  <span className="info-value">{bookingData.email}</span>
                </div>
              </div>
            </div>

            <div className="dashed-divider"></div>

            {/* RINCIAN PENUMPANG */}
            <div className="passenger-section">
              <h3>
                <FaUsers className="section-icon" />
                Rincian Penumpang
              </h3>
              <div className="passenger-details">
                {bookingData.penumpang && (
                  <>
                    <div className="passenger-type">
                      <FaUser className="type-icon" />
                      <span>Dewasa: {bookingData.penumpang.dewasa} orang</span>
                      <span className="passenger-price">{formatRupiah(bookingData.rincian?.hargaDewasa || 0)}/org</span>
                    </div>
                    <div className="passenger-type">
                      <FaChild className="type-icon" />
                      <span>Anak: {bookingData.penumpang.anak} orang</span>
                      <span className="passenger-price">{formatRupiah(bookingData.rincian?.hargaAnak || 0)}/org (Diskon 25%)</span>
                    </div>
                    <div className="passenger-type">
                      <FaBaby className="type-icon" />
                      <span>Bayi: {bookingData.penumpang.bayi} orang</span>
                      <span className="passenger-price">{formatRupiah(bookingData.rincian?.hargaBayi || 0)}/org (Diskon 90%)</span>
                    </div>
                  </>
                )}
                <div className="passenger-total">
                  <strong>Total Penumpang: {totalPenumpangCount} orang</strong>
                </div>
              </div>
            </div>

            <div className="dashed-divider"></div>

            {/* TAMBAHAN LAYANAN */}
            {(bookingData.pilihKursi === "now" || bookingData.bagasiTambahan !== "none" || bookingData.asuransi) && (
              <>
                <div className="extra-section">
                  <h3>
                    <FaChair className="section-icon" />
                    Layanan Tambahan
                  </h3>
                  <div className="extra-details">
                    {bookingData.pilihKursi === "now" && bookingData.selectedSeats && bookingData.selectedSeats.length > 0 && (
                      <div className="extra-item">
                        <FaChair className="extra-icon" />
                        <span>Kursi dipilih:</span>
                        <span className="extra-value">{bookingData.selectedSeats.map(s => s.id).join(", ")}</span>
                      </div>
                    )}
                    {bookingData.bagasiTambahan && bookingData.bagasiTambahan !== "none" && (
                      <div className="extra-item">
                        <FaSuitcase className="extra-icon" />
                        <span>Bagasi tambahan:</span>
                        <span className="extra-value">{bookingData.bagasiTambahan}</span>
                      </div>
                    )}
                    {bookingData.asuransi && (
                      <div className="extra-item">
                        <FaShieldAlt className="extra-icon" />
                        <span>Asuransi perjalanan:</span>
                        <span className="extra-value">Aktif</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="dashed-divider"></div>
              </>
            )}

            {/* DETAIL PEMBAYARAN */}
            <div className="payment-section">
              <h3>
                <FaMoneyBillWave className="section-icon" />
                Detail Pembayaran
              </h3>
              <div className="price-details">
                <div className="price-row">
                  <span>Tiket ({totalPenumpangCount} orang)</span>
                  <span>{formatRupiah(bookingData.rincian?.totalTiket || bookingData.hargaAsli)}</span>
                </div>
                {bookingData.bagasiTambahan !== "none" && bookingData.rincian?.biayaBagasi > 0 && (
                  <div className="price-row">
                    <span>Bagasi ({bookingData.bagasiTambahan})</span>
                    <span>{formatRupiah(bookingData.rincian.biayaBagasi)}</span>
                  </div>
                )}
                {bookingData.pilihKursi === "now" && bookingData.rincian?.biayaKursi > 0 && (
                  <div className="price-row">
                    <span>Pilih kursi</span>
                    <span>{formatRupiah(bookingData.rincian.biayaKursi)}</span>
                  </div>
                )}
                {bookingData.asuransi && bookingData.rincian?.biayaAsuransi > 0 && (
                  <div className="price-row">
                    <span>Asuransi perjalanan</span>
                    <span>{formatRupiah(bookingData.rincian.biayaAsuransi)}</span>
                  </div>
                )}
                <div className="price-row promo-row">
                  <span><FaTag className="promo-icon" /> Promo {bookingData.promo || "Diskon"}</span>
                  <span>-{formatRupiah((bookingData.hargaAsli || 0) - (bookingData.harga || 0))}</span>
                </div>
                <div className="price-row total-row">
                  <span>Total Dibayar</span>
                  <span className="total-price">{formatRupiah(bookingData.totalBiaya || bookingData.harga)}</span>
                </div>
              </div>
            </div>

            {/* FOOTER TIKET */}
            <div className="ticket-footer">
              <div className="qr-placeholder">
                <div className="qr-simulator">
                  <FaQrcode />
                </div>
                <span>Scan untuk check-in</span>
              </div>
              <div className="terms">
                <small>
                  <FaCalendarAlt className="footer-icon" /> Check-in online H-1
                  <br />
                  <GiAirplaneDeparture className="footer-icon" /> Tiba 2 jam sebelum keberangkatan
                  <br />
                  <FaHeadset className="footer-icon" /> Call center: 1500-789
                </small>
              </div>
            </div>
          </div>

          {/* TOMBOL AKSI */}
          <div className="ticket-actions">
            <button className="print-btn" onClick={() => window.print()}>
              <FaPrint className="btn-icon" />
              Cetak Tiket
            </button>
            <button className="home-btn" onClick={() => navigate("/home")}>
              <FaHome className="btn-icon" />
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: ticketStyles }} />
    </div>
  );
}

export default TiketPesawat;

// ==================== TIKET PESAWAT STYLES ====================
const ticketStyles = `
.ticket-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
}

.ticket-background {
  padding: 100px 20px 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ticket-container {
  max-width: 550px;
  width: 100%;
}

.ticket-paper {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.ticket-header {
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.airline-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ticket-logo {
  width: 200px;
  height: 60px;
  object-fit: contain;
  background: white;
  border-radius: 12px;
  padding: 5px;
}

.airline-name {
  font-weight: 700;
  font-size: 1rem;
}

.booking-code {
  font-size: 10px;
  opacity: 0.8;
}

.ticket-type {
  text-align: right;
}

.ticket-badge {
  background: #facc15;
  color: #1e293b;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  display: block;
  margin-bottom: 5px;
}

.class-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
}

.dashed-divider {
  height: 2px;
  background: repeating-linear-gradient(90deg, #ccc, #ccc 10px, transparent 10px, transparent 20px);
  margin: 0 20px;
}

.route-section {
  padding: 25px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
}

.route-point {
  text-align: center;
}

.city-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
}

.airport-name {
  font-size: 9px;
  color: #64748b;
  margin-top: 4px;
}

.time {
  font-weight: 600;
  color: #f59e0b;
  margin-top: 8px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.icon-time {
  font-size: 12px;
}

.route-line {
  text-align: center;
  flex: 1;
}

.plane-icon {
  font-size: 22px;
  margin-bottom: 5px;
  color: #f59e0b;
}

.duration {
  font-size: 9px;
  color: #64748b;
}

/* DATE SECTION */
.date-section {
  padding: 20px;
  background: #f8fafc;
}

.date-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #e2e8f0;
}

.date-item:last-child {
  border-bottom: none;
}

.date-icon {
  font-size: 18px;
  color: #f59e0b;
}

.date-label {
  font-size: 10px;
  color: #64748b;
}

.date-value {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
}

/* PASSENGER SECTION */
.passenger-section {
  padding: 20px;
}

.extra-section {
  padding: 20px;
}

.passenger-section h3, .payment-section h3, .extra-section h3 {
  color: #1e293b;
  font-size: 14px;
  margin-bottom: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  font-size: 16px;
  color: #f59e0b;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e2e8f0;
}

.info-label {
  color: #64748b;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.info-icon {
  font-size: 12px;
  color: #f59e0b;
}

.info-value {
  font-weight: 600;
  color: #1e293b;
  font-size: 13px;
}

/* PASSENGER DETAILS */
.passenger-details {
  background: #f1f5f9;
  border-radius: 16px;
  padding: 15px;
}

.passenger-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e2e8f0;
}

.passenger-type:last-child {
  border-bottom: none;
}

.type-icon {
  font-size: 14px;
  color: #f59e0b;
}

.passenger-price {
  font-size: 12px;
  color: #10b981;
}

.passenger-total {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #cbd5e1;
  text-align: right;
  font-size: 14px;
}

/* EXTRA DETAILS */
.extra-details {
  background: #f1f5f9;
  border-radius: 16px;
  padding: 15px;
}

.extra-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e2e8f0;
}

.extra-item:last-child {
  border-bottom: none;
}

.extra-icon {
  font-size: 14px;
  color: #f59e0b;
}

.extra-value {
  font-weight: 600;
  color: #1e293b;
}

/* PAYMENT SECTION */
.payment-section {
  padding: 20px;
}

.price-details {
  background: #f1f5f9;
  border-radius: 16px;
  padding: 15px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 13px;
  color: #334155;
}

.promo-row {
  color: #10b981;
}

.promo-icon {
  font-size: 11px;
  margin-right: 4px;
}

.total-row {
  border-top: 1px solid #cbd5e1;
  margin-top: 8px;
  padding-top: 12px;
  font-weight: 700;
  font-size: 1rem;
}

.total-price {
  color: #f59e0b;
  font-size: 1.1rem;
}

/* TICKET FOOTER */
.ticket-footer {
  background: #f1f5f9;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.qr-placeholder {
  text-align: center;
}

.qr-simulator {
  font-size: 35px;
  background: white;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #1e293b;
}

.qr-placeholder span {
  font-size: 9px;
  color: #64748b;
  display: block;
  margin-top: 4px;
}

.terms small {
  font-size: 8px;
  color: #64748b;
  display: block;
  text-align: right;
  line-height: 1.6;
}

.footer-icon {
  font-size: 8px;
  margin-right: 3px;
  color: #f59e0b;
  display: inline;
}

/* BUTTON ACTIONS */
.ticket-actions {
  display: flex;
  gap: 12px;
  margin-top: 25px;
  justify-content: center;
  flex-wrap: wrap;
}

.print-btn {
  background: #facc15;
  color: #1e293b;
  padding: 10px 18px;
  border-radius: 40px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.home-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px 18px;
  border-radius: 40px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-icon {
  font-size: 14px;
}

.print-btn:hover {
  transform: translateY(-2px);
  background: #fbbf24;
}

.home-btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.3);
}

@media print {
  .ticket-page {
    background: white;
    padding: 0;
  }
  
  .ticket-background {
    padding: 0;
  }
  
  .ticket-actions {
    display: none;
  }
  
  .ticket-paper {
    box-shadow: none;
  }
}

@media (max-width: 500px) {
  .ticket-header {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .ticket-type {
    text-align: center;
  }
  
  .route-section {
    flex-direction: column;
    gap: 15px;
  }
  
  .route-line {
    order: 2;
  }
  
  .info-item {
    flex-direction: column;
    gap: 5px;
  }
  
  .info-value {
    text-align: left;
  }
  
  .passenger-type {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .extra-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .ticket-footer {
    flex-direction: column;
    text-align: center;
  }
  
  .terms small {
    text-align: center;
  }
}
`;

if (typeof document !== "undefined") {
  const existingStyle = document.getElementById("ticket-styles");
  if (existingStyle) {
    existingStyle.textContent = ticketStyles;
  } else {
    const styleTag = document.createElement("style");
    styleTag.id = "ticket-styles";
    styleTag.textContent = ticketStyles;
    document.head.appendChild(styleTag);
  }
}