import PropTypes from "prop-types";
import PageContainer from "@/components/PageContainer";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useContext, useState } from "react";

import Auth from "../../components/Auth";
import { SnackBarContext } from "../../Context/Snackbar";
import { login } from "../../api/functions";
import AuthSocialMedia from "../../components/AuthSocialMedia";
import { setCokieHandler } from "../../utils/setCokie";

const Signin = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const setNotify = useContext(SnackBarContext);

  const inputChangeHander = (e) => {
    const { name, value } = e.target;

    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const loginHandler = useCallback(async () => {
    try {
      const { success, message, token, error } = await login(inputValue);
      if (success && token) {
        setCokieHandler("token", token);
        setCokieHandler("role", "user");
        setNotify({ success, message });

        navigate("/user-settings");
      } else {
        setNotify({ success: false, message: message || error });
      }
    } catch (error) {
      setNotify({ success: false, message: error.message });
    }
  }, [inputValue, navigate]);

  return (
    <PageContainer>
      <Auth>
        <div className="auth-form">
          <h3>Sign in</h3>

          <form>
            <input
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={inputValue.email}
              onChange={inputChangeHander}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              defaultValue={inputValue.password}
              onChange={inputChangeHander}
            />

            <button onClick={loginHandler} type="button">
              Sign in
            </button>
          </form>

          <p>
            Don’t have an account?
            <Link className="Link" to={"/signup"}>
              Sign up
            </Link>
          </p>

          <Link className="Link" to="/forget-password">
            Forgot your password?
          </Link>

          <p>Social signin</p>

          <AuthSocialMedia />
        </div>
      </Auth>
    </PageContainer>
  );
};

Signin.propTypes = { signin: PropTypes.bool };

export default Signin;
