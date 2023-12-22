import { Link } from "react-router-dom";

const SinglePageSocial = () => {
  return (
    <div className="single-page-social-media">
      <Link>
        <i className="fa-brands fa-facebook-f"></i>
      </Link>

      <Link>
        <i className="fa-brands fa-telegram"></i>
      </Link>

      <Link>
        <i className="fa-brands fa-linkedin-in"></i>
      </Link>

      <Link>
        <i className="fa-brands fa-whatsapp"></i>
      </Link>
    </div>
  );
};

export default SinglePageSocial;
