import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageContainer from "../../components/PageContainer";
import { login } from "../../api/functions";
import { setCokieHandler } from "../../utils/setCokie";
import { SnackBarContext } from "../../Context/Snackbar";

const AdminLogin = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const setNotify = useContext(SnackBarContext);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const loginHandler = useCallback(async () => {
    try {
      const { success, message, token } = await login(inputValue);
      if (success && message === "Admin token" && token) {
        setCokieHandler("token", token);
        setCokieHandler("role", "admin");
        setNotify({ success, message });

        navigate("/admin/contacts");
      } else {
        setNotify({ success, message });
      }
    } catch (error) {
      setNotify({ success: false, message: error.message });
    }
  }, [inputValue, navigate]);

  return (
    <PageContainer>
      <div className="container admin-login-page">
        <h1>Admin Login</h1>

        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={inputChangeHandler}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={inputChangeHandler}
        />

        <button onClick={loginHandler}>Login</button>
      </div>
    </PageContainer>
  );
};

export default AdminLogin;
