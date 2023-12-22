import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getCookie } from "../../utils/setCokie";
import { getAbout } from "../../api/functions";
import { SnackBarContext } from "../../Context/Snackbar";

const Head = () => {
  const [socialMedia, setSocialMedia] = useState({});
  const setNotify = useContext(SnackBarContext);

  useEffect(() => {
    getAbout()
      .then(({ success, about_us, error }) => {
        if (success) {
          const { social_media, ...rest } = about_us[0];
          setSocialMedia(social_media);
        } else {
          setNotify({ success, message: error });
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, []);

  const token = getCookie("token");
  const role = getCookie("role");

  return (
    <>
      <div className="head">
        <div className="container-lg  container-fluid">
          <div className="row">
            {/* left */}
            <div className="headLeft col-xl-6 col-lg-5 col-12">
              {socialMedia.length &&
                socialMedia.map(({ id, media_link, media_name }) => (
                  <Link key={id} to={media_link} className="iconHead">
                    <i className={`fa-brands fa-${media_name}`}></i>
                  </Link>
                ))}
            </div>
            {/* right */}
            <div className="headRight col-xl-6 col-lg-7 col-12">
              <ul className="ulHead">
                <li>
                  <Link className="liLinkhead Link">
                    <i className="fa-solid fa-envelope me-2"></i>
                    javid.khasizada@gmail.com
                  </Link>
                </li>
                <li>
                  <Link className="liLinkhead Link">
                    <i className="fa-solid fa-phone me-2"></i>+36 208022434
                  </Link>
                </li>
                <li>
                  {
                    <Link
                      to={
                        role === "user" && token ? "/user-settings" : "/signin"
                      }
                      className="liLinkhead Link"
                    >
                      <button className="buttonHead">
                        {role === "user" && token ? "Profile" : "Sign in"}
                      </button>
                    </Link>
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Head;
