import PropTypes from "prop-types";
import { createContext, useState } from "react";
// import { useNavigate } from "react-router";
// import { deleteCookie } from "../utils/setCokie";

export const SnackBarContext = createContext({});

const Snackbar = ({ children }) => {
  const [notify, setNotify] = useState({});
  // const navigate = useNavigate();

  const notifyHandler = (_notify) => {
    setNotify(_notify);

    setTimeout(() => {
      setNotify({});
    }, 3500);
  };

  // if (!notify.success && notify.message === "Token is wrong") {
  //   // localStorage.removeItem("token");
  //   deleteCookie(["token"]);

  //   navigate("/admin-login");
  // }

  return (
    <>
      <SnackBarContext.Provider value={notifyHandler}>
        {children}

        <div
          className={`admin-helper-notification ${
            notify?.success === undefined
              ? ""
              : notify?.success
              ? "success"
              : "failed"
          } ${notify?.message && "open-message"}`}
        >
          <p className="admin-message">{notify?.message}</p>
        </div>
      </SnackBarContext.Provider>
    </>
  );
};

Snackbar.propTypes = { children: PropTypes.object.isRequired };

export default Snackbar;
