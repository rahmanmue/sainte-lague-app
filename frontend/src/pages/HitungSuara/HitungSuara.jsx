import Result from "../HitungSuara/Result";
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

function HitungSuara() {
  const state = useSelector((state) => state.rootReducer.data);

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const baseData = {
    daerah_pemilihan: "",
    kabupaten_kota: "",
    alokasi_kursi: null,
    provinsi: "",
    tahun: null,
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
      label: "Provinsi",
      name: "provinsi",
      type: "text",
      placeholder: "Masukan Provinsi",
      onChange: handleInputChange,
      value: data?.provinsi,
    },
    {
      label: "Tahun",
      name: "tahun",
      type: "number",
      placeholder: "Masukan Tahun",
      onChange: handleInputChange,
      value: data?.tahun,
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

  const [dapil, setDapil] = useState([]);
  // console.log(state.userId);
  const getAllDapil = async () => {
    try {
      const response = await ApiServices.getAllDapil(state.userId);
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
    const postData = {
      daerah_pemilihan: data.daerah_pemilihan,
      kabupaten_kota: data.kabupaten_kota,
      provinsi: data.provinsi,
      tahun: data.tahun,
      alokasi_kursi: data.alokasi_kursi,
      user_id: state?.userId,
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

  useEffect(() => {
    getAllDapil();
  }, []);

  return (
    <div>
      <button className="btn btn-primary fw-semibold" onClick={handleAdd}>
        Tambah Dapil
      </button>
      <ModalCustom handleClose={handleClose} show={show} title={title}>
        <form className=" mb-3" onSubmit={onSubmit}>
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
