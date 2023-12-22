import { Link, NavLink } from "react-router-dom";
import img1 from "../../assets/Navigation/logo.png";
import img2 from "../../assets/Navigation/logoWhite.png";
import Header from "../Header";

const Nav = () => {
  return (
    <>
      <div className="nav-box">
        <nav className="navbar navbarw  navbar-expand-lg ">
          <div className="container">
            {/* logo */}
            <NavLink className="navbar-brand" to="/">
              <img src={img1} alt="" />
            </NavLink>

            {/* bars */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span>Menu</span> <span className="navbar-toggler-icon" />
            </button>
            {/* nav */}
            <div className="collapse  navbar-collapse" id="navbarNav">
              {/* bars */}
              <button
                className="navbar-toggler nav-button2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span>Close</span> <span className="navbar-toggler-icon" />
              </button>
              {/* logo white */}
              <NavLink className="navbar-brand logoTwo" href="#">
                <img src={img2} alt="" />
              </NavLink>

              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <p>
                    <Link to="" className="nav-link">
                      <span>Azerbaijan Excel Days</span>
                    </Link>
                  </p>

                  <ul className="excell-days-wrapper">
                    <li>
                      <Link
                        to="https://www.meetup.com/London-Excel-Meetup-Group/"
                        className="Link"
                        target="_blank"
                      >
                        Free Meetups
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="https://2023.globalexcelsummit.com/"
                        className="Link"
                        target="_blank"
                      >
                        MyDataSummit 2023
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="https://2022.globalexcelsummit.com/"
                        className="Link"
                        target="_blank"
                      >
                        MyDataSummit 2022
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="https://2021.globalexcelsummit.com/"
                        className="Link"
                        target="_blank"
                      >
                        MyDataSummit 2021
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link to="/shop" className="nav-link">
                    Shop
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/free-resources" className="nav-link ">
                    Free Resources
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/blogs" className="nav-link ">
                    Blog
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/about" className="nav-link ">
                    About us
                  </Link>
                </li>
              </ul>

              {/* header */}
              <Header />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Nav;
