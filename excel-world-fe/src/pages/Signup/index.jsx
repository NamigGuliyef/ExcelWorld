import { useNavigate } from "react-router";
import Auth from "../../components/Auth";
import PageContainer from "../../components/PageContainer";
import { useCallback, useContext, useState } from "react";
import { SnackBarContext } from "../../Context/Snackbar";
import { register } from "../../api/functions";
import { Link } from "react-router-dom";
import AuthSocialMedia from "../../components/AuthSocialMedia";
import Select from "react-select";
import locationOptions from "./locationOptions";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    location: "",
  });
  const setNotify = useContext(SnackBarContext);

  const inputChangeHander = (e, type) => {
    let name = null;
    let value = null;

    if (type === "text") {
      name = e.target.name;
      value = e.target.value;
    }
    if (type === "select") {
      name = e.name;
      value = e.value;
    }

    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const loginHandler = useCallback(async () => {
    register(inputValue)
      .then(({ success, message }) => {
        if (success && message === "User register successfully") {
          setNotify({ success, message });

          navigate("/signin");
        } else {
          setNotify({ success, message });
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, [inputValue, navigate]);

  return (
    <PageContainer>
      <Auth>
        <div className="auth-form">
          <h3>Sign up</h3>

          <form>
            <input
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={inputValue.email}
              onChange={(e) => inputChangeHander(e, "text")}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              defaultValue={inputValue.password}
              onChange={(e) => inputChangeHander(e, "text")}
            />

            <input
              type="text"
              name="name"
              placeholder="Name"
              defaultValue={inputValue.name}
              onChange={(e) => inputChangeHander(e, "text")}
            />

            <input
              type="text"
              name="surname"
              placeholder="Surname"
              defaultValue={inputValue.surname}
              onChange={(e) => inputChangeHander(e, "text")}
            />

            <Select
              name="location"
              placeholder="Location"
              className="auth-page-select"
              onChange={(e) => inputChangeHander(e, "select")}
              options={locationOptions}
            />

            <button onClick={loginHandler} type="button">
              Sign up
            </button>
          </form>

          <p>
            Don’t have an account?
            <Link className="Link" to={"/signin"}>
              Sign in
            </Link>
          </p>

          <p>Social signin</p>

          <AuthSocialMedia />
        </div>
      </Auth>
    </PageContainer>
  );
};

export default Signup;
