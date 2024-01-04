import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiServices from "../../services/ApiServices";
import Swal from "sweetalert2";

function List({ no, handleInputChange }) {
  return (
    <>
      <td className="text-center">{no}</td>
      <td>
        <input
          type="text"
          className="form-control"
          placeholder="Masukan Nama Partai Politik"
          name={`inputParpol${no}`}
          onChange={handleInputChange}
        />
      </td>

      <td>
        <input
          type="number"
          className="form-control"
          placeholder="Masukan Total Suara Sah"
          name={`inputSuara${no}`}
          onChange={handleInputChange}
        />
      </td>
    </>
  );
}

function Add() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [num, setNum] = useState(0);
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState([]);

  function separateObjects(dataInput) {
    const jumlahObjek = Object.keys(dataInput).length / 2;
    const arrayObjek = [];

    for (let i = 1; i <= jumlahObjek; i++) {
      const objek = {
        nama_parpol: dataInput[`inputParpol${i}`],
        total_suara_sah: dataInput[`inputSuara${i}`],
        daerah_pemilihan_id: id,
      };
      arrayObjek.push(objek);
    }

    return arrayObjek;
  }

  const addData = async () => {
    const postData = separateObjects(inputData);
    try {
      await ApiServices.createBulkSuaraParpol(postData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Telah Ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/hitung-suara/data-suara-dapil/${id}`);
    } catch (error) {
      console.error(error);
    }
    console.log(data);
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputData((prevState) => ({ ...prevState, [name]: value }));
  };

  //   console.log(inputData);

  const handleAddPartai = () => {
    setData(
      Array(Number(num))
        .fill()
        .map((_, i) => i + 1)
    );
  };

  return (
    <div className="px-4">
      <div className="input-group mb-3 ms-auto input-right">
        <input
          type="text"
          className="form-control"
          placeholder="Masukan Jumlah Partai"
          onChange={(e) => setNum(e.target.value)}
        />
        <span
          className="input-group-text btn btn-warning fw-semibold"
          onClick={() => handleAddPartai()}
        >
          Tambah
        </span>
      </div>

      <div className="mt-4">
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th className="text-center">No</th>
              <th>Nama Partai Politik</th>
              <th>Total Suara Sah</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((_, i) => (
              <tr key={i}>
                <List no={_} handleInputChange={handleInputChange} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length > 0 ? (
        <button
          className="btn btn-primary fw-semibold ms-auto d-block mb-4"
          onClick={() => addData()}
        >
          Simpan Data
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Add;
