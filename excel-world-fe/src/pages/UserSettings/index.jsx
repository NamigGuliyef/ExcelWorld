import { useContext, useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import { useNavigate } from "react-router";

import { getUserDetails, userEditProfile } from "../../api/functions";
import { SnackBarContext } from "../../Context/Snackbar";
import { deleteCookie } from "../../utils/setCokie";

import edit from "../../assets/Icons/Edit.svg";

const UserSettings = () => {
  const [userData, setUserData] = useState({});
  const setNotify = useContext(SnackBarContext);
  const [changes, setChanges] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails()
      .then((res) => {
        if (res.message === "Token is wrong") {
          deleteCookie(["token", "role"]);
          navigate("/signin");
        } else {
          const { success, profile } = res;

          if (success) {
            setUserData(profile);
            setChanges({
              name: profile.name,
              surname: profile.surname,
              location: profile.location,
            });
          }
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, []);

  const logoutHandler = () => {
    deleteCookie(["token", "role"]);

    navigate("/signin");
  };

  const inputChangeHander = (e) => {
    const { value, name } = e.target;

    setChanges((prev) => ({ ...prev, [name]: value }));
  };

  const updateProfile = () => {
    const notChangedState =
      userData.name === changes.name && userData.surname === changes.surname;

    if (notChangedState) {
      setNotify({
        success: false,
        message: "Please make your change",
      });
    } else {
      userEditProfile(changes)
        .then((res) => {
          const { message, error, success } = res;

          if (!success) {
            setNotify({ success, message: error });
          } else {
            setNotify({ success, message });
          }
        })
        .catch((error) => {
          setNotify({ success: false, message: error.message });
        });
    }
  };

  return (
    <PageContainer>
      <section className="user-panel">
        <div className="container">
          <div className="user-panel-wrapper">
            <div className="user-settings-info">
              <div className="user-panel-header">
                <h2>{`${userData?.name} ${userData.surname}`}</h2>
                <p>{userData?.email}</p>
              </div>

              <div className="user-panel-content">
                <h2 className="user-panel-section-header">Account</h2>

                <div className="user-info-content-wrapper">
                  <div className="user-info-row">
                    <label htmlFor="name">
                      <span>Name</span>

                      <input
                        id="name"
                        type="text"
                        name="name"
                        defaultValue={userData?.name}
                        onChange={inputChangeHander}
                      />
                    </label>
                  </div>

                  <div className="user-info-row">
                    <label htmlFor="surname">
                      <span>Surname</span>

                      <input
                        id="surname"
                        type="text"
                        name="surname"
                        defaultValue={userData?.surname}
                        onChange={inputChangeHander}
                      />
                    </label>
                  </div>

                  <div className="user-info-row">
                    <label htmlFor="location">
                      <span>Location</span>

                      <input
                        id="location"
                        type="text"
                        name="location"
                        defaultValue={userData?.location}
                        disabled
                      />
                    </label>
                  </div>

                  <button className="user-info-editBtn" onClick={updateProfile}>
                    <img src={edit} alt="" />

                    <span>Change</span>
                  </button>
                </div>

                <h2 className="user-panel-section-header">Resources</h2>

                <div className="user-info-content-wrapper">
                  <div className="user-settings-resources">
                    {userData.purchased_resourced?.length ? (
                      userData.purchased_resourced.map((resource, index) => (
                        <div key={index} className="user-book-wrapper">
                          <div className="user-book-image">
                            <img
                              src={`${import.meta.env.VITE_BASE_URL}/books/${
                                resource.photo
                              }`}
                              alt=""
                            />
                          </div>

                          <p>{resource.name}</p>

                          <p>{resource.description}</p>
                        </div>
                      ))
                    ) : (
                      <p>Heç bir resurs tapılmadı</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button onClick={logoutHandler}>Log out</button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default UserSettings;
