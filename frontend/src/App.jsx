import Register from "./pages/Register/Index";
import Login from "./pages/Login/Index";
import Home from "./pages/Home/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout/Index";
import HitungSuara from "./pages/HitungSuara/HitungSuara";
import MyAccount from "./pages/MyAccount";
import EditAdmin from "./pages/MyAccount/EditAdmin";
import DataSuara from "./pages/DataSuara/index";
import TambahDataSuara from "./pages/DataSuara/Add";
import EditDataSuara from "./pages/DataSuara/Edit";
import { ProtectedRoutes, PublicRoute } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hitung-suara" element={<HitungSuara />} />
          <Route
            path="/hitung-suara/data-suara-dapil/:id"
            element={<DataSuara />}
          />
          <Route
            path="/hitung-suara/data-suara/:dapil/:id/tambah"
            element={<TambahDataSuara />}
          />
          <Route
            path="/hitung-suara/data-suara/:dapil/:id/edit"
            element={<EditDataSuara />}
          />

          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-account/edit/:id" element={<EditAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
