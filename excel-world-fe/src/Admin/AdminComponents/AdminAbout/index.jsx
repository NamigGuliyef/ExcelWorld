import { useContext, useEffect, useState } from "react";
import AdminAboutModal from "../AdminAboutModal";
import { getAbout } from "../../../api/functions";
import { SnackBarContext } from "../../../Context/Snackbar";

const AdminAbout = () => {
  const [about, setAbout] = useState({});
  const [editInfo, setEditInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const setNotify = useContext(SnackBarContext);

  useEffect(() => {
    getAbout()
      .then(({ success, message, about_us }) => {
        setNotify({ success, message });

        setAbout(...about_us);
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, []);

  const setCurrentModalData = (current) => {
    if (current === "info") {
      setEditInfo({
        title: about.title,
        info: about.info,
        detailed_info: about.detailed_info,
        data: current,
      });
    } else if (current === "social") {
      setEditInfo({ social_media: about.social_media, data: current });
    } else if (current === "certificates") {
      setEditInfo({ certificates: about.certificates, data: current });
    }

    setOpen(true);
  };

  const info = { __html: about?.info };

  return (
    <div className="admin-about-page">
      <div className="admin-info">
        <div className="admin-info-left-box">
          <div className="admin-info-image">
            <img src={about?.photo} alt={about?.title} />
          </div>

          <h2>{about?.title}</h2>
        </div>

        <div className="admin-info-right-box" dangerouslySetInnerHTML={info} />

        <div
          className="admin-info-edit"
          onClick={() => setCurrentModalData("info")}
        >
          <button>
            <i className="fa-solid fa-pencil"></i>
          </button>
        </div>
      </div>

      <div className="admin-social-media">
        {about.social_media?.map((media, i) => (
          <p key={`${i + 1}`}>{media.media_link}</p>
        ))}

        <div
          className="admin-info-edit"
          onClick={() => setCurrentModalData("social")}
        >
          <button>
            <i className="fa-solid fa-pencil"></i>
          </button>
        </div>
      </div>

      <div className="admin-certificates">
        {about.certificates?.map((image, i) => (
          <img key={`${i + 1}`} src={image} />
        ))}

        <div
          className="admin-info-edit"
          onClick={() => setCurrentModalData("certificates")}
        >
          <button>
            <i className="fa-solid fa-pencil"></i>
          </button>
        </div>
      </div>

      {open && <AdminAboutModal modalData={editInfo} setOpen={setOpen} />}
    </div>
  );
};

export default AdminAbout;
