import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import ApiServices from "../../services/ApiServices";
import Result from "../HitungSuara/Result";

function Index() {
  const { id } = useParams();
  const [dataSuaraPartai, setDataSuaraPartai] = useState([]);
  const [dapil, setDapil] = useState([]);
  const getParpol = async () => {
    try {
      const res = await ApiServices.getParpolByDapil(id);
      setDataSuaraPartai(res);
    } catch (error) {
      console.error(error);
    }
  };

  const getDapil = async () => {
    try {
      const res = await ApiServices.getDapilById(id);
      setDapil(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDapil();
    getParpol();
  }, []);

  const infoDapil = [
    {
      label: "Daerah Pemilihan",
      value: dapil?.daerah_pemilihan,
    },
    {
      label: "[Kabupaten/Kota]",
      value: dapil?.kabupaten_kota,
    },
    {
      label: "Provinsi",
      value: dapil?.provinsi,
    },
    {
      label: "Tahun",
      value: dapil?.tahun,
    },
    {
      label: "Alokasi Kursi",
      value: dapil?.alokasi_kursi,
    },
  ];

  let componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Cetak Suara Parpol",
    onPrintError: () => alert("there is an error when printing"),
  });

  // const arrData = [
  //   {
  //     nama_parpol: "pkb",
  //     total_suara_sah: 2210,
  //   },
  //   {
  //     nama_parpol: "gerindra",
  //     total_suara_sah: 9770,
  //   },
  //   {
  //     nama_parpol: "pdip",
  //     total_suara_sah: 8023,
  //   },
  //   {
  //     nama_parpol: "golkar",
  //     total_suara_sah: 9303,
  //   },
  //   {
  //     nama_parpol: "nasdem",
  //     total_suara_sah: 2842,
  //   },
  //   {
  //     nama_parpol: "garuda",
  //     total_suara_sah: 129,
  //   },
  //   {
  //     nama_parpol: "berkarya",
  //     total_suara_sah: 638,
  //   },
  //   {
  //     nama_parpol: "pks",
  //     total_suara_sah: 8202,
  //   },
  //   {
  //     nama_parpol: "perindo",
  //     total_suara_sah: 1501,
  //   },
  //   {
  //     nama_parpol: "ppp",
  //     total_suara_sah: 3880,
  //   },
  //   {
  //     nama_parpol: "psi",
  //     total_suara_sah: 971,
  //   },
  //   {
  //     nama_parpol: "pan",
  //     total_suara_sah: 4732,
  //   },
  //   {
  //     nama_parpol: "hanura",
  //     total_suara_sah: 4373,
  //   },
  //   {
  //     nama_parpol: "demokrat",
  //     total_suara_sah: 8408,
  //   },
  //   {
  //     nama_parpol: "pbb",
  //     total_suara_sah: 1203,
  //   },
  //   {
  //     nama_parpol: "pkpi",
  //     total_suara_sah: 56,
  //   },
  // ];

  return (
    <>
      <div className="d-flex flex-wrap gap-2 container">
        <Link
          to={`/hitung-suara/data-suara/sukabumi/${dapil?.id}/tambah`}
          className="btn btn-primary fw-semibold"
        >
          Tambah Data Suara
        </Link>
        <Link
          to={`/hitung-suara/data-suara/sukabumi/${dapil?.id}/edit`}
          className="btn btn-warning fw-semibold"
        >
          Edit | Hapus
        </Link>

        <button
          className="btn btn-success text-white fw-semibold"
          onClick={handlePrint}
        >
          <FaPrint /> Cetak
        </button>
      </div>
      <div className="px-3 fw-semibold mb-5 page-break" ref={componentRef}>
        <h3 className="fw-semibold mt-3">Perolehan Kursi Partai Politik</h3>
        <table className="my-3 ">
          <tbody>
            {infoDapil.map((item, i) => (
              <tr key={i} className="fs-6">
                <td>{item.label}</td>
                <td className="ps-5 pe-3">:</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {dataSuaraPartai?.length === 0 ? (
          <h4 className="fw-bold">Data Masih Kosong </h4>
        ) : (
          <Result
            dataSuara={dataSuaraPartai ?? []}
            alokasiKursi={dapil?.alokasi_kursi}
          />
          // <Result dataSuara={arrData} alokasiKursi={12} />
        )}
      </div>
    </>
  );
}

export default Index;
