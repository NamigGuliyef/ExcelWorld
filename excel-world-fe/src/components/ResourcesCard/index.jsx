import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ResourcesCard = ({ data }) => {
  return (
    <div className="resource-card">
      <div className="resource-card-image">
        <img src={data.photo} alt={data.title} />
      </div>

      <div className="resource-card-content">
        <h3>{data.title}</h3>

        <p>{data.description}</p>

        <Link to={data.web_link} className="btn resource-link">
          Go to link
        </Link>
      </div>
    </div>
  );
};

ResourcesCard.propTypes = { data: PropTypes.object.isRequired };

export default ResourcesCard;
