import { useContext, useState } from "react";
import { createCard } from "../../../api/functions";
import { SnackBarContext } from "../../../Context/Snackbar";
import { useNavigate } from "react-router";
import { deleteCookie } from "../../../utils/setCokie";

const AdminCreateCard = () => {
  const [card, setCard] = useState({});
  const navigate = useNavigate();
  const setNotify = useContext(SnackBarContext);

  const inputChangeHandler = (e) => {
    const { name, value, files, type, checked } = e.target;

    setCard((prev) => {
      if (type === "checkbox") {
        return { ...prev, checked };
      } else if (type === "file") {
        return { ...prev, photo: files[0] };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const createCardHandler = () => {
    createCard(card)
      .then((res) => {
        if (res.status === 401) {
          // localStorage.removeItem("token");
          // localStorage.removeItem("role");
          deleteCookie(["token", "role"]);
          navigate("/admin-login");
        } else {
          const { success, message } = res;
          setNotify({ success, message });

          navigate("/admin/home-page");
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  };

  return (
    <div className="admin-create-card">
      <h3>Create new card</h3>

      <label htmlFor="image">
        <p>Choise image</p>

        <input
          id="image"
          type="file"
          name="image"
          onChange={inputChangeHandler}
        />
      </label>

      <label htmlFor="title">
        <p>Write title</p>

        <input
          id="title"
          type="text"
          name="description"
          onChange={inputChangeHandler}
        />
      </label>

      <label htmlFor="checkbox">
        <p>Click to set home page</p>

        <input
          id="checkbox"
          type="checkbox"
          name="checkbox"
          onChange={inputChangeHandler}
        />
      </label>

      <button className="admin-home-save" onClick={createCardHandler}>
        Create
      </button>
    </div>
  );
};

export default AdminCreateCard;
