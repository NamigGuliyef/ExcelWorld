import { useContext, useEffect, useState } from "react";
import {
  deleteCard,
  editSingleCard,
  editYoutubeLink,
  getCards,
  getYoutube,
} from "../../../api/functions";
import { SnackBarContext } from "../../../Context/Snackbar";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const [youtube, setYoutube] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const setNotify = useContext(SnackBarContext);

  useEffect(() => {
    getYoutube()
      .then(({ success, message, youtubeLink }) => {
        setNotify({ success, message });

        setYoutube(...youtubeLink);
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });

    getCards()
      .then(({ success, message, pastInPic }) => {
        setNotify({ success, message });

        setCards(pastInPic);
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, []);

  const changeYoutubeHandler = () => {
    editYoutubeLink(youtube)
      .then(({ success, message }) => {
        setNotify({ success, message });
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  };

  const cardInputChangeHandler = (e) => {
    const { name, type, value, dataset, checked, files } = e.target;

    const current = cards.find((c) => c._id == dataset.id);

    // console.log(current);
    // console.log(checked);

    setCurrentCard((prev) => {
      // return {
      //   _id: current._id,
      //   createdAt: current.createdAt,
      //   updatedAt: current.updatedAt,
      //   checked: checked ? checked : current.checked,
      //   photo: files === null ? current.photo : files[0],
      //   description: value ? value : current.description,
      // };

      if (type === "checkbox") {
        return {
          ...prev,
          _id: current._id,
          checked: checked,
        };
      } else if (type === "file") {
        return {
          ...prev,
          _id: current._id,
          photo: files[0],
        };
      } else {
        return {
          ...prev,
          _id: current._id,
          [name]: value,
        };
      }
    });
  };

  const saveCardData = () => {
    editSingleCard(currentCard._id, currentCard)
      .then(({ success, message }) => {
        setNotify({ success, message });
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  };

  const deleteCardHandler = (e) => {
    const { id } = e.target;

    deleteCard(id)
      .then(({ success, message }) => {
        setNotify({ success, message });
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  };

  return (
    <div className="admin-home-page">
      <div className="admin-home-content-wrapper">
        <div className="admin-home-header">
          <h4>Youtube Link</h4>
        </div>

        <div className="admin-home-content">
          <input
            type="text"
            defaultValue={youtube?.largeYoutubeLink}
            onChange={(e) => setYoutube({ largeYoutubeLink: e.target.value })}
          />

          <button onClick={changeYoutubeHandler} className="admin-home-save">
            Save
          </button>
        </div>
      </div>

      <div className="admin-home-content-wrapper">
        <div className="admin-home-header">
          <h4>Past in Pictures</h4>

          <Link className="admin-home-save" to="/admin/home-page/create-card">
            Create
          </Link>
        </div>

        {cards?.map((c) => (
          <div key={c._id} className="admin-home-card-wrapper">
            <div className="admin-home-card-item">
              <img src={c.photo} alt="" />

              <label htmlFor="image-input">
                <input
                  data-id={c._id}
                  type="file"
                  name="image"
                  id="image-input"
                  onChange={cardInputChangeHandler}
                />

                <i className="fa-solid fa-upload" />

                <span>Upload</span>
              </label>
            </div>

            <div className="admin-home-card-item">
              <input
                data-id={c._id}
                type="text"
                name="description"
                defaultValue={c.description}
                onChange={cardInputChangeHandler}
              />
            </div>

            <div className="admin-home-card-item">
              <input
                data-id={c._id}
                type="checkbox"
                name="checkbox"
                defaultChecked={c.checked}
                onChange={cardInputChangeHandler}
              />
            </div>

            <div className="admin-home-card-item">
              <button
                type="button"
                className="admin-home-save"
                onClick={saveCardData}
              >
                Save
              </button>
            </div>

            <div className="admin-home-card-item">
              <button
                type="button"
                className="admin-home-delete"
                id={c._id}
                onClick={deleteCardHandler}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
