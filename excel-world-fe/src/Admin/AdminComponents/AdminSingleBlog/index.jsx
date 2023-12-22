import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteBlog, getSingleBlog } from "../../../api/functions";

const AdminSingleBlog = () => {
  const [blog, setBlog] = useState({});
  const { bId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleBlog(bId).then(({ success, message, singleBlog }) => {
      setBlog(singleBlog);
    });
  }, [bId]);

  const deleteBlogHandler = (id) => {
    deleteBlog(id).then(({ success, message }) => {
      if (success) {
        navigate("/admin/blogs");
      }
    });
  };

  const html = { __html: blog?.description };

  return (
    <div className="admin-single-blog-page">
      <div className="admin-single-blog-page-header">
        <h2>{blog?.title}</h2>

        <button
          className="admin-blog-button"
          onClick={() => deleteBlogHandler(bId)}
        >
          <i className="fa-solid fa-trash" />
        </button>
      </div>

      <p>{blog?.category}</p>

      <div dangerouslySetInnerHTML={html} />

      <img src={blog?.photo} alt="" />
    </div>
  );
};

export default AdminSingleBlog;
