import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import Swal from "sweetalert2";
import EditUser from "./EditUser";
import { useSelector } from "react-redux";

function Index() {
  const [data, setData] = useState();
  const state = useSelector((state) => state.rootReducer.data);

  const getUsers = async () => {
    try {
      const res = await ApiServices.getUsers(state.userId);
      setData(res);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(data);

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
          await ApiServices.deleteUserById(id);
          Swal.fire("Terhapus!", "Data Berhasil Dihapus.", "success");
          getUsers();
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (Array.isArray(data)) {
    return (
      <div>
        <div className="table-responsive mt-3 mb-5">
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr className="text-center">
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th> Edit | Hapus</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, i) => (
                <tr className="text-center">
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Link
                        to={`/my-account/edit/${item.id}`}
                        className="px-2  bg-warning rounded cpointer text-dark"
                      >
                        <MdModeEdit />
                      </Link>
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
      </div>
    );
  } else {
    return <EditUser user={data} />;
  }
}

export default Index;
