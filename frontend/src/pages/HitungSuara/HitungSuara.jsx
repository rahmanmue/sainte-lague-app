import { MdModeEdit } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import ModalCustom from "../../components/Modal/Index";
import { useEffect, useState } from "react";
import Input from "../../components/Input/Index";
import { Link } from "react-router-dom";
import ApiServices from "../../services/ApiServices";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { PROVINSI, getAllYears } from "../../utils";
import Select from "../../components/Select/Index";
import { jwtDecode } from "jwt-decode";

function HitungSuara() {
  const state = useSelector((state) => state.rootReducer.data);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const baseData = {
    daerah_pemilihan: "",
    kabupaten_kota: "",
    alokasi_kursi: 0,
    provinsi: "Pilih Provinsi Yang Tersedia",
    tahun: new Date().getFullYear(),
  };
  const [data, setData] = useState(baseData);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  const formInput = [
    {
      label: "Daerah Pemilihan",
      name: "daerah_pemilihan",
      type: "text",
      placeholder: "Masukan Daerah Pemilihan",
      onChange: handleInputChange,
      value: data?.daerah_pemilihan,
    },
    {
      label: "Kabupaten/Kota",
      name: "kabupaten_kota",
      type: "text",
      placeholder: "Masukan Kabupaten/Kota",
      onChange: handleInputChange,
      value: data?.kabupaten_kota,
    },
    {
      label: "Alokasi Kursi",
      name: "alokasi_kursi",
      type: "number",
      placeholder: "Masukan Alokasi Kursi",
      onChange: handleInputChange,
      value: data?.alokasi_kursi,
    },
  ];

  const propsProvinsi = {
    label: "Provinsi",
    name: "provinsi",
    value: data?.provinsi,
    options: PROVINSI,
    onChange: (e) =>
      setData({
        ...data,
        provinsi: e.target.value,
      }),
  };

  const propsTahun = {
    label: "Tahun",
    name: "tahun",
    value: data?.tahun,
    options: getAllYears(),
    onChange: (e) =>
      setData({
        ...data,
        tahun: e.target.value,
      }),
  };

  const [dapil, setDapil] = useState([]);
  // console.log(state.userId);
  const getAllDapil = async () => {
    try {
      const decoded = jwtDecode(localStorage.getItem("token"));
      const userId = state.userId ?? decoded.userId;
      const response = await ApiServices.getAllDapil(userId);
      setDapil(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    setData(baseData);
    setTitle("tambah");
    handleShow();
  };

  const handleEdit = async (id) => {
    try {
      const response = await ApiServices.getDapilById(id);
      setData(response);
      setTitle("edit");
      handleShow();
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const decoded = jwtDecode(localStorage.getItem("token"));
    const userId = state.userId ?? decoded.userId;
    const postData = {
      daerah_pemilihan: data.daerah_pemilihan,
      kabupaten_kota: data.kabupaten_kota,
      provinsi: data.provinsi,
      tahun: data.tahun,
      alokasi_kursi: data.alokasi_kursi,
      user_id: userId,
    };
    if (title === "tambah") {
      try {
        await ApiServices.createDapil(postData);
      } catch (error) {
        console.error;
      }
    } else if (title === "edit") {
      try {
        await ApiServices.updateDapilById(data.id, postData);
      } catch (error) {
        console.error;
      }
    }
    getAllDapil();
    handleClose();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Kamu Yakin?",
      text: "Data Dihapus Permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus Saja!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await ApiServices.deleteDapilById(id);
          // console.log(response);
          Swal.fire("Terhapus!", "Data Berhasil Dihapus.", "success");
          getAllDapil();
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  // const [provinsi, setProvinsi] = useState([]);
  // const getDataProvinsi = async () => {
  //   const url = "https://api.binderbyte.com/wilayah/provinsi";
  //   const apiKey =
  //     "38c5080c97a388d63e7eb08c5b9ecb85499f9048da384983aebfc9853daffde3";

  //   await axios
  //     .get(url, { params: { api_key: apiKey } })
  //     .then((response) => {
  //       // Handle response data di sini
  //       // console.log(response.data.value);
  //       setProvinsi(response.data.value);
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         // The request was made and the server responded with a status code
  //         // that falls out of the range of 2xx
  //         console.error(
  //           "Server responded with non-2xx status:",
  //           error.response.status
  //         );
  //         console.error("Response data:", error.response.data);
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         console.error("No response received from the server");
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.error("Error setting up the request:", error.message);
  //       }
  //     });
  // };

  useEffect(() => {
    getAllDapil();
    // getDataProvinsi();
  }, []);

  return (
    <div>
      <button className="btn btn-primary fw-semibold" onClick={handleAdd}>
        Tambah Dapil
      </button>
      <ModalCustom handleClose={handleClose} show={show} title={title}>
        <form className=" mb-3" onSubmit={onSubmit}>
          <Select props={propsProvinsi} />
          <Select props={propsTahun} />
          {formInput.map((item, i) => (
            <Input props={item} key={i} />
          ))}

          <button type="submit" className="btn btn-primary fw-semibold w-100">
            Tambah
          </button>
        </form>
      </ModalCustom>
      <div className="table-responsive mt-3 mb-5">
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr className="text-center">
              <th>No</th>
              <th>Daerah Pemilihan</th>
              <th>Alokasi Kursi</th>
              <th> Edit | Hapus</th>
              <th>Lihat Data Suara</th>
            </tr>
          </thead>
          <tbody>
            {dapil?.map((item, i) => (
              <tr className="text-center" key={i}>
                <td>{i + 1}</td>
                <td>{item.daerah_pemilihan}</td>
                <td>{item.alokasi_kursi}</td>
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <span
                      className="px-2  bg-warning rounded cpointer"
                      onClick={() => handleEdit(item.id)}
                    >
                      <MdModeEdit />
                    </span>
                    <span
                      className="px-2  bg-danger rounded cpointer text-white"
                      onClick={() => handleDelete(item.id)}
                    >
                      <IoMdTrash />
                    </span>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-center">
                    <Link
                      to={`/hitung-suara/data-suara-dapil/${item.id}`}
                      className="px-2  bg-primary text-white rounded cpointer"
                    >
                      <FaBox />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HitungSuara;
