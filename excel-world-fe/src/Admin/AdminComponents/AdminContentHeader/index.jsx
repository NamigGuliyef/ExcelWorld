import { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { deleteCookie } from "../../../utils/setCokie";

const AdminContentHeader = () => {
  const [dropwdown, setDropdown] = useState(false);

  const { pathname } = useLocation();
  const header = pathname.split("/");
  const pageHeader = header[header.length - 1].toLocaleUpperCase();

  const logoutHandler = () => {
    // localStorage.removeItem("token");
    deleteCookie(["token", "role"]);
  };

  return (
    <header>
      <h1>{pageHeader.length > 10 ? "" : pageHeader}</h1>

      <div
        className="admin-user-info"
        onClick={() => setDropdown((prev) => !prev)}
      >
        <div className="admin-user-image">
          <img
            src="https://icon-library.com/images/admin-icon/admin-icon-12.jpg"
            alt="Admin photo"
          />

          <i className="fa-solid fa-angle-down" />
        </div>

        {dropwdown && (
          <div className="admin-header-dropdown">
            <Link>
              <i className="fa-solid fa-gear"></i>

              <span>Settings</span>
            </Link>

            <Link to="/admin-login" onClick={logoutHandler}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>

              <span>Log Out</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminContentHeader;
