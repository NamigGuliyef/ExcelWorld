import AdminEditAndCreateBlog from "../../AdminComponents/AdminEditAndCreateBlog";
import AdminWrapper from "../../AdminComponents/AdminWrapper";

const AdminCreateBlogPage = () => (
  <AdminWrapper>
    <AdminEditAndCreateBlog page="create" />
  </AdminWrapper>
);

export default AdminCreateBlogPage;
