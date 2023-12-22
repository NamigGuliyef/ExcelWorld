import { useNavigate, useParams } from "react-router";
import AdminWrapper from "../../AdminComponents/AdminWrapper";
import { useContext, useEffect, useState } from "react";
import { getSingleUser } from "../../../api/functions";
import { SnackBarContext } from "../../../Context/Snackbar";
import { deleteCookie } from "../../../utils/setCokie";

// import usersData from "../AdminUsersPage/usersData";

const AdminSingleUserPage = () => {
  const { uId } = useParams();
  const [user, setUser] = useState({});
  const setNotify = useContext(SnackBarContext);
  const navigate = useNavigate();

  useEffect(() => {
    getSingleUser(uId)
      .then((res) => {
        if (res.status === 401) {
          // localStorage.removeItem("token");
          // localStorage.removeItem("role");
          deleteCookie(["token", "role"]);
          navigate("/admin-login");
        } else {
          const { success, message, user } = res;
          setNotify({ success, message });

          setUser(user);
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, []);

  return (
    <AdminWrapper>
      <div className="admin-content-container">
        <div className="admin-user-page-header">
          <h4 className="admin-page-secton-header">User Info</h4>

          <div className="admin-user-info-wrapper">
            <p>
              Name : <span>{user?.name}</span>
            </p>

            <p>
              Surname : <span>{user?.surname}</span>
            </p>

            <p>
              Email : <span>{user?.email}</span>
            </p>

            <p>
              Location : <span>{user?.location}</span>
            </p>
          </div>
        </div>

        <div className="admin-user-page-resources-wrapper">
          <h4 className="admin-page-secton-header">
            User`s purchased resources
          </h4>

          <div className="admin-user-page-resources">
            <div className="admin-userPage-content-wrapper">
              <div className="admin-userPage-content-column">
                <p>Resource image</p>
              </div>

              <div className="admin-userPage-content-column">
                <p>Resource name</p>
              </div>

              <div className="admin-userPage-content-column">
                <p>Resource category</p>
              </div>
            </div>

            {user.purchased_resourced?.map((resource, index) => (
              <div className="admin-userPage-content-wrapper" key={index}>
                <div className="admin-userPage-content-column">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/books/${
                      resource.photo
                    }`}
                    alt=""
                  />
                </div>

                <div className="admin-userPage-content-column">
                  <p>{resource.name}</p>
                </div>

                <div className="admin-userPage-content-column">
                  {resource.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminWrapper>
  );
};

export default AdminSingleUserPage;
