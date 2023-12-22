import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router";

import { SnackBarContext } from "../../Context/Snackbar";
import PageContainer from "../../components/PageContainer";
import Auth from "../../components/Auth";

import { recoveryPassword } from "../../api/functions";
import { deleteCookie, getCookie } from "../../utils/setCokie";

const RecoveryPassword = () => {
  const [inputValue, setInputValue] = useState({
    new_password: "",
    repeat_password: "",
  });
  const navigate = useNavigate();
  const setNotify = useContext(SnackBarContext);

  const passwordIsEqual =
    inputValue.repeat_password === inputValue.new_password &&
    inputValue.repeat_password !== "" &&
    inputValue.new_password !== "";

  const inputChangeHander = (e) => {
    const { value, name } = e.target;

    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const loginHandler = useCallback(async () => {
    // const token = localStorage.getItem("token");
    const token = getCookie("token");

    recoveryPassword(inputValue, token)
      .then(({ success, message }) => {
        if (success) {
          setNotify({ success, message });
          // localStorage.removeItem("token");
          deleteCookie(["token"]);
          navigate("/signin");
        } else {
          setNotify({ success, message });
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, [inputValue]);

  return (
    <PageContainer>
      <Auth>
        <div className="auth-form">
          <h3>New password</h3>

          <form>
            <input
              type="password"
              name="new_password"
              placeholder="News password"
              onChange={inputChangeHander}
            />

            <input
              type="password"
              name="repeat_password"
              placeholder="Repeat password"
              onChange={inputChangeHander}
              className={!passwordIsEqual ? "repeat-pass-error" : ""}
            />

            <button
              onClick={loginHandler}
              type="button"
              className={!passwordIsEqual ? "button-not-active" : ""}
              disabled={!passwordIsEqual}
            >
              Sign in
            </button>
          </form>
        </div>
      </Auth>
    </PageContainer>
  );
};

export default RecoveryPassword;
