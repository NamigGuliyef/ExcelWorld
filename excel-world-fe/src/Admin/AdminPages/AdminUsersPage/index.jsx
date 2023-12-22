import { Link, useNavigate } from "react-router-dom";
import AdminWrapper from "../../AdminComponents/AdminWrapper";
import { useContext, useEffect, useState } from "react";

import { getUsers } from "../../../api/functions";
import { SnackBarContext } from "../../../Context/Snackbar";
import { deleteCookie } from "../../../utils/setCokie";

const AdminUsersPage = () => {
  const setNotify = useContext(SnackBarContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then((res) => {
        if (res.status === 401) {
          deleteCookie(["token", "role"]);
          navigate("/admin-login");
        } else {
          const { success, message, allUsers } = res;

          setNotify({ success, message });
          setUsers(allUsers);
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, []);

  return (
    <AdminWrapper>
      <div className="admin-users-wrapper">
        {users.length &&
          users.map((user) => (
            <div key={user._id} className="admin-user-data">
              <div className="admin-user-column">
                <p>{user.name}</p>
              </div>

              <div className="admin-user-column">
                <p>{user.surname}</p>
              </div>

              <div className="admin-user-column">
                <p>{user.email}</p>
              </div>

              <div className="admin-user-column">
                <p>{user.location}</p>
              </div>

              <Link
                to={`/admin/users/${user._id}`}
                className="admin-user-column"
              >
                <i className="fa-solid fa-arrow-up-right-from-square" />

                <p>Details</p>
              </Link>
            </div>
          ))}
      </div>
    </AdminWrapper>
  );
};

export default AdminUsersPage;
