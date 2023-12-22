import Select from "react-select";
import Resources from "./Resources";
import { useCallback, useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";

import {
  createResource,
  editResource,
  getSingleResource,
} from "../../../api/functions";
import { useNavigate, useParams } from "react-router";
import { SnackBarContext } from "../../../Context/Snackbar";
import { deleteCookie } from "../../../utils/setCokie";

const AdminCreateAndEditResource = () => {
  const navigate = useNavigate();
  const setNotify = useContext(SnackBarContext);
  const [data, setData] = useState({
    name: "",
    link_file: "",
    photo: "",
    category: "",
    price: 0,
    discount: 0,
    description: "",
    details: "",
  });
  const { rId } = useParams();

  useEffect(() => {
    if (rId) {
      getSingleResource(rId)
        .then(({ success, message, resource }) => {
          setNotify({ success, message });

          const { _id, createdAt, updatedAt, ...rest } = resource;

          setData(rest);
        })
        .catch((error) =>
          setNotify({ success: false, message: error.message })
        );
    }
  }, [rId]);

  const inputChangeHandler = (e, type) => {
    let name = null;
    let value = null;

    if (type === "text") {
      name = e.target.name;
      value = e.target.value;
    }
    if (type === "select") {
      name = e.name;
      value = e.value;
    }
    if (type === "file") {
      name = e.target.name;
      value = e.target.files[0];

      console.log(value);
    }

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const resourceActions = useCallback(() => {
    if (rId) {
      editResource(rId, data)
        .then((res) => {
          if (res.status === 401) {
            deleteCookie(["token", "role"]);
            navigate("/admin-login");
          } else {
            const { success, message } = res;

            setNotify({ success, message });

            navigate("/admin/resources");
          }
        })
        .catch((error) => {
          console.log(error);
          setNotify({ success: false, message: error.message });
        });
    } else {
      createResource(data)
        .then((res) => {
          if (res.status === 401) {
            deleteCookie(["token", "role"]);
            navigate("/admin-login");
          } else {
            const { success, message } = res;
            setNotify({ success, message });

            navigate("/admin/resources");
          }
        })
        .catch((error) => {
          setNotify({ success: false, message: error.message });
        });
    }
  }, [data, navigate]);

  return (
    <section className="admin-content-container">
      <div className="admin-form-wrapper">
        <label htmlFor="name">
          <p>Name</p>

          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => inputChangeHandler(e, "text")}
            value={data.name}
          />
        </label>

        <label htmlFor="file">
          <p>File</p>

          <input
            type="file"
            name="link_file"
            id="file"
            onChange={(e) => inputChangeHandler(e, "file")}
          />

          {rId && typeof data.link_file === "string" && (
            <p className="admin-resources-file-name">
              <span>File name : </span> {data?.link_file}
            </p>
          )}
        </label>

        <label htmlFor="photo">
          <p>Photo</p>

          <input
            type="file"
            name="photo"
            id="photo"
            onChange={(e) => inputChangeHandler(e, "file")}
          />

          {rId && typeof data.photo === "string" && (
            <p className="admin-resources-file-name">
              <span>Photo name : </span> {data.photo}
            </p>
          )}
        </label>

        <label>
          <p>Category</p>

          <Select
            name="category"
            options={Resources}
            onChange={(e) => inputChangeHandler(e, "select")}
          />
        </label>

        <label htmlFor="price">
          <p>Price</p>

          <input
            type="number"
            name="price"
            id="price"
            onChange={(e) => inputChangeHandler(e, "text")}
            value={data.price}
          />
        </label>

        <label htmlFor="discount">
          <p>Discount</p>

          <input
            type="number"
            name="discount"
            id="discount"
            onChange={(e) => inputChangeHandler(e, "text")}
            value={data.discount}
          />
        </label>

        <label htmlFor="description">
          <p>Description</p>

          <input
            type="text"
            name="description"
            id="description"
            onChange={(e) => inputChangeHandler(e, "text")}
            value={data.description}
          />
        </label>

        <label htmlFor="details">
          <p>Description</p>

          <ReactQuill
            theme="snow"
            value={data.details}
            onChange={(e) => {
              setData((prev) => ({ ...prev, details: e }));
            }}
          />
        </label>

        <button onClick={resourceActions} className="admin-home-save">
          {rId ? "Update" : "Create"}
        </button>
      </div>
    </section>
  );
};

export default AdminCreateAndEditResource;
