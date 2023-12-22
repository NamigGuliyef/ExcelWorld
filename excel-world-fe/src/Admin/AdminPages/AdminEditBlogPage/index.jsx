import AdminEditAndCreateBlog from "../../AdminComponents/AdminEditAndCreateBlog";
import AdminWrapper from "../../AdminComponents/AdminWrapper";

const AdminEditBlogPage = () => (
  <AdminWrapper>
    <AdminEditAndCreateBlog page="edit" />
  </AdminWrapper>
);

export default AdminEditBlogPage;
