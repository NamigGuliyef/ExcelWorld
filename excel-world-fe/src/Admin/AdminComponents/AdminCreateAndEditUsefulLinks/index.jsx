import { useCallback, useContext, useEffect, useState } from "react";
import {
  createUsefullLink,
  editUsefullLink,
  getSingleUsefullLink,
} from "../../../api/functions";
import { useNavigate, useParams } from "react-router";
import { SnackBarContext } from "../../../Context/Snackbar";
import { deleteCookie } from "../../../utils/setCokie";

const AdminCreateAndEditUsefulLinks = () => {
  const [data, setData] = useState({});
  const { uId } = useParams();
  const setNotify = useContext(SnackBarContext);
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    if (uId) {
      getSingleUsefullLink(uId)
        .then(({ success, message, usefulLink }) => {
          const { _id, createdAt, updatedAt, ...rest } = usefulLink;
          setData(rest);

          setNotify({ success, message });
        })
        .catch((error) =>
          setNotify({ success: false, message: error.message })
        );
    }
  }, [uId]);

  const updateLinlHandler = useCallback(() => {
    if (uId) {
      editUsefullLink(uId, data)
        .then((res) => {
          if (res.status === 401) {
            // localStorage.removeItem("token");
            // localStorage.removeItem("role");
            deleteCookie(["token", "role"]);
            navigate("/admin-login");
          } else {
            const { success, message } = res;
            setNotify({ success, message });

            navigate("/admin/useful-links");
          }
        })
        .catch((error) => {
          console.log(error);
          setNotify({ success: false, message: error.message });
        });
    } else {
      createUsefullLink(data)
        .then((res) => {
          if (res.status === 401) {
            // localStorage.removeItem("token");
            // localStorage.removeItem("role");
            deleteCookie(["token", "role"]);
            navigate("/admin-login");
          } else {
            const { success, message } = res;
            setNotify({ success, message });

            navigate("/admin/useful-links");
          }
        })
        .catch((error) => {
          setNotify({ success: false, message: error.message });
        });
    }
  }, [data, navigate]);

  return (
    <div className="admin-content-container">
      <div className="admin-form-wrapper">
        <label htmlFor="title">
          <p>Title</p>

          <input
            id="title"
            type="text"
            name="title"
            defaultValue={data.title}
            onChange={inputChangeHandler}
          />
        </label>

        <label htmlFor="photo">
          <p>Photo</p>

          <input
            id="photo"
            type="file"
            name="photo"
            onChange={inputChangeHandler}
          />
        </label>

        <label htmlFor="desc">
          <p>Description</p>

          <input
            id="desc"
            type="text"
            name="description"
            defaultValue={data.description}
            onChange={inputChangeHandler}
          />
        </label>

        <label htmlFor="web_link">
          <p>Website link</p>

          <input
            id="web_link"
            type="text"
            name="web_link"
            defaultValue={data.web_link}
            onChange={inputChangeHandler}
          />
        </label>

        <button className="admin-home-save" onClick={updateLinlHandler}>
          {uId ? "Edit" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default AdminCreateAndEditUsefulLinks;
