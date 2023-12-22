import PropTypes from "prop-types";

import logo from "@/assets/Auth/auth-logo.png";

const Auth = ({ children }) => {
  return (
    <section className="auth">
      <div className="container">
        <div className="auth-wrapper">
          <div className="auth-logo-box">
            <img src={logo} alt="" />
          </div>

          {children}
        </div>
      </div>
    </section>
  );
};

Auth.propTypes = { children: PropTypes.node.isRequired };

export default Auth;
