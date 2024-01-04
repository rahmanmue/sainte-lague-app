import { useEffect, useState } from "react";
import Input from "../../components/Input/Index";
import { useNavigate, useParams } from "react-router-dom";
import ApiServices from "../../services/ApiServices";
import Swal from "sweetalert2";
import { isRole } from "../../utils";
import Select from "../../components/Select/Index";

function EditAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    nama: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "",
  });

  const getUserById = async () => {
    try {
      const res = await ApiServices.getUsersById(id);
      console.log(res);
      setData({
        id: res.id,
        nama: res.name,
        email: res.email,
        role: res.role,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  const [errMsg, setErrMsg] = useState({
    nama: "",
    password: "",
    confirm_password: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const regexNama = /^[A-Za-z ]*$/;
    const regexPassword = /^(?=.*\d)[a-zA-Z\d]{4,}$/;

    if (name === "nama") {
      regexNama.test(value)
        ? setErrMsg({ ...errMsg, nama: "" })
        : setErrMsg({ ...errMsg, nama: "Nama Harus Berupa Huruf" });
    } else if (name === "password") {
      regexPassword.test(value)
        ? setErrMsg({ ...errMsg, password: "" })
        : setErrMsg({
            ...errMsg,
            password: "Password terdiri 4 Karakter gabungan Angka dan Huruf",
          });
    } else if (name === "confirm_password") {
      value !== data.password
        ? setErrMsg({
            ...errMsg,
            confirm_password: "Konfirmasi Password tidak sama dengan Password",
          })
        : setErrMsg({ ...errMsg, confirm_password: "" });
    }
    setData({
      ...data,
      [name]: value,
    });
  };

  const formInput = [
    {
      label: "Name",
      name: "nama",
      type: "text",
      placeholder: "name",
      onChange: handleInputChange,
      errMsg: errMsg.nama,
      value: data?.nama,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "name@example.com",
      onChange: handleInputChange,
      errMsg: errMsg.email,
      value: data?.email,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "*******",
      onChange: handleInputChange,
      value: data?.password,
      errMsg: errMsg.password,
    },
    {
      label: "Confirm Password",
      name: "confirm_password",
      type: "password",
      placeholder: "*******",
      onChange: handleInputChange,
      value: data?.confirm_password,
      errMsg: errMsg.confirm_password,
    },
  ];

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    let postData;
    if (data.password === "" && errMsg.password !== "") {
      postData = {
        name: data.nama,
        email: data.email,
        role: data.role,
      };
    } else {
      postData = {
        name: data.nama,
        email: data.email,
        password: data.password,
        role: data.role,
      };
    }

    console.log(postData);

    try {
      await ApiServices.updateUserById(data.id, postData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Telah DiEdit",
        showConfirmButton: false,
        timer: 1000,
      });
      // navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const propsSelect = {
    label: "Status Akun",
    name: "role",
    value: data?.role,
    options: [
      {
        value: "admin",
      },
      {
        value: "user",
      },
    ],
    onChange: (e) =>
      setData({
        ...data,
        role: e.target.value,
      }),
  };

  console.log(data);

  return (
    <div className="d-flex justify-content-center d-md-block">
      <div className="card rounded border-0 w-75 ">
        <div className="py-3 px-md-2">
          {/* <h4 className="card-title text-center fw-bold mb-4">Edit Account</h4> */}
          <form action="" onSubmit={onSubmitEdit}>
            {formInput.map((item, i) => (
              <Input props={item} key={i} />
            ))}
            {isRole(localStorage.getItem("hashCode")) === "admin" ? (
              <Select props={propsSelect} />
            ) : (
              ""
            )}
            <button
              type="submit"
              className="bg-orange text-white w-100 fw-semibold  mb-md-3 mt-md-2 border-0 py-2 rounded"
            >
              Edit Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAdmin;
