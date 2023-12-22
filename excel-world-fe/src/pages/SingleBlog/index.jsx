import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";

import PageContainer from "@/components/PageContainer";
import BlogSidebar from "@/components/BlogSidebar";
import SinglePageSocial from "@/components/SinglePageSocial";
import CartBlog from "@/components/CartBlog";

import { getBlogs, getSingleBlog } from "../../api/functions";
import { SnackBarContext } from "../../Context/Snackbar";

const SingleBlog = () => {
  const { bId } = useParams();
  const setNotify = useContext(SnackBarContext);
  const [blog, setBlog] = useState({});
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs()
      .then(({ success, blogs, error }) => {
        if (success) {
          setBlogs(blogs);
        } else {
          setNotify({ success, message: error });
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });

    getSingleBlog(bId)
      .then(({ success, singleBlog }) => {
        if (success) {
          setBlog(singleBlog);
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, []);

  const inputDate = new Date(blog?.createdAt);
  const formattedDate = `${
    inputDate.getDay() < 10 ? `0${inputDate.getDay()}` : inputDate.getDay()
  }/${
    inputDate.getMonth() + 1 < 10
      ? `0${inputDate.getMonth() + 1}`
      : inputDate.getMonth() + 1
  }/${inputDate.getFullYear()}`;

  const blogContent = { __html: blog?.description };

  return (
    <PageContainer>
      <section className="single-blog">
        <div className="container">
          <div className="single-blog-wrapper">
            <div className="single-blog-content-wrapper">
              <h1>{blog?.title}</h1>

              <div className="single-blog-info">
                <p>
                  <span>Author:</span>

                  <span>İlqar Zərbəliyev</span>
                </p>

                <p>
                  <span>Category:</span>

                  <span>{blog?.category}</span>
                </p>

                <p>
                  <span>Date posted:</span>

                  <span>{formattedDate}</span>
                </p>
              </div>

              <div
                className="single-blog-content"
                dangerouslySetInnerHTML={blogContent}
              />

              <SinglePageSocial />

              <div className="single-blog-related">
                <h4>Related blogs</h4>

                <CartBlog dataBlog={blogs} />
              </div>
            </div>

            <div className="single-blog-sidebar">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default SingleBlog;
