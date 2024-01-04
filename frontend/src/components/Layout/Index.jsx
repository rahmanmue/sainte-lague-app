import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineCalculator } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { destroyUser } from "../../store/reducers";

function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState("home");

  const getTitle = (link) => {
    if (link === "home") {
      return "Metode Sainte Lague Dalam Pemilihan Umum";
    } else if (link === "hitung-suara") {
      return "Perhitungan Suara Dengan Sainte Lague";
    } else if (link === "my-account") {
      return "My Account";
    }
  };

  const activeLink = (link) => {
    if (link === location.pathname.split("/")[1]) {
      return "bg-light-blue";
    } else {
      return "";
    }
  };

  const LISTMENU = [
    {
      menu: "Home",
      to: "/home",
      icon: <HiOutlineHome className="fs-4 icon" />,
    },
    {
      menu: "Hitung Suara (SL)",
      to: "/hitung-suara",
      icon: <AiOutlineCalculator className="fs-4 icon" />,
    },
    {
      menu: "My Account",
      to: "/my-account",
      icon: <BiUserCircle className="fs-4 icon" />,
    },
  ];

  const handleLogout = () => {
    dispatch(destroyUser());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container-fluid overflow-hidden">
      <div className="row overflow-auto nav-dashboard">
        <div className="col-12 col-sm-3 col-xl-2 bg-dark-blue d-flex sticky-top p-sm-0 py-3">
          <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start text-white">
            <ul
              className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 justify-content-center align-items-center align-items-sm-start w-100 mt-sm-5 menu-sidebar"
              id="menu"
            >
              {LISTMENU.map((item, i) => (
                <li
                  className={`${activeLink(item.to.split("/")[1])} list-menu`}
                  key={i}
                >
                  <Link
                    to={item.to}
                    className="text-decoration-none text-white fw-semibold d-flex align-items-center py-2"
                    onClick={() => setActive(item.to.split("/")[1])}
                  >
                    {item.icon}
                    <span className="ms-md-2 d-none d-sm-inline">
                      {item.menu}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
              <div
                className="d-flex align-items-center text-white text-decoration-none fw-semibold ps-2 cpointer"
                onClick={() => handleLogout()}
              >
                <LiaSignOutAltSolid className="fs-4 icon" />
                <span className="d-none d-sm-inline ms-2">Keluar</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col d-flex flex-column h-sm-100 ps-0">
          <main className="row overflow-auto">
            <div className="col-12 shadow-sm w-100 ps-4">
              <h3 className="fw-bold text-capitalize pt-4 pb-3 nav-title">
                {getTitle(active)}
              </h3>
            </div>
            <div className="col px-md-4 mt-4">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
