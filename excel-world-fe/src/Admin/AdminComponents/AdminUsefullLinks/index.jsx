import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SnackBarContext } from "../../../Context/Snackbar";
import { deleteUsefullLink, getUsefullLinks } from "../../../api/functions";

const AdminUsefullLinks = () => {
  const setNotify = useContext(SnackBarContext);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    getUsefullLinks()
      .then(({ success, message, allUsefulLinks }) => {
        if (success) {
          setNotify({ success, message });
          setLinks(allUsefulLinks);
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, []);

  const deleteLinkHandler = (id) => {
    deleteUsefullLink(id)
      .then(({ success, message }) => {
        if (success) {
          setNotify({ success, message });
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  };

  return (
    <section className="admin-resource-page admin-content-container admin-useful-links-page">
      <div className="admin-resource-header">
        <Link to="/admin/useful-links/create-link" className="admin-home-save">
          Create
        </Link>
      </div>

      <div className="admin-resource-content">
        <div className="admin-resource-content-top">
          <div className="single-resource-column">
            <p>Title</p>
          </div>

          <div className="single-resource-column">
            <p>Description</p>
          </div>

          <div className="single-resource-column">
            <p>Link</p>
          </div>

          <div className="single-resource-column" />
          <div className="single-resource-column" />
        </div>

        {links.length > 0 &&
          links.map((link) => (
            <div key={link._id} className="admin-single-resource">
              <div className="single-resource-column">
                <p>{link.title}</p>
              </div>

              <div className="single-resource-column">
                <p>{link.description}</p>
              </div>

              <div className="single-resource-column">
                <Link to={link.web_link}>
                  <i className="fa-solid fa-arrow-up-right-from-square" />
                </Link>
              </div>

              <div className="single-resource-column">
                <Link
                  to={`/admin/edit-useful-links/${link._id}`}
                  className="admin-edit-button"
                >
                  <i className="fa-solid fa-pen-to-square" />
                </Link>
              </div>

              <div
                className="single-resource-column"
                onClick={() => deleteLinkHandler(link._id)}
              >
                <button className="admin-delete-icon">
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default AdminUsefullLinks;
