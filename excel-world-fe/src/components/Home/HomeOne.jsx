import { Link } from "react-router-dom";
import img1 from "../../assets/Home/girl.png";
const HomeOne = () => {
  return (
    <>
      <div className="HomeOne">
        <div className="row">
          {/* left */}
          <div className="leftHomeOne col-xl-6 col-lg-6 col-md-9">
            <h1 className="h1HomeOne pe-xl-0 pe-md-5 p-sm-0">
              Improve your excel skills with Azerbaijan Excel Days
            </h1>
            <p className="pHomeOne ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              autem sapiente aliquam quo odio!
            </p>
            <div>
              <Link to="/signup" className="buttonHomeOne">
                Register now
              </Link>
            </div>
          </div>
          {/* right */}
          <div className="rightHomeOne col-xl-6 col-lg-6 col-md-12">
            <img className="girlimg" src={img1} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeOne;
