import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            {/* link */}
            <div className="col-xl-7 col-lg-8 col-sm-12 ">
              <ul>
                <li>
                  <Link to="/" className="linkFooter Link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="linkFooter Link">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/free-resources" className="linkFooter Link">
                    Free Resources
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" className="linkFooter Link">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="linkFooter Link">
                    About us
                  </Link>
                </li>
              </ul>
            </div>
            {/* icon */}

            {/* text */}
            <div className="text-footer col-sm-12 ">
              <h6>Excel World 2021. All rights reserved.</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
