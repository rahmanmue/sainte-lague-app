import { useState } from "react";
import Input from "../../components/Input/Index";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import ApiServices from "../../services/ApiServices";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/reducers";
import { hashStr } from "../../utils";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const [errmsg, setErrMsg] = useState();

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
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "name@example.com",
      onChange: handleInputChange,
      value: data.email,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "*******",
      onChange: handleInputChange,
      value: data.password,
    },
  ];

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        email: data.email,
        password: data.password,
      };
      const res = await ApiServices.login(postData);
      if (!res?.msg) {
        const decoded = jwtDecode(res.accessToken);
        dispatch(addUser(decoded));
        localStorage.setItem("hashCode", hashStr(decoded.role));
        navigate("/home");
      } else {
        setErrMsg(res.msg);
        setShow(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-dark-blue min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card rounded access">
        <div className="card-body px-md-5 px-4 py-3">
          <div className="mt-2 mb-4 ">
            <h5 className="card-title fw-bold fs-3 m-0">Login</h5>
            <span>
              Don't have account ? <Link to="/register">Register here</Link>
            </span>
          </div>
          <form action="" onSubmit={handleSubmitLogin}>
            {formInput.map((item, i) => (
              <Input props={item} key={i} />
            ))}

            {show ? (
              <Alert
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                {errmsg}
              </Alert>
            ) : (
              ""
            )}

            <button
              type="submit"
              className="bg-orange text-white w-100 fw-semibold mb-md-3 mt-md-2 border-0 py-2 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
