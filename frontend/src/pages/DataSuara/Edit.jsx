import { useEffect, useState } from "react";
import ModalCustom from "../../components/Modal/Index";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import Input from "../../components/Input/Index";
import { useParams } from "react-router-dom";
import ApiServices from "../../services/ApiServices";
import Swal from "sweetalert2";

function Edit() {
  const { id } = useParams();
  const [dataSuaraPartai, setDataSuaraPartai] = useState();
  const getParpol = async () => {
    try {
      const res = await ApiServices.getParpolByDapil(id);
      setDataSuaraPartai(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getParpol();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [inputData, setInputData] = useState([]);
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputData({ ...inputData, [name]: value });
  };

  const handleEdit = async (id) => {
    try {
      const res = await ApiServices.getSuaraParpolById(id);
      setInputData(res);
    } catch (error) {
      console.error(error);
    }
    handleShow();
  };

  const formInput = [
    {
      label: "Nama Partai Politik",
      name: "nama_parpol",
      type: "text",
      onChange: handleInputChange,
      value: inputData?.nama_parpol,
    },
    {
      label: "Total Suara Sah",
      name: "total_suara_sah",
      type: "number",
      onChange: handleInputChange,
      value: inputData?.total_suara_sah,
    },
  ];

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    const postData = {
      daerah_pemilihan_id: id,
      nama_parpol: inputData.nama_parpol,
      total_suara_sah: inputData.total_suara_sah,
    };
    try {
      await ApiServices.updateSuaraParpolById(inputData.id, postData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Telah DiEdit",
        showConfirmButton: false,
        timer: 800,
      });
    } catch (error) {
      console.error(error);
    }
    getParpol();
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
          await ApiServices.deleteSuaraParpolById(id);
          Swal.fire("Terhapus!", "Data Berhasil Dihapus.", "success");
          getParpol();
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="px-4">
      <div className="mt-4">
        <table className="table table-bordered ">
          <thead>
            <tr className="text-center">
              <th>No</th>
              <th>Nama Partai Politik</th>
              <th>Total Suara Sah</th>
              <th>Edit | Hapus</th>
            </tr>
          </thead>
          <tbody>
            {dataSuaraPartai?.map((item, i) => (
              <tr key={i} className="text-center">
                <td>{i + 1}</td>
                <td>{item.nama_parpol}</td>
                <td>{item.total_suara_sah}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalCustom handleClose={handleClose} show={show} title={"Edit"}>
        <form className=" mb-3" onSubmit={onSubmitEdit}>
          {formInput.map((item, i) => (
            <Input props={item} key={i} />
          ))}

          <button type="submit" className="btn btn-warning fw-semibold w-100">
            Edit
          </button>
        </form>
      </ModalCustom>
    </div>
  );
}

export default Edit;
