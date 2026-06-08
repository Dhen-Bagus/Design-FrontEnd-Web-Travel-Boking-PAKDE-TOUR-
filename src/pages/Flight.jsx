import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPlane, FaTicketAlt, FaArrowLeft, FaTag, FaClock, FaMapMarkerAlt, FaUser, FaStar, FaCalendarAlt } from "react-icons/fa";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// IMPORT SEMUA LOGO (6 MASKAPAI)
import garudaImg from "../assets/images/garuda.png";
import citilinkImg from "../assets/images/citilink.png";
import lionImg from "../assets/images/lion.png";
import sriwijayaImg from "../assets/images/sriwijaya_air.png";
import batikImg from "../assets/images/batik_air.png";
import airasiaImg from "../assets/images/indonesia_airasia.png";

// FALLBACK jika gambar tidak ada
const fallbackImage = "https://via.placeholder.com/120x55?text=Airline";

// ============================================================
// DATA DUMMY PENERBANGAN UNTUK SETIAP RUTE
// ============================================================

// Data bandara untuk setiap kota
const bandaraData = {
  "Jakarta": { kode: "CGK", nama: "Soekarno-Hatta", bandara: "Soekarno-Hatta (CGK)" },
  "Bandung": { kode: "BDO", nama: "Husein Sastranegara", bandara: "Husein Sastranegara (BDO)" },
  "Surabaya": { kode: "SUB", nama: "Juanda", bandara: "Juanda (SUB)" },
  "Bali": { kode: "DPS", nama: "Ngurah Rai", bandara: "Ngurah Rai (DPS)" },
  "Yogyakarta": { kode: "YIA", nama: "Yogyakarta International", bandara: "Yogyakarta International (YIA)" },
  "Medan": { kode: "KNO", nama: "Kualanamu", bandara: "Kualanamu (KNO)" },
  "Makassar": { kode: "UPG", nama: "Sultan Hasanuddin", bandara: "Sultan Hasanuddin (UPG)" },
  "Semarang": { kode: "SRG", nama: "Ahmad Yani", bandara: "Ahmad Yani (SRG)" },
  "Lampung": { kode: "TKG", nama: "Radin Inten II", bandara: "Radin Inten II (TKG)" },
  "Palembang": { kode: "PLM", nama: "Sultan Mahmud Badaruddin II", bandara: "Sultan Mahmud Badaruddin II (PLM)" }
};

const flightsDatabase = {
  // ==================== RUTE DARI JAKARTA ====================
  "Jakarta-Bali": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "07:00", jamTiba: "08:30", harga: 850000, promo: "Diskon 15%", hargaPromo: 722500, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "09:15", jamTiba: "10:45", harga: 650000, promo: "Diskon 10%", hargaPromo: 585000, bandaraKeberangkatan: "Halim Perdanakusuma (HLP)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "13:30", jamTiba: "15:00", harga: 550000, promo: "Hemat 50rb", hargaPromo: 500000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 4, maskapai: "Sriwijaya Air", logo: sriwijayaImg, jamBerangkat: "05:45", jamTiba: "07:15", harga: 780000, promo: "Diskon 20%", hargaPromo: 624000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 5, maskapai: "Batik Air", logo: batikImg, jamBerangkat: "11:20", jamTiba: "12:50", harga: 720000, promo: "Diskon 12%", hargaPromo: 633600, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 6, maskapai: "Indonesia AirAsia", logo: airasiaImg, jamBerangkat: "15:40", jamTiba: "17:10", harga: 590000, promo: "Hemat 40rb", hargaPromo: 550000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" }
  ],
  "Jakarta-Surabaya": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "06:00", jamTiba: "07:15", harga: 750000, promo: "Diskon 10%", hargaPromo: 675000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "08:30", jamTiba: "09:45", harga: 550000, promo: "Diskon 5%", hargaPromo: 522500, bandaraKeberangkatan: "Halim Perdanakusuma (HLP)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "12:00", jamTiba: "13:15", harga: 480000, promo: "Hemat 30rb", hargaPromo: 450000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 4, maskapai: "Sriwijaya Air", logo: sriwijayaImg, jamBerangkat: "14:30", jamTiba: "15:45", harga: 620000, promo: "Diskon 8%", hargaPromo: 570400, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 5, maskapai: "Batik Air", logo: batikImg, jamBerangkat: "17:00", jamTiba: "18:15", harga: 680000, promo: "Diskon 15%", hargaPromo: 578000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 6, maskapai: "Indonesia AirAsia", logo: airasiaImg, jamBerangkat: "19:30", jamTiba: "20:45", harga: 520000, promo: "Hemat 20rb", hargaPromo: 500000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam 15 menit", kelas: "Ekonomi" }
  ],
  "Jakarta-Bandung": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "06:00", jamTiba: "06:45", harga: 350000, promo: "Diskon 10%", hargaPromo: 315000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "45 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "09:00", jamTiba: "09:45", harga: 280000, promo: "Diskon 5%", hargaPromo: 266000, bandaraKeberangkatan: "Halim Perdanakusuma (HLP)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "45 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "12:00", jamTiba: "12:45", harga: 250000, promo: "Hemat 20rb", hargaPromo: 230000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "45 menit", kelas: "Ekonomi" },
    { id: 4, maskapai: "Sriwijaya Air", logo: sriwijayaImg, jamBerangkat: "15:00", jamTiba: "15:45", harga: 320000, promo: "Diskon 8%", hargaPromo: 294400, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "45 menit", kelas: "Ekonomi" },
    { id: 5, maskapai: "Batik Air", logo: batikImg, jamBerangkat: "17:30", jamTiba: "18:15", harga: 380000, promo: "Diskon 12%", hargaPromo: 334400, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "45 menit", kelas: "Ekonomi" },
    { id: 6, maskapai: "Indonesia AirAsia", logo: airasiaImg, jamBerangkat: "19:00", jamTiba: "19:45", harga: 300000, promo: "Hemat 15rb", hargaPromo: 285000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "45 menit", kelas: "Ekonomi" }
  ],
  "Jakarta-Yogyakarta": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "06:30", jamTiba: "07:45", harga: 650000, promo: "Diskon 10%", hargaPromo: 585000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Yogyakarta International (YIA)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "09:00", jamTiba: "10:15", harga: 500000, promo: "Diskon 8%", hargaPromo: 460000, bandaraKeberangkatan: "Halim Perdanakusuma (HLP)", bandaraTujuan: "Yogyakarta International (YIA)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "13:00", jamTiba: "14:15", harga: 450000, promo: "Hemat 30rb", hargaPromo: 420000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Yogyakarta International (YIA)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 4, maskapai: "Batik Air", logo: batikImg, jamBerangkat: "16:00", jamTiba: "17:15", harga: 580000, promo: "Diskon 10%", hargaPromo: 522000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Yogyakarta International (YIA)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 5, maskapai: "Indonesia AirAsia", logo: airasiaImg, jamBerangkat: "18:30", jamTiba: "19:45", harga: 490000, promo: "Hemat 25rb", hargaPromo: 465000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Yogyakarta International (YIA)", durasi: "1 jam 15 menit", kelas: "Ekonomi" }
  ],
  "Jakarta-Medan": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "07:00", jamTiba: "09:00", harga: 950000, promo: "Diskon 15%", hargaPromo: 807500, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Kualanamu (KNO)", durasi: "2 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "10:30", jamTiba: "12:30", harga: 750000, promo: "Hemat 50rb", hargaPromo: 700000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Kualanamu (KNO)", durasi: "2 jam", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "14:00", jamTiba: "16:00", harga: 680000, promo: "Diskon 8%", hargaPromo: 625600, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Kualanamu (KNO)", durasi: "2 jam", kelas: "Ekonomi" },
    { id: 4, maskapai: "Sriwijaya Air", logo: sriwijayaImg, jamBerangkat: "17:00", jamTiba: "19:00", harga: 820000, promo: "Diskon 10%", hargaPromo: 738000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Kualanamu (KNO)", durasi: "2 jam", kelas: "Ekonomi" }
  ],
  "Jakarta-Makassar": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "08:00", jamTiba: "11:30", harga: 1200000, promo: "Diskon 20%", hargaPromo: 960000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Sultan Hasanuddin (UPG)", durasi: "2 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "12:00", jamTiba: "15:30", harga: 980000, promo: "Hemat 80rb", hargaPromo: 900000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Sultan Hasanuddin (UPG)", durasi: "2 jam 30 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "07:00", jamTiba: "10:30", harga: 890000, promo: "Diskon 10%", hargaPromo: 801000, bandaraKeberangkatan: "Halim Perdanakusuma (HLP)", bandaraTujuan: "Sultan Hasanuddin (UPG)", durasi: "2 jam 30 menit", kelas: "Ekonomi" },
    { id: 4, maskapai: "Batik Air", logo: batikImg, jamBerangkat: "16:00", jamTiba: "19:30", harga: 1050000, promo: "Diskon 15%", hargaPromo: 892500, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Sultan Hasanuddin (UPG)", durasi: "2 jam 30 menit", kelas: "Ekonomi" }
  ],
  "Jakarta-Semarang": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "07:00", jamTiba: "08:00", harga: 550000, promo: "Diskon 10%", hargaPromo: 495000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Ahmad Yani (SRG)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "10:00", jamTiba: "11:00", harga: 450000, promo: "Hemat 30rb", hargaPromo: 420000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Ahmad Yani (SRG)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "14:00", jamTiba: "15:00", harga: 480000, promo: "Diskon 5%", hargaPromo: 456000, bandaraKeberangkatan: "Halim Perdanakusuma (HLP)", bandaraTujuan: "Ahmad Yani (SRG)", durasi: "1 jam", kelas: "Ekonomi" }
  ],
  "Jakarta-Lampung": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "08:00", jamTiba: "09:00", harga: 450000, promo: "Diskon 10%", hargaPromo: 405000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Radin Inten II (TKG)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "11:00", jamTiba: "12:00", harga: 380000, promo: "Hemat 30rb", hargaPromo: 350000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Radin Inten II (TKG)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "15:00", jamTiba: "16:00", harga: 400000, promo: "Diskon 5%", hargaPromo: 380000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Radin Inten II (TKG)", durasi: "1 jam", kelas: "Ekonomi" }
  ],
  "Jakarta-Palembang": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "07:00", jamTiba: "08:00", harga: 480000, promo: "Diskon 10%", hargaPromo: 432000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Sultan Mahmud Badaruddin II (PLM)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "10:00", jamTiba: "11:00", harga: 400000, promo: "Hemat 30rb", hargaPromo: 370000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Sultan Mahmud Badaruddin II (PLM)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "14:00", jamTiba: "15:00", harga: 420000, promo: "Diskon 5%", hargaPromo: 399000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Sultan Mahmud Badaruddin II (PLM)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 4, maskapai: "Sriwijaya Air", logo: sriwijayaImg, jamBerangkat: "17:00", jamTiba: "18:00", harga: 450000, promo: "Diskon 8%", hargaPromo: 414000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Sultan Mahmud Badaruddin II (PLM)", durasi: "1 jam", kelas: "Ekonomi" }
  ],

  // ==================== RUTE DARI BANDUNG ====================
  "Bandung-Bali": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "07:30", jamTiba: "09:00", harga: 800000, promo: "Diskon 12%", hargaPromo: 704000, bandaraKeberangkatan: "Husein Sastranegara (BDO)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "10:00", jamTiba: "11:30", harga: 620000, promo: "Diskon 10%", hargaPromo: 558000, bandaraKeberangkatan: "Husein Sastranegara (BDO)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "14:00", jamTiba: "15:30", harga: 530000, promo: "Hemat 40rb", hargaPromo: 490000, bandaraKeberangkatan: "Husein Sastranegara (BDO)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 4, maskapai: "Sriwijaya Air", logo: sriwijayaImg, jamBerangkat: "16:30", jamTiba: "18:00", harga: 700000, promo: "Diskon 15%", hargaPromo: 595000, bandaraKeberangkatan: "Husein Sastranegara (BDO)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 5, maskapai: "Batik Air", logo: batikImg, jamBerangkat: "06:45", jamTiba: "08:15", harga: 750000, promo: "Diskon 10%", hargaPromo: 675000, bandaraKeberangkatan: "Husein Sastranegara (BDO)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 6, maskapai: "Indonesia AirAsia", logo: airasiaImg, jamBerangkat: "18:00", jamTiba: "19:30", harga: 560000, promo: "Hemat 30rb", hargaPromo: 530000, bandaraKeberangkatan: "Husein Sastranegara (BDO)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" }
  ],
  "Bandung-Jakarta": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "06:00", jamTiba: "06:45", harga: 350000, promo: "Diskon 10%", hargaPromo: 315000, bandaraKeberangkatan: "Husein Sastranegara (BDO)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "45 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "09:00", jamTiba: "09:45", harga: 280000, promo: "Diskon 5%", hargaPromo: 266000, bandaraKeberangkatan: "Husein Sastranegara (BDO)", bandaraTujuan: "Halim Perdanakusuma (HLP)", durasi: "45 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "12:00", jamTiba: "12:45", harga: 250000, promo: "Hemat 20rb", hargaPromo: 230000, bandaraKeberangkatan: "Husein Sastranegara (BDO)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "45 menit", kelas: "Ekonomi" }
  ],
  "Bandung-Surabaya": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "07:00", jamTiba: "08:15", harga: 650000, promo: "Diskon 10%", hargaPromo: 585000, bandaraKeberangkatan: "Husein Sastranegara (BDO)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "13:00", jamTiba: "14:15", harga: 500000, promo: "Hemat 30rb", hargaPromo: 470000, bandaraKeberangkatan: "Husein Sastranegara (BDO)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "16:00", jamTiba: "17:15", harga: 520000, promo: "Diskon 8%", hargaPromo: 478400, bandaraKeberangkatan: "Husein Sastranegara (BDO)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam 15 menit", kelas: "Ekonomi" }
  ],
  "Bandung-Lampung": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "10:00", jamTiba: "11:15", harga: 500000, promo: "Diskon 10%", hargaPromo: 450000, bandaraKeberangkatan: "Husein Sastranegara (BDO)", bandaraTujuan: "Radin Inten II (TKG)", durasi: "1 jam 15 menit", kelas: "Ekonomi" }
  ],
  "Bandung-Palembang": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "09:00", jamTiba: "10:15", harga: 550000, promo: "Diskon 10%", hargaPromo: 495000, bandaraKeberangkatan: "Husein Sastranegara (BDO)", bandaraTujuan: "Sultan Mahmud Badaruddin II (PLM)", durasi: "1 jam 15 menit", kelas: "Ekonomi" }
  ],

  // ==================== RUTE DARI SURABAYA ====================
  "Surabaya-Bali": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "08:00", jamTiba: "09:00", harga: 450000, promo: "Diskon 10%", hargaPromo: 405000, bandaraKeberangkatan: "Juanda (SUB)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "10:30", jamTiba: "11:30", harga: 380000, promo: "Diskon 5%", hargaPromo: 361000, bandaraKeberangkatan: "Juanda (SUB)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 3, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "13:00", jamTiba: "14:00", harga: 320000, promo: "Hemat 30rb", hargaPromo: 290000, bandaraKeberangkatan: "Juanda (SUB)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 4, maskapai: "Sriwijaya Air", logo: sriwijayaImg, jamBerangkat: "15:30", jamTiba: "16:30", harga: 420000, promo: "Diskon 12%", hargaPromo: 369600, bandaraKeberangkatan: "Juanda (SUB)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 5, maskapai: "Batik Air", logo: batikImg, jamBerangkat: "17:00", jamTiba: "18:00", harga: 480000, promo: "Diskon 15%", hargaPromo: 408000, bandaraKeberangkatan: "Juanda (SUB)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 6, maskapai: "Indonesia AirAsia", logo: airasiaImg, jamBerangkat: "19:00", jamTiba: "20:00", harga: 350000, promo: "Hemat 20rb", hargaPromo: 330000, bandaraKeberangkatan: "Juanda (SUB)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam", kelas: "Ekonomi" }
  ],
  "Surabaya-Jakarta": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "06:00", jamTiba: "07:15", harga: 750000, promo: "Diskon 10%", hargaPromo: 675000, bandaraKeberangkatan: "Juanda (SUB)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "09:00", jamTiba: "10:15", harga: 550000, promo: "Diskon 5%", hargaPromo: 522500, bandaraKeberangkatan: "Juanda (SUB)", bandaraTujuan: "Halim Perdanakusuma (HLP)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "12:00", jamTiba: "13:15", harga: 480000, promo: "Hemat 30rb", hargaPromo: 450000, bandaraKeberangkatan: "Juanda (SUB)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam 15 menit", kelas: "Ekonomi" }
  ],
  "Surabaya-Makassar": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "06:00", jamTiba: "09:00", harga: 750000, promo: "Diskon 15%", hargaPromo: 637500, bandaraKeberangkatan: "Juanda (SUB)", bandaraTujuan: "Sultan Hasanuddin (UPG)", durasi: "2 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "13:00", jamTiba: "16:00", harga: 620000, promo: "Hemat 40rb", hargaPromo: 580000, bandaraKeberangkatan: "Juanda (SUB)", bandaraTujuan: "Sultan Hasanuddin (UPG)", durasi: "2 jam", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "10:00", jamTiba: "13:00", harga: 580000, promo: "Diskon 8%", hargaPromo: 533600, bandaraKeberangkatan: "Juanda (SUB)", bandaraTujuan: "Sultan Hasanuddin (UPG)", durasi: "2 jam", kelas: "Ekonomi" }
  ],

  // ==================== RUTE DARI YOGYAKARTA ====================
  "Yogyakarta-Jakarta": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "06:00", jamTiba: "07:15", harga: 650000, promo: "Diskon 10%", hargaPromo: 585000, bandaraKeberangkatan: "Yogyakarta International (YIA)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "10:00", jamTiba: "11:15", harga: 500000, promo: "Hemat 30rb", hargaPromo: 470000, bandaraKeberangkatan: "Yogyakarta International (YIA)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "14:00", jamTiba: "15:15", harga: 520000, promo: "Diskon 8%", hargaPromo: 478400, bandaraKeberangkatan: "Yogyakarta International (YIA)", bandaraTujuan: "Halim Perdanakusuma (HLP)", durasi: "1 jam 15 menit", kelas: "Ekonomi" }
  ],
  "Yogyakarta-Bali": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "07:00", jamTiba: "08:30", harga: 550000, promo: "Diskon 10%", hargaPromo: 495000, bandaraKeberangkatan: "Yogyakarta International (YIA)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "12:00", jamTiba: "13:30", harga: 450000, promo: "Hemat 30rb", hargaPromo: 420000, bandaraKeberangkatan: "Yogyakarta International (YIA)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Indonesia AirAsia", logo: airasiaImg, jamBerangkat: "16:00", jamTiba: "17:30", harga: 480000, promo: "Hemat 20rb", hargaPromo: 460000, bandaraKeberangkatan: "Yogyakarta International (YIA)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" }
  ],

  // ==================== RUTE DARI MEDAN ====================
  "Medan-Jakarta": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "06:00", jamTiba: "08:00", harga: 950000, promo: "Diskon 15%", hargaPromo: 807500, bandaraKeberangkatan: "Kualanamu (KNO)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "2 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "10:00", jamTiba: "12:00", harga: 780000, promo: "Hemat 50rb", hargaPromo: 730000, bandaraKeberangkatan: "Kualanamu (KNO)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "2 jam", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "14:00", jamTiba: "16:00", harga: 720000, promo: "Diskon 8%", hargaPromo: 662400, bandaraKeberangkatan: "Kualanamu (KNO)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "2 jam", kelas: "Ekonomi" }
  ],
  "Medan-Bali": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "08:00", jamTiba: "13:30", harga: 1100000, promo: "Diskon 15%", hargaPromo: 935000, bandaraKeberangkatan: "Kualanamu (KNO)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "4 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "12:30", jamTiba: "18:00", harga: 950000, promo: "Hemat 50rb", hargaPromo: 900000, bandaraKeberangkatan: "Kualanamu (KNO)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "4 jam 30 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "15:45", jamTiba: "21:15", harga: 890000, promo: "Diskon 10%", hargaPromo: 801000, bandaraKeberangkatan: "Kualanamu (KNO)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "4 jam 30 menit", kelas: "Ekonomi" },
    { id: 4, maskapai: "Sriwijaya Air", logo: sriwijayaImg, jamBerangkat: "07:00", jamTiba: "12:30", harga: 1000000, promo: "Diskon 12%", hargaPromo: 880000, bandaraKeberangkatan: "Kualanamu (KNO)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "4 jam 30 menit", kelas: "Ekonomi" }
  ],

  // ==================== RUTE DARI MAKASSAR ====================
  "Makassar-Jakarta": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "06:00", jamTiba: "08:00", harga: 1200000, promo: "Diskon 20%", hargaPromo: 960000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "2 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "09:30", jamTiba: "11:30", harga: 980000, promo: "Hemat 80rb", hargaPromo: 900000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "2 jam", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "13:00", jamTiba: "15:00", harga: 890000, promo: "Diskon 10%", hargaPromo: 801000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "2 jam", kelas: "Ekonomi" },
    { id: 4, maskapai: "Batik Air", logo: batikImg, jamBerangkat: "16:30", jamTiba: "18:30", harga: 1050000, promo: "Diskon 15%", hargaPromo: 892500, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "2 jam", kelas: "Ekonomi" }
  ],
  "Makassar-Surabaya": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "07:00", jamTiba: "08:30", harga: 700000, promo: "Diskon 15%", hargaPromo: 595000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "10:30", jamTiba: "12:00", harga: 550000, promo: "Hemat 50rb", hargaPromo: 500000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "14:00", jamTiba: "15:30", harga: 500000, promo: "Diskon 5%", hargaPromo: 475000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam 30 menit", kelas: "Ekonomi" }
  ],
  "Makassar-Bali": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "08:00", jamTiba: "09:30", harga: 600000, promo: "Diskon 10%", hargaPromo: 540000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "11:00", jamTiba: "12:30", harga: 480000, promo: "Hemat 30rb", hargaPromo: 450000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "15:30", jamTiba: "17:00", harga: 520000, promo: "Diskon 8%", hargaPromo: 478400, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 4, maskapai: "Indonesia AirAsia", logo: airasiaImg, jamBerangkat: "18:00", jamTiba: "19:30", harga: 490000, promo: "Hemat 20rb", hargaPromo: 470000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" }
  ],
  "Makassar-Bandung": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "07:30", jamTiba: "09:15", harga: 950000, promo: "Diskon 15%", hargaPromo: 807500, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "1 jam 45 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "12:00", jamTiba: "13:45", harga: 820000, promo: "Hemat 60rb", hargaPromo: 760000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "1 jam 45 menit", kelas: "Ekonomi" }
  ],
  "Makassar-Yogyakarta": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "09:00", jamTiba: "10:30", harga: 800000, promo: "Diskon 12%", hargaPromo: 704000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Yogyakarta International (YIA)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "14:00", jamTiba: "15:30", harga: 680000, promo: "Hemat 40rb", hargaPromo: 640000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Yogyakarta International (YIA)", durasi: "1 jam 30 menit", kelas: "Ekonomi" }
  ],
  "Makassar-Medan": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "06:00", jamTiba: "09:00", harga: 1300000, promo: "Diskon 20%", hargaPromo: 1040000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Kualanamu (KNO)", durasi: "3 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "11:30", jamTiba: "14:30", harga: 1050000, promo: "Hemat 100rb", hargaPromo: 950000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Kualanamu (KNO)", durasi: "3 jam", kelas: "Ekonomi" }
  ],
  "Makassar-Semarang": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "08:30", jamTiba: "10:00", harga: 750000, promo: "Diskon 10%", hargaPromo: 675000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Ahmad Yani (SRG)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "13:00", jamTiba: "14:30", harga: 620000, promo: "Hemat 30rb", hargaPromo: 590000, bandaraKeberangkatan: "Sultan Hasanuddin (UPG)", bandaraTujuan: "Ahmad Yani (SRG)", durasi: "1 jam 30 menit", kelas: "Ekonomi" }
  ],

  // ==================== RUTE DARI SEMARANG ====================
  "Semarang-Jakarta": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "07:00", jamTiba: "08:00", harga: 550000, promo: "Diskon 10%", hargaPromo: 495000, bandaraKeberangkatan: "Ahmad Yani (SRG)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "10:00", jamTiba: "11:00", harga: 450000, promo: "Hemat 30rb", hargaPromo: 420000, bandaraKeberangkatan: "Ahmad Yani (SRG)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "14:00", jamTiba: "15:00", harga: 480000, promo: "Diskon 5%", hargaPromo: 456000, bandaraKeberangkatan: "Ahmad Yani (SRG)", bandaraTujuan: "Halim Perdanakusuma (HLP)", durasi: "1 jam", kelas: "Ekonomi" }
  ],
  "Semarang-Bali": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "08:00", jamTiba: "09:30", harga: 550000, promo: "Diskon 10%", hargaPromo: 495000, bandaraKeberangkatan: "Ahmad Yani (SRG)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "12:00", jamTiba: "13:30", harga: 450000, promo: "Hemat 30rb", hargaPromo: 420000, bandaraKeberangkatan: "Ahmad Yani (SRG)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" }
  ],

  // ==================== RUTE DARI LAMPUNG ====================
  "Lampung-Jakarta": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "06:30", jamTiba: "07:30", harga: 450000, promo: "Diskon 10%", hargaPromo: 405000, bandaraKeberangkatan: "Radin Inten II (TKG)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "09:00", jamTiba: "10:00", harga: 380000, promo: "Hemat 30rb", hargaPromo: 350000, bandaraKeberangkatan: "Radin Inten II (TKG)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "13:30", jamTiba: "14:30", harga: 400000, promo: "Diskon 5%", hargaPromo: 380000, bandaraKeberangkatan: "Radin Inten II (TKG)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam", kelas: "Ekonomi" }
  ],
  "Lampung-Bandung": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "08:00", jamTiba: "09:15", harga: 500000, promo: "Diskon 10%", hargaPromo: 450000, bandaraKeberangkatan: "Radin Inten II (TKG)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "14:00", jamTiba: "15:15", harga: 420000, promo: "Hemat 20rb", hargaPromo: 400000, bandaraKeberangkatan: "Radin Inten II (TKG)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "1 jam 15 menit", kelas: "Ekonomi" }
  ],
  "Lampung-Surabaya": [
    { id: 1, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "07:00", jamTiba: "09:30", harga: 650000, promo: "Hemat 50rb", hargaPromo: 600000, bandaraKeberangkatan: "Radin Inten II (TKG)", bandaraTujuan: "Juanda (SUB)", durasi: "2 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "12:00", jamTiba: "14:30", harga: 600000, promo: "Diskon 10%", hargaPromo: 540000, bandaraKeberangkatan: "Radin Inten II (TKG)", bandaraTujuan: "Juanda (SUB)", durasi: "2 jam 30 menit", kelas: "Ekonomi" }
  ],
  "Lampung-Bali": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "10:00", jamTiba: "13:00", harga: 750000, promo: "Diskon 15%", hargaPromo: 637500, bandaraKeberangkatan: "Radin Inten II (TKG)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "2 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "15:30", jamTiba: "18:30", harga: 680000, promo: "Hemat 40rb", hargaPromo: 640000, bandaraKeberangkatan: "Radin Inten II (TKG)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "2 jam", kelas: "Ekonomi" }
  ],

  // ==================== RUTE DARI PALEMBANG ====================
  "Palembang-Jakarta": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "06:00", jamTiba: "07:00", harga: 480000, promo: "Diskon 10%", hargaPromo: 432000, bandaraKeberangkatan: "Sultan Mahmud Badaruddin II (PLM)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "08:30", jamTiba: "09:30", harga: 400000, promo: "Hemat 30rb", hargaPromo: 370000, bandaraKeberangkatan: "Sultan Mahmud Badaruddin II (PLM)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "12:00", jamTiba: "13:00", harga: 420000, promo: "Diskon 5%", hargaPromo: 399000, bandaraKeberangkatan: "Sultan Mahmud Badaruddin II (PLM)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 4, maskapai: "Sriwijaya Air", logo: sriwijayaImg, jamBerangkat: "15:30", jamTiba: "16:30", harga: 450000, promo: "Diskon 8%", hargaPromo: 414000, bandaraKeberangkatan: "Sultan Mahmud Badaruddin II (PLM)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam", kelas: "Ekonomi" }
  ],
  "Palembang-Bandung": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "07:00", jamTiba: "08:15", harga: 550000, promo: "Diskon 10%", hargaPromo: 495000, bandaraKeberangkatan: "Sultan Mahmud Badaruddin II (PLM)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "13:00", jamTiba: "14:15", harga: 470000, promo: "Hemat 20rb", hargaPromo: 450000, bandaraKeberangkatan: "Sultan Mahmud Badaruddin II (PLM)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "1 jam 15 menit", kelas: "Ekonomi" }
  ],
  "Palembang-Surabaya": [
    { id: 1, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "09:00", jamTiba: "11:30", harga: 700000, promo: "Hemat 50rb", hargaPromo: 650000, bandaraKeberangkatan: "Sultan Mahmud Badaruddin II (PLM)", bandaraTujuan: "Juanda (SUB)", durasi: "2 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "14:00", jamTiba: "16:30", harga: 650000, promo: "Diskon 10%", hargaPromo: 585000, bandaraKeberangkatan: "Sultan Mahmud Badaruddin II (PLM)", bandaraTujuan: "Juanda (SUB)", durasi: "2 jam 30 menit", kelas: "Ekonomi" }
  ],
  "Palembang-Bali": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "11:00", jamTiba: "14:00", harga: 850000, promo: "Diskon 15%", hargaPromo: 722500, bandaraKeberangkatan: "Sultan Mahmud Badaruddin II (PLM)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "2 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "16:30", jamTiba: "19:30", harga: 780000, promo: "Hemat 40rb", hargaPromo: 740000, bandaraKeberangkatan: "Sultan Mahmud Badaruddin II (PLM)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "2 jam", kelas: "Ekonomi" }
  ],
  "Palembang-Yogyakarta": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "10:00", jamTiba: "11:30", harga: 600000, promo: "Diskon 10%", hargaPromo: 540000, bandaraKeberangkatan: "Sultan Mahmud Badaruddin II (PLM)", bandaraTujuan: "Yogyakarta International (YIA)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "15:00", jamTiba: "16:30", harga: 520000, promo: "Hemat 30rb", hargaPromo: 490000, bandaraKeberangkatan: "Sultan Mahmud Badaruddin II (PLM)", bandaraTujuan: "Yogyakarta International (YIA)", durasi: "1 jam 30 menit", kelas: "Ekonomi" }
  ],

  // ==================== RUTE DARI BALI ====================
  "Bali-Jakarta": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "07:00", jamTiba: "08:30", harga: 850000, promo: "Diskon 15%", hargaPromo: 722500, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "09:15", jamTiba: "10:45", harga: 650000, promo: "Diskon 10%", hargaPromo: 585000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Halim Perdanakusuma (HLP)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "13:30", jamTiba: "15:00", harga: 550000, promo: "Hemat 50rb", hargaPromo: 500000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 4, maskapai: "Sriwijaya Air", logo: sriwijayaImg, jamBerangkat: "05:45", jamTiba: "07:15", harga: 780000, promo: "Diskon 20%", hargaPromo: 624000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 5, maskapai: "Batik Air", logo: batikImg, jamBerangkat: "11:20", jamTiba: "12:50", harga: 720000, promo: "Diskon 12%", hargaPromo: 633600, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 6, maskapai: "Indonesia AirAsia", logo: airasiaImg, jamBerangkat: "15:40", jamTiba: "17:10", harga: 590000, promo: "Hemat 40rb", hargaPromo: 550000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Soekarno-Hatta (CGK)", durasi: "1 jam 30 menit", kelas: "Ekonomi" }
  ],
  "Bali-Surabaya": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "08:00", jamTiba: "09:00", harga: 450000, promo: "Diskon 10%", hargaPromo: 405000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "10:30", jamTiba: "11:30", harga: 380000, promo: "Diskon 5%", hargaPromo: 361000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 3, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "13:00", jamTiba: "14:00", harga: 320000, promo: "Hemat 30rb", hargaPromo: 290000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 4, maskapai: "Sriwijaya Air", logo: sriwijayaImg, jamBerangkat: "15:30", jamTiba: "16:30", harga: 420000, promo: "Diskon 12%", hargaPromo: 369600, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 5, maskapai: "Batik Air", logo: batikImg, jamBerangkat: "17:00", jamTiba: "18:00", harga: 480000, promo: "Diskon 15%", hargaPromo: 408000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam", kelas: "Ekonomi" },
    { id: 6, maskapai: "Indonesia AirAsia", logo: airasiaImg, jamBerangkat: "19:00", jamTiba: "20:00", harga: 350000, promo: "Hemat 20rb", hargaPromo: 330000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Juanda (SUB)", durasi: "1 jam", kelas: "Ekonomi" }
  ],
  "Bali-Bandung": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "07:30", jamTiba: "09:00", harga: 800000, promo: "Diskon 12%", hargaPromo: 704000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "10:00", jamTiba: "11:30", harga: 620000, promo: "Diskon 10%", hargaPromo: 558000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "14:00", jamTiba: "15:30", harga: 530000, promo: "Hemat 40rb", hargaPromo: 490000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 4, maskapai: "Sriwijaya Air", logo: sriwijayaImg, jamBerangkat: "16:30", jamTiba: "18:00", harga: 700000, promo: "Diskon 15%", hargaPromo: 595000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 5, maskapai: "Batik Air", logo: batikImg, jamBerangkat: "06:45", jamTiba: "08:15", harga: 750000, promo: "Diskon 10%", hargaPromo: 675000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 6, maskapai: "Indonesia AirAsia", logo: airasiaImg, jamBerangkat: "18:00", jamTiba: "19:30", harga: 560000, promo: "Hemat 30rb", hargaPromo: 530000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Husein Sastranegara (BDO)", durasi: "1 jam 30 menit", kelas: "Ekonomi" }
  ],
  "Bali-Yogyakarta": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "08:30", jamTiba: "10:00", harga: 600000, promo: "Diskon 10%", hargaPromo: 540000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Yogyakarta International (YIA)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "12:00", jamTiba: "13:30", harga: 500000, promo: "Hemat 30rb", hargaPromo: 470000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Yogyakarta International (YIA)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Indonesia AirAsia", logo: airasiaImg, jamBerangkat: "16:00", jamTiba: "17:30", harga: 520000, promo: "Hemat 20rb", hargaPromo: 500000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Yogyakarta International (YIA)", durasi: "1 jam 30 menit", kelas: "Ekonomi" }
  ],
  "Bali-Medan": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "08:00", jamTiba: "13:30", harga: 1100000, promo: "Diskon 15%", hargaPromo: 935000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Kualanamu (KNO)", durasi: "4 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "12:30", jamTiba: "18:00", harga: 950000, promo: "Hemat 50rb", hargaPromo: 900000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Kualanamu (KNO)", durasi: "4 jam 30 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Sriwijaya Air", logo: sriwijayaImg, jamBerangkat: "14:00", jamTiba: "19:30", harga: 1000000, promo: "Diskon 10%", hargaPromo: 900000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Kualanamu (KNO)", durasi: "4 jam 30 menit", kelas: "Ekonomi" }
  ],
  "Bali-Makassar": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "10:00", jamTiba: "11:30", harga: 600000, promo: "Diskon 10%", hargaPromo: 540000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Sultan Hasanuddin (UPG)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "16:00", jamTiba: "17:30", harga: 520000, promo: "Hemat 30rb", hargaPromo: 490000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Sultan Hasanuddin (UPG)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "07:00", jamTiba: "08:30", harga: 550000, promo: "Diskon 8%", hargaPromo: 506000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Sultan Hasanuddin (UPG)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 4, maskapai: "Indonesia AirAsia", logo: airasiaImg, jamBerangkat: "13:00", jamTiba: "14:30", harga: 500000, promo: "Hemat 25rb", hargaPromo: 475000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Sultan Hasanuddin (UPG)", durasi: "1 jam 30 menit", kelas: "Ekonomi" }
  ],
  "Bali-Semarang": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "09:00", jamTiba: "10:15", harga: 550000, promo: "Diskon 10%", hargaPromo: 495000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Ahmad Yani (SRG)", durasi: "1 jam 15 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "14:00", jamTiba: "15:15", harga: 480000, promo: "Hemat 30rb", hargaPromo: 450000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Ahmad Yani (SRG)", durasi: "1 jam 15 menit", kelas: "Ekonomi" }
  ],
  "Bali-Lampung": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "11:00", jamTiba: "13:00", harga: 750000, promo: "Diskon 15%", hargaPromo: 637500, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Radin Inten II (TKG)", durasi: "2 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "15:30", jamTiba: "17:30", harga: 680000, promo: "Hemat 40rb", hargaPromo: 640000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Radin Inten II (TKG)", durasi: "2 jam", kelas: "Ekonomi" }
  ],
  "Bali-Palembang": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "11:00", jamTiba: "14:00", harga: 850000, promo: "Diskon 15%", hargaPromo: 722500, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Sultan Mahmud Badaruddin II (PLM)", durasi: "2 jam", kelas: "Ekonomi" },
    { id: 2, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "16:30", jamTiba: "19:30", harga: 780000, promo: "Hemat 40rb", hargaPromo: 740000, bandaraKeberangkatan: "Ngurah Rai (DPS)", bandaraTujuan: "Sultan Mahmud Badaruddin II (PLM)", durasi: "2 jam", kelas: "Ekonomi" }
  ],

  // ==================== DEFAULT / FALLBACK ====================
  "default": [
    { id: 1, maskapai: "Garuda Indonesia", logo: garudaImg, jamBerangkat: "07:00", jamTiba: "08:30", harga: 850000, promo: "Diskon 15%", hargaPromo: 722500, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 2, maskapai: "Citilink", logo: citilinkImg, jamBerangkat: "09:15", jamTiba: "10:45", harga: 650000, promo: "Diskon 10%", hargaPromo: 585000, bandaraKeberangkatan: "Halim Perdanakusuma (HLP)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" },
    { id: 3, maskapai: "Lion Air", logo: lionImg, jamBerangkat: "13:30", jamTiba: "15:00", harga: 550000, promo: "Hemat 50rb", hargaPromo: 500000, bandaraKeberangkatan: "Soekarno-Hatta (CGK)", bandaraTujuan: "Ngurah Rai (DPS)", durasi: "1 jam 30 menit", kelas: "Ekonomi" }
  ]
};

// ============================================================
// DATA KOTA UNTUK LOKASI FAVORIT PAKDE
// ============================================================

const daftarKotaFavorit = [
  { nama: "Jakarta", kode: "CGK", tujuanPopuler: "Bali" },
  { nama: "Bandung", kode: "BDO", tujuanPopuler: "Bali" },
  { nama: "Surabaya", kode: "SUB", tujuanPopuler: "Bali" },
  { nama: "Yogyakarta", kode: "YIA", tujuanPopuler: "Jakarta" },
  { nama: "Medan", kode: "KNO", tujuanPopuler: "Jakarta" },
  { nama: "Makassar", kode: "UPG", tujuanPopuler: "Jakarta" },
  { nama: "Semarang", kode: "SRG", tujuanPopuler: "Jakarta" },
  { nama: "Bali", kode: "DPS", tujuanPopuler: "Jakarta" }
];

function Flight() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state || {};
  const { kotaAsal = "Jakarta", kotaTujuan = "Bali", penumpang = "1 Dewasa" } = searchParams;

  // State untuk menyimpan daftar penerbangan
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKotaAsal, setSelectedKotaAsal] = useState(kotaAsal);
  const [selectedKotaTujuan, setSelectedKotaTujuan] = useState(kotaTujuan);
  const [showFavoritMessage, setShowFavoritMessage] = useState("");
  
  // ========== TAMBAHAN STATE UNTUK TANGGAL ==========
  const [tanggalBerangkat, setTanggalBerangkat] = useState("");
  const [tanggalPulang, setTanggalPulang] = useState("");
  const [jenisPenerbangan, setJenisPenerbangan] = useState("oneway");

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) navigate("/");
  }, [navigate]);

  // Effect untuk load data penerbangan
  useEffect(() => {
    const routeKey = `${selectedKotaAsal}-${selectedKotaTujuan}`;
    let flightData = flightsDatabase[routeKey];
    
    if (!flightData) {
      flightData = flightsDatabase["default"];
    }
    
    setLoading(true);
    setTimeout(() => {
      setFlights(flightData);
      setLoading(false);
    }, 500);
  }, [selectedKotaAsal, selectedKotaTujuan]);

  const handleLokasiFavorit = (kotaFavorit) => {
    const kotaData = daftarKotaFavorit.find(k => k.nama === kotaFavorit);
    
    if (kotaData) {
      setSelectedKotaAsal(kotaFavorit);
      setSelectedKotaTujuan(kotaData.tujuanPopuler);
      setShowFavoritMessage(`Lokasi favorit dipilih: ${kotaFavorit} → ${kotaData.tujuanPopuler}`);
      setTimeout(() => setShowFavoritMessage(""), 3000);
    }
  };

  const handleKotaAsalChange = (e) => {
    setSelectedKotaAsal(e.target.value);
  };

  const handleKotaTujuanChange = (e) => {
    setSelectedKotaTujuan(e.target.value);
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const routeKey = `${selectedKotaAsal}-${selectedKotaTujuan}`;
      let flightData = flightsDatabase[routeKey];
      if (!flightData) {
        flightData = flightsDatabase["default"];
      }
      setFlights(flightData);
      setLoading(false);
    }, 500);
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  const handleBook = (flight) => {
    navigate("/form-booking", { 
      state: { 
        selectedFlight: flight,
        kotaAsal: selectedKotaAsal,
        kotaTujuan: selectedKotaTujuan,
        tanggalBerangkat: tanggalBerangkat,
        tanggalPulang: jenisPenerbangan === "roundtrip" ? tanggalPulang : null,
        jenisPenerbangan: jenisPenerbangan,
        penumpang: penumpang
      } 
    });
  };

  if (loading) {
    return (
      <div className="flight-page">
        <Navbar />
        <div className="loading-container">
          <FaPlane className="loading-plane" />
          <h2>Mencari penerbangan terbaik...</h2>
          <p>{selectedKotaAsal} → {selectedKotaTujuan}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flight-page">
      <Navbar />
      <div className="flight-content">
        {/* LOKASI FAVORIT PAKDE */}
        <div className="favorit-section">
          <div className="favorit-header">
            <FaStar className="favorit-star" />
            <h2>Lokasi Favorit Pakde</h2>
          </div>
          <div className="favorit-buttons">
            {daftarKotaFavorit.map((kota) => (
              <button key={kota.nama} className="favorit-btn" onClick={() => handleLokasiFavorit(kota.nama)}>
                {kota.nama}
              </button>
            ))}
          </div>
          <p className="favorit-note">Klik salah satu kota favorit untuk mengisi keberangkatan secara otomatis</p>
        </div>

        {/* FORM PENCARIAN */}
        <div className="search-section">
          <div className="search-box">
            <div className="search-input-group">
              <label>Kota Keberangkatan</label>
              <select value={selectedKotaAsal} onChange={handleKotaAsalChange} className="search-select">
                {Object.keys(bandaraData).map((kota) => (
                  <option key={kota} value={kota}>{kota}</option>
                ))}
              </select>
            </div>
            <div className="search-arrow">
              <FaArrowLeft className="arrow-icon" />
            </div>
            <div className="search-input-group">
              <label>Kota Tujuan</label>
              <select value={selectedKotaTujuan} onChange={handleKotaTujuanChange} className="search-select">
                {Object.keys(bandaraData).map((kota) => (
                  <option key={kota} value={kota}>{kota}</option>
                ))}
              </select>
            </div>
            <button className="search-btn" onClick={handleSearch}>
              Cari Penerbangan
            </button>
          </div>

          {/* ========== TAMBAHAN FORM TANGGAL ========== */}
          <div className="date-section">
            <div className="flight-type">
              <label className="radio-label-type">
                <input 
                  type="radio" 
                  name="flightType" 
                  value="oneway" 
                  checked={jenisPenerbangan === "oneway"} 
                  onChange={() => setJenisPenerbangan("oneway")}
                />
                <span>Sekali Jalan</span>
              </label>
              <label className="radio-label-type">
                <input 
                  type="radio" 
                  name="flightType" 
                  value="roundtrip" 
                  checked={jenisPenerbangan === "roundtrip"} 
                  onChange={() => setJenisPenerbangan("roundtrip")}
                />
                <span>Pulang Pergi</span>
              </label>
            </div>

            <div className="date-input-group">
              <div className="date-input">
                <label><FaCalendarAlt /> Tanggal Berangkat</label>
                <input 
                  type="date" 
                  value={tanggalBerangkat}
                  onChange={(e) => setTanggalBerangkat(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="date-picker"
                />
              </div>
              
              {jenisPenerbangan === "roundtrip" && (
                <div className="date-input">
                  <label><FaCalendarAlt /> Tanggal Pulang</label>
                  <input 
                    type="date" 
                    value={tanggalPulang}
                    onChange={(e) => setTanggalPulang(e.target.value)}
                    min={tanggalBerangkat || new Date().toISOString().split("T")[0]}
                    className="date-picker"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pesan info lokasi favorit */}
        {showFavoritMessage && (
          <div className="favorit-message">
            <FaStar className="message-star" />
            <span>{showFavoritMessage}</span>
          </div>
        )}

        <div className="flight-header">
          <h1>
            <FaPlane className="header-icon" />
            Hasil Pencarian Pesawat
          </h1>
          <div className="search-info">
            <span>
              <GiAirplaneDeparture className="search-icon" />
              {selectedKotaAsal} → {selectedKotaTujuan}
            </span>
            <span>
              <FaClock className="search-icon" />
              {tanggalBerangkat || "Belum pilih tanggal"}
            </span>
            <span>
              <FaUser className="search-icon" />
              {penumpang}
            </span>
          </div>
        </div>

        {flights.length === 0 ? (
          <div className="no-flights">
            <FaPlane className="no-flights-icon" />
            <h3>Tidak ada penerbangan untuk rute ini</h3>
            <p>Coba cari rute lain atau tanggal yang berbeda</p>
            <button className="back-btn" onClick={() => navigate("/home")}>
              <FaArrowLeft className="back-icon" />
              Kembali ke Beranda
            </button>
          </div>
        ) : (
          <>
            <div className="flight-list">
              {flights.map((flight) => (
                <div key={flight.id} className="flight-card">
                  <div className="flight-left">
                    <img 
                      src={flight.logo} 
                      alt={flight.maskapai} 
                      className="flight-logo"
                      onError={handleImageError}
                    />
                    <div>
                      <h3>{flight.maskapai}</h3>
                      <p>
                        <MdFlightTakeoff className="time-icon" /> {flight.jamBerangkat} 
                        <FaPlane className="plane-icon-small" /> 
                        <MdFlightLand className="time-icon" /> {flight.jamTiba} 
                        <FaClock className="clock-icon" /> {flight.durasi}
                      </p>
                      <p className="airport-info">
                        <FaMapMarkerAlt className="marker-icon" />
                        {flight.bandaraKeberangkatan} → {flight.bandaraTujuan}
                      </p>
                    </div>
                  </div>
                  <div className="flight-right">
                    <div>
                      <span className="old-price">{formatRupiah(flight.harga)}</span>
                      <span className="new-price">{formatRupiah(flight.hargaPromo)}</span>
                      <span className="promo-tag">
                        <FaTag className="tag-icon" />
                        {flight.promo}
                      </span>
                    </div>
                    <button className="book-btn" onClick={() => handleBook(flight)}>
                      <FaTicketAlt className="btn-icon" />
                      Pesan Tiket
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="back-btn" onClick={() => navigate("/home")}>
              <FaArrowLeft className="back-icon" />
              Kembali
            </button>
          </>
        )}
      </div>
      <Footer />

      <style dangerouslySetInnerHTML={{ __html: flightStyles }} />
    </div>
  );
}

export default Flight;

const flightStyles = `
.flight-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
}

.flight-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 20px 60px;
}

/* FAVORIT SECTION */
.favorit-section {
  background: #1e293b;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid rgba(250, 204, 21, 0.3);
}

.favorit-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.favorit-star {
  font-size: 24px;
  color: #facc15;
}

.favorit-header h2 {
  color: #facc15;
  font-size: 20px;
  margin: 0;
}

.favorit-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 15px;
}

.favorit-btn {
  background: rgba(250, 204, 21, 0.15);
  border: 1px solid rgba(250, 204, 21, 0.5);
  padding: 10px 20px;
  border-radius: 40px;
  color: #facc15;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.favorit-btn:hover {
  background: #facc15;
  color: #0f172a;
  transform: translateY(-2px);
}

.favorit-note {
  color: #94a3b8;
  font-size: 12px;
  margin: 0;
  padding-top: 10px;
  border-top: 1px solid #334155;
}

/* SEARCH SECTION */
.search-section {
  background: #1e293b;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 30px;
}

.search-box {
  display: flex;
  align-items: flex-end;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.search-input-group {
  flex: 1;
  min-width: 150px;
}

.search-input-group label {
  display: block;
  color: #94a3b8;
  font-size: 12px;
  margin-bottom: 5px;
}

.search-select {
  width: 100%;
  padding: 12px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.search-select:focus {
  outline: none;
  border-color: #facc15;
}

.search-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
}

.arrow-icon {
  color: #facc15;
  font-size: 20px;
  transform: rotate(180deg);
}

.search-btn {
  background: #f59e0b;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.3s;
}

.search-btn:hover {
  background: #facc15;
  transform: scale(1.02);
}

/* DATE SECTION */
.date-section {
  border-top: 1px solid #334155;
  padding-top: 20px;
  margin-top: 20px;
  background: #1e293b;  /* ← tambah ini */
  border-radius: 12px;
  padding: 15px;
}

.flight-type {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.radio-label-type {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  cursor: pointer;
}

.radio-label-type input {
  cursor: pointer;
}

.date-input-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.date-input {
  flex: 1;
  min-width: 100px;
}

.date-input label {
  display: block;
  color: #94a3b8;
  font-size: 12px;
  margin-bottom: 5px;
}

.date-picker {
  width: 100%;
  padding: 12px;
  background: #334155; 
  border: 1px solid #334155;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.date-picker:focus {
  outline: none;
  border-color: #facc15;
}

/* FAVORIT MESSAGE */
.favorit-message {
  background: rgba(250, 204, 21, 0.1);
  border-left: 4px solid #facc15;
  padding: 12px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-star {
  color: #facc15;
  font-size: 16px;
}

.favorit-message span {
  color: #facc15;
  font-size: 14px;
}

/* LOADING */
.loading-container {
  text-align: center;
  padding: 150px 20px;
  color: white;
}

.loading-plane {
  font-size: 60px;
  color: #facc15;
  animation: fly 1.5s ease-in-out infinite;
  margin-bottom: 20px;
}

@keyframes fly {
  0% { transform: translateX(-20px) rotate(-10deg); }
  50% { transform: translateX(20px) rotate(10deg); }
  100% { transform: translateX(-20px) rotate(-10deg); }
}

.loading-container h2 {
  color: #facc15;
  margin-bottom: 10px;
}

/* NO FLIGHTS */
.no-flights {
  text-align: center;
  padding: 80px 20px;
  background: #1e293b;
  border-radius: 24px;
  color: white;
}

.no-flights-icon {
  font-size: 60px;
  color: #64748b;
  margin-bottom: 20px;
}

.no-flights h3 {
  color: #facc15;
  margin-bottom: 10px;
}

.no-flights p {
  color: #94a3b8;
  margin-bottom: 30px;
}

/* FLIGHT HEADER */
.flight-header {
  text-align: center;
  margin-bottom: 40px;
}

.flight-header h1 {
  color: #facc15;
  font-size: 40px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.header-icon {
  font-size: 36px;
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
  flex-wrap: wrap;
}

.search-info span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-icon {
  font-size: 12px;
  color: #facc15;
}

/* FLIGHT LIST */
.flight-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.flight-card {
  background: #1e293b;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.flight-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

.flight-left {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 2;
}

.flight-logo {
  width: 120px;
  height: 55px;
  object-fit: contain;
  background: white;
  border-radius: 12px;
  padding: 5px;
}

.flight-left h3 {
  color: white;
  font-size: 16px;
  margin-bottom: 4px;
}

.flight-left p {
  color: #94a3b8;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.time-icon {
  font-size: 12px;
  color: #f59e0b;
}

.plane-icon-small {
  font-size: 10px;
  color: #facc15;
  margin: 0 4px;
}

.clock-icon {
  font-size: 11px;
  color: #64748b;
  margin-left: 4px;
}

.airport-info {
  font-size: 15px !important;
  color: #64748b !important;
  margin-top: 4px;
  display: flex !important;
  align-items: center;
  gap: 6px;
}

.marker-icon {
  font-size: 11px;
  color: #f59e0b;
}

.flight-right {
  text-align: right;
  flex: 1;
}

.old-price {
  color: #94a3b8;
  font-size: 14px;
  text-decoration: line-through;
  display: block;
}

.new-price {
  color: #facc15;
  font-weight: 700;
  font-size: 18px;
}

.promo-tag {
  background: #f59e0b;
  color: #0f172a;
  font-size: 14px;
  padding: 2px 8px;
  border-radius: 20px;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.tag-icon {
  font-size: 10px;
}

.book-btn {
  background: #f59e0b;
  border: none;
  padding: 10px 24px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.2s;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-icon {
  font-size: 14px;
}

.book-btn:hover {
  background: #fbbf24;
  transform: scale(1.02);
}

.back-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 10px 24px;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 30px auto 0;
  transition: 0.2s;
}

.back-icon {
  font-size: 14px;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* RESPONSIVE */
@media (max-width: 700px) {
  .flight-card {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .flight-right {
    text-align: left;
    width: 100%;
  }
  
  .flight-right div {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .old-price {
    display: inline;
  }
  
  .flight-header h1 {
    font-size: 28px;
  }
  
  .header-icon {
    font-size: 28px;
  }
  
  .search-box {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-arrow {
    transform: rotate(90deg);
    padding: 5px 0;
  }
  
  .arrow-icon {
    transform: rotate(0deg);
  }
  
  .favorit-buttons {
    justify-content: center;
  }
  
  .date-input-group {
    flex-direction: column;
  }
  
  .search-info {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
}
`;

if (typeof document !== "undefined") {
  const existingStyle = document.getElementById("flight-styles");
  if (existingStyle) {
    existingStyle.textContent = flightStyles;
  } else {
    const styleTag = document.createElement("style");
    styleTag.id = "flight-styles";
    styleTag.textContent = flightStyles;
    document.head.appendChild(styleTag);
  }
}