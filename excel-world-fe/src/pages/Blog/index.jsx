import { useState, useEffect, useContext } from "react";

import PageContainer from "@/components/PageContainer";
import CartBlog from "@/components/CartBlog";
import BlogSidebar from "@/components/BlogSidebar";

import { getBlogs } from "@/api/functions";
import { SnackBarContext } from "@/Context/Snackbar";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogHeaders, setBlogHeaders] = useState([]);
  const setNotify = useContext(SnackBarContext);
  console.log(blogHeaders);

  useEffect(() => {
    getBlogs()
      .then(({ success, blogs }) => {
        if (success) {
          const headers = blogs.map(({ _id, title }, index) => {
            if (index < 5) {
              return { _id, title };
            }
          });

          setBlogs(blogs);
          setBlogHeaders(headers);
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, []);

  return (
    <PageContainer>
      <section className="blog">
        <div className="container">
          <div className="row ">
            <div className="programming col-md-7 col-10 ms-md-0 ms-4">
              <CartBlog dataBlog={blogs} />
            </div>

            <div className="right-box col-md-4 col-10">
              <BlogSidebar blogHeaders={blogHeaders} />
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default Blog;
