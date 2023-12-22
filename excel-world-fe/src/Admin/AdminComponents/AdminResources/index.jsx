import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllResources } from "../../../api/functions";
import { SnackBarContext } from "../../../Context/Snackbar";

const AdminResources = () => {
  const [resources, setResources] = useState([]);
  const setNotify = useContext(SnackBarContext);

  useEffect(() => {
    getAllResources()
      .then(({ success, message, allResources }) => {
        if (success) {
          setNotify({ success, message });
          setResources(allResources);
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, []);

  return (
    <section className="admin-resource-page admin-content-container admin-resources-page">
      <div className="admin-resource-header">
        <Link to="/admin/resources/create-resource" className="admin-home-save">
          Create
        </Link>
      </div>

      <div className="admin-resource-content">
        <div className="admin-resource-content-top">
          <div className="single-resource-column">
            <p>Name</p>
          </div>

          <div className="single-resource-column">
            <p>Category</p>
          </div>

          <div className="single-resource-column">
            <p>Description</p>
          </div>

          <div className="single-resource-column">
            <p>Price</p>
          </div>

          <div className="single-resource-column" />

          <div className="single-resource-column" />
        </div>

        {resources.length &&
          resources.map((resource) => (
            <div key={resource._id} className="admin-single-resource">
              <div className="single-resource-column">
                <p>{resource.name}</p>
              </div>

              <div className="single-resource-column">
                <p>{resource.category}</p>
              </div>

              <div className="single-resource-column">
                <p>{resource.description}</p>
              </div>

              <div className="single-resource-column">
                <p>{resource.price}$</p>
              </div>

              <div className="single-resource-column">
                <Link
                  to={`/admin/edit-resources/${resource._id}`}
                  className="admin-edit-button"
                >
                  <i className="fa-solid fa-pen-to-square" />
                </Link>
              </div>

              <div className="single-resource-column">
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

export default AdminResources;
