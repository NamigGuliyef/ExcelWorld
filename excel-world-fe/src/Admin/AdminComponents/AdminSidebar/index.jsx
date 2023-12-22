import adminSidebarLinks from "./adminSidebarLinks";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="admin-sidebar">
      {adminSidebarLinks.map((a) => (
        <Link
          className={
            pathname === a.link.toLocaleLowerCase() ? "sidebar-active" : ""
          }
          key={a.id}
          to={a.link}
        >
          <i className={a.icon} />

          {a.text}
        </Link>
      ))}
    </nav>
  );
};

export default AdminSidebar;
