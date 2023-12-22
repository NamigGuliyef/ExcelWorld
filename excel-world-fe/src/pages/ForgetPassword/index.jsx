import { useCallback, useContext, useState } from "react";
import Auth from "../../components/Auth";
import PageContainer from "../../components/PageContainer";
import { SnackBarContext } from "../../Context/Snackbar";
import { forgetPassword, verifyCode } from "../../api/functions";
import { useNavigate } from "react-router";
import { setCokieHandler } from "../../utils/setCokie";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({});
  const [verify, setVerify] = useState(false);

  const setNotify = useContext(SnackBarContext);

  const inputChangeHander = (e) => {
    const { value } = e.target;

    if (verify) {
      setInputValue({ verifyCode: value });
    } else {
      setInputValue({ email: value });
    }
  };

  const loginHandler = useCallback(async () => {
    if (!verify) {
      forgetPassword(inputValue)
        .then(({ success, message }) => {
          if (success) {
            setNotify({ success, message });
            setVerify(true);
          } else {
            setNotify({ success, message });
          }
        })
        .catch((error) => {
          setNotify({ success: false, message: error.message });
        });
    } else {
      verifyCode(inputValue).then(({ success, message, token }) => {
        if (success) {
          setNotify({ success, message });
          // localStorage.setItem("token", token);
          setCokieHandler("token", token);

          navigate("/recovery-password");
        } else {
          setNotify({ success, message });
        }
      });
    }
  }, [inputValue]);

  return (
    <PageContainer>
      <Auth>
        <div className="auth-form">
          <h3>{verify ? "Write verify code" : "Forget password"}</h3>

          <form>
            <input
              type={verify ? "number" : "email"}
              placeholder={verify ? "Verify code" : "Email"}
              onChange={inputChangeHander}
            />

            <button onClick={loginHandler} type="button">
              {verify ? "Verify" : "Send"}
            </button>
          </form>
        </div>
      </Auth>
    </PageContainer>
  );
};

export default ForgetPassword;
