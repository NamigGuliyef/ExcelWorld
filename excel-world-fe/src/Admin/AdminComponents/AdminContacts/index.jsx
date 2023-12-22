import { Fragment, useContext, useEffect, useState } from "react";
import { getContacts } from "../../../api/functions";
import { SnackBarContext } from "../../../Context/Snackbar";
import { useNavigate } from "react-router";
import { deleteCookie } from "../../../utils/setCokie";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [clickedMail, setClickedMail] = useState({});
  const [toggleModal, setToggleModal] = useState(false);
  const setNotify = useContext(SnackBarContext);
  const navigate = useNavigate();

  useEffect(() => {
    getContacts()
      .then((res) => {
        if (res.status === 401) {
          deleteCookie(["token", "role"]);

          navigate("/admin-login");
        } else {
          const { success, message, allContact } = res;
          setNotify({ success, message });

          const sortedArray = allContact.sort((a, b) => {
            const first = new Date(a.createdAt);
            const second = new Date(b.createdAt);

            return second - first;
          });

          setContacts(sortedArray);
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, []);

  return (
    <Fragment>
      <div className="admin-contacts-page">
        {contacts.length &&
          contacts.map((mail) => (
            <div
              key={mail._id}
              className="admin-contact"
              onClick={() => {
                setClickedMail(mail);
                setToggleModal(true);
              }}
            >
              <h3>{mail.name}</h3>

              <span>{mail.email}</span>

              <p>{mail.message}</p>
            </div>
          ))}

        <div
          className={`admin-contact-modal ${toggleModal ? "open-modal" : ""}`}
        >
          <button onClick={() => setToggleModal(false)}>
            <i className="fa-solid fa-arrow-left-long" />
          </button>

          <div className="admin-modal-content">
            <div className="modal-content-header">
              <div className="modal-content-header-left">
                <p>{clickedMail.name}</p>

                <span>{clickedMail.email}</span>
              </div>

              <p>{new Date(clickedMail.createdAt).toLocaleDateString()}</p>
            </div>

            <p>{clickedMail.message}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminContacts;
1;
