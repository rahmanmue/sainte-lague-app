import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import HeroImage from "../assets/hero.png";
import Term from "../assets/term.png";

const HomePage = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="py-3 bg-dark-blue ">
        <Container>
          <Navbar.Brand href="/" className="fs-5 text-white fw-bold">
            Sainte Lague App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className="ms-auto">
              <Link
                to="/register"
                className="pe-lg-3 text-white fw-semibold fs-5"
              >
                Daftar
              </Link>
              <Link
                to="/login"
                className="text-white fw-semibold fs-5 rounded-pill w-100 py-2 px-4 text-center"
              >
                Masuk
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section id="hero">
        <div className="container">
          <div className="flex-content align-items-center row mb-5">
            <div className="col-md-6">
              <img src={HeroImage} className="my-2 img-fluid" alt="image" />
            </div>
            <div className="col-md-6">
              <h1 className="fw-bold">
                Rumus Perhitungan Pembagian Kursi Partai Politik Dengan Sainte
                Lague
              </h1>

              <p>
                Cari tahu bagaimana Perolehan Kursi Partai Politik dengan Rumus
                Sainte Lague Klik Masuk Sekarang untuk Memulai Perhitungan
              </p>

              <Link
                to="/login"
                className="bg-dark-blue text-white fw-bold rounded py-2 px-4 text-center d-inline-block"
              >
                Masuk Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 " style={{ backgroundColor: "#eaf0fc" }}>
        <Container>
          <h3 className="fw-bold text-center mb-3">Apa itu Sainte Lague?</h3>
          <p>
            Mengutip laman Bawaslu Jombang, Sainte Lague adalah metode konversi
            perolehan suara partai politik ke kursi parlemen atau metode untuk
            menentukan perolehan kursi partai politik di DPR atau DPRD.
            Penerapan metode didasarkan pada perolehan suara terbanyak partai
            politik dari hasil pembagian yang diurutkan sesuai dengan jumlah
            ketersediaan kursi di setiap dapil. Sainte Lague menggunakan
            bilangan pembagi suara berangka ganjil (1, 3, 5, 7, 9 dan
            seterusnya) untuk mendapatkan kursi. Dasar hukum penerapan metode
            ini adalah UU nomor 7 tahun 2017 pasal 415 ayat 2
          </p>
        </Container>
      </section>

      <section className="my-5">
        <Container>
          <div className="row">
            <h3 className="fw-bold">Dasar Hukum</h3>
            <div className="col md-6">
              <img src={Term} className="img-fluid" alt="" />
            </div>
            <div className="col-md-6">
              <p>Pasal 414</p>
              <ol style={{ listStyleType: "none" }}>
                <li>
                  (1) Partai politik peserta pemilu harus memenuhi ambang batas
                  perolehan suara paling sedikit 4% dari jumlah suara sah secara
                  nasional untuk diikutkan dalam penentuan kursi anggota DPR.
                </li>
                <li>
                  (2) Seluruh partai politik peserta pemilu diikutkan dalam
                  penentuan perolehan kursi anggota DPRD provinsi dan DPRD
                  (kabupaten/kota)
                </li>
              </ol>
              <p>Pasal 415</p>
              <ol style={{ listStyleType: "none" }}>
                <li>
                  (2) Dalam hal penghitungan perolehan kursi DPR, suara sah
                  setiap partai politik yang memenuhi ambang batas perolehan
                  suara dibagi dengan bilangan pembagi 1 dan diikuti secara
                  berurutan oleh bilangan ganjil 3, 5, 7, dan seterusnya.
                </li>
                <li>
                  (3) Dalam hal penghitungan perolehan kursi DPRD provinsi dan
                  DPRD kabupaten/kota, suara sah setiap partai politik dibagi
                  dengan bilangan pembagi 1 dan diikuti secara berurutan oleh
                  bilangan ganjil 3, 5, 7, dan seterusnya.
                </li>
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <footer className="py-3 fs-5 bg-dark-blue text-white">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <small className="d-block">
                &copy; {year} Sainte Lague App. All Right Reserved.
              </small>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
