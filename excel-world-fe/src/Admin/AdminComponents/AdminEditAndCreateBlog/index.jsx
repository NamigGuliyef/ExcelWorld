import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { SnackBarContext } from "../../../Context/Snackbar";
import { createBlog, editBlog, getSingleBlog } from "../../../api/functions";
import options from "./options";

import Select from "react-select";

import ReactQuill from "react-quill";
import QuillToolbar, { formats, modules } from "../EditorToolbar";
import { deleteCookie } from "../../../utils/setCokie";

const AdminEditAndCreateBlog = ({ page }) => {
  const setNotify = useContext(SnackBarContext);

  const navigate = useNavigate();
  const [updatedBlog, setUpdatedBlog] = useState({
    title: "",
    category: "",
    description: "",
  });

  const { bId } = useParams();

  useEffect(() => {
    if (bId && page === "edit") {
      getSingleBlog(bId)
        .then(({ success, message, singleBlog }) => {
          setNotify({ success, message });

          setUpdatedBlog({
            title: singleBlog.title,
            category: singleBlog.category,
            description: singleBlog.description,
          });
        })
        .catch((error) =>
          setNotify({ success: false, message: error.message })
        );
    }
  }, [bId, page]);

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

    setUpdatedBlog((prev) => ({ ...prev, [name]: value }));
  };

  const editBlogHandler = (e) => {
    e.preventDefault();

    if (bId && page === "edit") {
      editBlog(bId, updatedBlog)
        .then((res) => {
          if (res.status === 401) {
            deleteCookie(["token", "role"]);
            navigate("/admin-login");
          } else {
            const { success, message } = res;
            setNotify({ success, message });

            navigate("/admin/blogs");
          }
        })
        .catch((error) => {
          setNotify({ success: false, message: error.message });
        });
    } else {
      createBlog(updatedBlog)
        .then((res) => {
          if (res.status === 401) {
            deleteCookie(["token", "role"]);
            navigate("/admin-login");
          } else {
            const { success, message } = res;
            setNotify({ success, message });

            navigate("/admin/blogs");
          }
        })
        .catch((error) =>
          setNotify({ success: false, message: error.message })
        );
    }
  };

  return (
    <form className="admin-edit-wrapper">
      <div className="admin-edit-input">
        <p>Title</p>

        <input
          type="text"
          name="title"
          defaultValue={updatedBlog.title}
          onChange={(e) => inputChangeHandler(e, "text")}
        />
      </div>

      <div className="admin-edit-input">
        <p>Category</p>

        <Select
          name="category"
          onChange={(e) => inputChangeHandler(e, "select")}
          options={options}
        />
      </div>

      <div className="admin-text-editor">
        <QuillToolbar />

        <ReactQuill
          theme="snow"
          value={updatedBlog.description}
          placeholder={"Write something awesome..."}
          onChange={(e) => {
            setUpdatedBlog((prev) => ({ ...prev, description: e }));
          }}
          modules={modules}
          formats={formats}
        />
      </div>

      <button type="button" onClick={editBlogHandler}>
        <span>Save changes</span>

        <i className="fa-regular fa-floppy-disk"></i>
      </button>
    </form>
  );
};

AdminEditAndCreateBlog.propTypes = { page: PropTypes.string.isRequired };

export default AdminEditAndCreateBlog;
