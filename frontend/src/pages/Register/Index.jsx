import { useState } from "react";
import Input from "../../components/Input/Index";
import ApiServices from "../../services/ApiServices";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    nama: "",
    email: "",
    password: "",
    confirm_password: "",
  });

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
      value: data.nama,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "name@example.com",
      onChange: handleInputChange,
      errMsg: errMsg.email,
      value: data.email,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "*******",
      onChange: handleInputChange,
      value: data.password,
      errMsg: errMsg.password,
    },
    {
      label: "Confirm Password",
      name: "confirm_password",
      type: "password",
      placeholder: "*******",
      onChange: handleInputChange,
      value: data.confirm_password,
      errMsg: errMsg.confirm_password,
    },
  ];

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        name: data.nama,
        email: data.email,
        password: data.password,
        confPassword: data.confirm_password,
        role: "user",
      };
      const res = await ApiServices.register(postData);
      // console.log("result : ", res);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-dark-blue min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card rounded access">
        <div className="card-body px-md-5 px-4 py-3">
          <h5 className="card-title text-center fw-bold fs-3 mb-4">
            Register Account
          </h5>
          <form onSubmit={onSubmitRegister}>
            {formInput.map((item, i) => (
              <Input props={item} key={i} />
            ))}
            <button
              type="submit"
              className="bg-orange text-white w-100 fw-semibold  mb-md-3 mt-md-2 border-0 py-2 rounded"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
