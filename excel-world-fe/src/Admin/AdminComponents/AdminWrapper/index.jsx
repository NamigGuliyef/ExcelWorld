import PropTypes from "prop-types";
import AdminContentHeader from "../AdminContentHeader";
import AdminSidebar from "../AdminSidebar";

const AdminWrapper = ({ children }) => (
  <main className="admin-page-wrapper">
    <AdminSidebar />

    <section className="admin-content-wrapper">
      <AdminContentHeader />

      <div className="admin-content">{children}</div>
    </section>
  </main>
);

AdminWrapper.propTypes = { children: PropTypes.any.isRequired };

export default AdminWrapper;
