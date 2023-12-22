import { Link } from "react-router-dom";

import PageContainer from "@/components/PageContainer";
import GetInTouch from "@/components/GetInTouch/GetInTouch";

import { SnackBarContext } from "../../Context/Snackbar";
import { getAbout } from "../../api/functions";
import { useContext, useEffect, useState } from "react";

const About = () => {
  const [about, setAbout] = useState({});
  const setNotify = useContext(SnackBarContext);

  useEffect(() => {
    getAbout()
      .then(({ success, about_us }) => {
        if (success) setAbout(...about_us);
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, []);

  const info = { __html: about?.info };

  const parser = new DOMParser();
  const doc = parser.parseFromString(about?.detailed_info, "text/html");
  const paragraphs = doc.getElementsByTagName("p");

  return (
    <PageContainer>
      <section className="about-page">
        <div className="container">
          <div className="about-wrapper">
            <div className="about-header">
              <div className="about-header-image">
                <img src={about?.photo} alt="" />
              </div>

              <div className="about-header-info">
                <h1>{about?.title}</h1>

                <div dangerouslySetInnerHTML={info} />

                <div className="about-header-media">
                  {about.social_media?.map((media) => (
                    <Link
                      to={media.media_link}
                      key={media.id}
                      className="icon-foot Link"
                    >
                      <i className={`fa-brands fa-${media.media_name}`}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="about-info">
              <h3>Detailed info</h3>

              <div className="about-info-detaild">
                {Array.from(paragraphs).map((parag, index) => (
                  <p key={index}>{parag.textContent}</p>
                ))}
              </div>

              <h3>Certificates</h3>

              <div className="about-certificates">
                {about.certificates?.map((cert, index) => (
                  <img key={index} src={cert} alt="" />
                ))}
              </div>
            </div>

            <GetInTouch />
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default About;
