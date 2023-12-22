import { useContext, useState } from "react";
import { getInTouch } from "../../api/functions";
import { SnackBarContext } from "../../Context/Snackbar";

const GetInTouch = () => {
  const initialState = {
    name: "",
    email: "",
    message: "",
  };

  const [inputData, setInputData] = useState(initialState);
  const setNotify = useContext(SnackBarContext);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const sendMessage = async () => {
    try {
      const { error, success, message } = await getInTouch(inputData);
      console.log(error);
      if (success) {
        setNotify({ success, message });
        setInputData(initialState);
      } else {
        setNotify({ success, message: error });
      }
    } catch (error) {
      setNotify({ success: false, message: error.message });
    }
  };

  return (
    <>
      <div className="getintouch">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-md-between justify-content-center">
            {/* left */}
            <div className="left-getintouch col-md-5 col-10">
              <h3 className="h3-getintouch">Get in touch</h3>
              <p className="p-getintouch">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis.
              </p>

              <div className="mt-5">
                <p>Name</p>
                <input
                  type="text"
                  name="name"
                  value={inputData.name}
                  onChange={inputChangeHandler}
                />
              </div>
              <div>
                <p className="mt-3">Email</p>
                <input
                  type="email"
                  name="email"
                  value={inputData.email}
                  onChange={inputChangeHandler}
                />
              </div>
              <div>
                <p className="mt-3">Message</p>
                <textarea
                  name="message"
                  value={inputData.message}
                  onChange={inputChangeHandler}
                ></textarea>
              </div>
              <div>
                <button
                  className="button-getintouch mt-4"
                  onClick={sendMessage}
                >
                  Send message
                </button>
              </div>
            </div>
            {/* right */}
            <div className="right-getintouch col-md-5 d-md-flex d-none"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetInTouch;
