import PropTypes from "prop-types";
import { Fragment, useContext, useState } from "react";

import { createSocialMedia, editAboutPage } from "../../../api/functions";
import { SnackBarContext } from "../../../Context/Snackbar";
import ReactQuill from "react-quill";

const AdminAboutModal = ({ modalData, setOpen }) => {
  let html;
  const setNotify = useContext(SnackBarContext);

  const [info, setInfo] = useState({
    title: modalData.title,
    info: modalData.info,
    detailed_info: modalData.detailed_info,
    photo: null,
  });
  const [socialMedia, setSocialMedia] = useState(modalData.social_media || []);
  const [certificate, setCertificate] = useState(null);

  const saveInfoHandler = (e, type) => {
    const { name, value, files } = e.target;

    if (type === "text") {
      setInfo((prev) => ({ ...prev, [name]: value }));
    } else if (type === "file") {
      setInfo((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const socialMediaChangeHandler = (e) => {
    const { name, value, dataset } = e.target;

    if (name === "media_name") {
      setSocialMedia((pre) =>
        pre.map((m) => {
          if (m.id === dataset.id) {
            return { ...m, media_name: value };
          }
          return m;
        })
      );
    } else if (name === "media_link") {
      setSocialMedia((pre) =>
        pre.map((m) => {
          if (m.id === dataset.id) {
            return { ...m, media_link: value };
          }
          return m;
        })
      );
    }
  };

  const addNewMediaHandler = () => {
    setSocialMedia((prev) => [
      ...prev,
      { id: `${prev.length + 1}`, media_name: "", media_link: "" },
    ]);
  };

  const setCertificateHandler = (e) => {
    setCertificate({ photo: e.target.files[0] });
  };

  const sendUpdatedDataHandler = (type) => {
    switch (type) {
      case "info":
        editAboutPage("about", info, "FORM_DATA")
          .then(({ success, message }) => {
            if (success) {
              setNotify({ success, message });

              setOpen(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setNotify({ success: false, message: error.message });
          });
        break;

      case "social":
        createSocialMedia(socialMedia)
          .then(({ success, message }) => {
            console.log(message);
            if (success) {
              setNotify({ success, message });
              setOpen(false);
            }
          })
          .catch((error) => {
            setNotify({ success: false, message: error.message });
          });
        break;

      case "certificates":
        editAboutPage("certificate", certificate, "FORM_DATA")
          .then(({ success, message }) => {
            if (success) {
              setNotify({ success, message });

              setOpen(false);
            }
          })
          .catch((error) => {
            setNotify({ success: false, message: error.message });
          });
        break;
    }
  };

  switch (modalData.data) {
    case "info":
      html = (
        <div className="about-modal-info">
          <div className="about-modal-close">
            <button onClick={() => setOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="about-modal-input">
            <p>Title</p>

            <input
              type="text"
              defaultValue={modalData.title}
              name="title"
              onChange={(e) => saveInfoHandler(e, "text")}
            />
          </div>

          <div className="about-modal-input">
            <p>Info</p>

            <ReactQuill
              theme="snow"
              value={info.info}
              onChange={(e) => {
                setInfo((prev) => ({ ...prev, info: e }));
              }}
            />
          </div>

          <div className="about-modal-input">
            <p>Detaild Info</p>

            <ReactQuill
              theme="snow"
              value={info.detailed_info}
              onChange={(e) => {
                setInfo((prev) => ({ ...prev, detailed_info: e }));
              }}
            />
          </div>

          <div className="about-modal-input">
            <input
              type="file"
              name="photo"
              onChange={(e) => saveInfoHandler(e, "file")}
            />
          </div>

          <button
            className="admin-modal-save-button"
            onClick={() => sendUpdatedDataHandler("info")}
          >
            Save changes
          </button>
        </div>
      );
      break;

    case "social":
      html = (
        <div className="about-modal-info">
          <div className="about-modal-close" onClick={() => setOpen(false)}>
            <button>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {socialMedia.length > 0 ? (
            socialMedia.map((media) => (
              <div key={media.id} className="about-modal-input">
                <div className="about-modal-social-media">
                  <label htmlFor="media-name">
                    <span>Media Name</span>

                    <input
                      id="media-name"
                      type="text"
                      name="media_name"
                      data-id={media.id}
                      defaultValue={media.media_name}
                      onChange={socialMediaChangeHandler}
                    />
                  </label>

                  <label htmlFor="media-link">
                    <span>Media Link</span>

                    <input
                      id="media-link"
                      type="text"
                      defaultValue={media.media_link}
                      data-id={media.id}
                      name="media_link"
                      onChange={socialMediaChangeHandler}
                    />
                  </label>
                </div>
              </div>
            ))
          ) : (
            <p>There is not social media yet</p>
          )}

          <button
            className="admin-modal-socialMedia-add"
            onClick={addNewMediaHandler}
          >
            <span>Add New</span>

            <i className="fa-solid fa-plus"></i>
          </button>

          <button
            className="admin-modal-save-button"
            onClick={() => sendUpdatedDataHandler("social")}
          >
            Save changes
          </button>
        </div>
      );
      break;

    case "certificates":
      html = (
        <div className="about-modal-info">
          <div className="about-modal-close" onClick={() => setOpen(false)}>
            <button>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="about-modal-input">
            <input type="file" onChange={setCertificateHandler} />
          </div>

          <button
            className="admin-modal-save-button"
            onClick={() => sendUpdatedDataHandler("certificates")}
          >
            Save changes
          </button>
        </div>
      );
      break;
  }

  return (
    <Fragment>
      <div className="overlay" onClick={() => setOpen(false)} />
      <div className="admin-about-modal">{html}</div>
    </Fragment>
  );
};

AdminAboutModal.propTypes = { modalData: PropTypes.object.isRequired };
AdminAboutModal.propTypes = { setOpen: PropTypes.func.isRequired };

export default AdminAboutModal;
