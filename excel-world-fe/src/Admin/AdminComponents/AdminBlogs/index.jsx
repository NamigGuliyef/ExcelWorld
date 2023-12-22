import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../../../api/functions";
import { SnackBarContext } from "../../../Context/Snackbar";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const setNotify = useContext(SnackBarContext);

  useEffect(() => {
    getBlogs()
      .then(({ success, message, blogs }) => {
        setNotify({ success, message });

        setBlogs(blogs);
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, []);

  return (
    <div className="admin-blogs-wrapper">
      <div className="admin-blogs-header">
        <div className="admin-blogs-title">
          <p>Title</p>
        </div>

        <div className="admin-blogs-category">
          <p>Category</p>
        </div>

        <Link to="/admin/blogs/create-blog" className="admin-create-blog">
          <span>Create Blog</span>

          <i className="fa-solid fa-plus"></i>
        </Link>
      </div>

      <div className="admin-blogs">
        {blogs.map((blogData) => (
          <div className="admin-single-blog" key={blogData._id}>
            <div className="admin-blogs-title">
              <Link to={`/admin/blogs/${blogData._id}`}>{blogData.title}</Link>
            </div>

            <div className="admin-blogs-category">
              <p>{blogData.category}</p>
            </div>

            <Link
              to={`/admin/blogs/${blogData._id}`}
              className="admin-blog-button"
            >
              <i className="fa-regular fa-eye" />
            </Link>

            <Link
              to={`/admin/blogs/edit/${blogData._id}`}
              className="admin-blog-button"
            >
              <i className="fa-regular fa-pen-to-square" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogs;
