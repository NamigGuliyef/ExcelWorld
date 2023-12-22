import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ShopCard = ({ page, data, dataLength }) => {
  return (
    <Link
      to={`/${page}/${data._id}`}
      className="Link shop-card"
      style={dataLength < 3 ? { maxWidth: "450px" } : {}}
    >
      <div className="shop-card-image">
        <img
          src={`${import.meta.env.VITE_BASE_URL}/books/${data.photo}`}
          alt={data.name}
        />
      </div>

      <div className="shop-card-info">
        <h5>{data.name}</h5>

        <p>{data.description}</p>

        <div className="shop-card-bottom">
          <p>
            {data.discount ? <span>{data.discount} USD</span> : ""}

            <span>{data.price} USD</span>
          </p>

          <span>Read more</span>
        </div>
      </div>
    </Link>
  );
};

ShopCard.propTypes = { data: PropTypes.object.isRequired };
ShopCard.propTypes = { page: PropTypes.string.isRequired };
ShopCard.propTypes = { dataLength: PropTypes.number.isRequired };

export default ShopCard;
