// import { authWithGoogle } from "../../api/functions";
import google from "../../assets/Icons/google-icon.svg";

const AuthSocialMedia = () => {
  const googleAuthHandler = async () => {
    // window.open(`${import.meta.env.VITE_BASE_URL}/auth/google`, "_self");
    try {
      const response = await fetch("http://localhost:8080/auth/google", {
        mode: "no-cors",
      });
      if (response.data) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-social">
      <button type="button">
        <img src={google} alt="Google" onClick={googleAuthHandler} />
      </button>

      <button type="button">
        <i className="fa-brands fa-twitter" />
      </button>
    </div>
  );
};

export default AuthSocialMedia;
