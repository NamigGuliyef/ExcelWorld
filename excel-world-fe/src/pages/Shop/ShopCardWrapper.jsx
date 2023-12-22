import PropTypes from "prop-types";
import ShopCard from "../../components/ShopCard";

const ShopCardWrapper = ({ header, data }) => {
  // console.log(data.length);
  if (!data.length) {
    const skeletonElements = [];

    for (let i = 0; i < 2; i++) {
      skeletonElements.push(
        <div className="shop-card" key={i}>
          <div className="shop-card-image skeleton" />

          <p
            className="skeleton skeleton-text skeleton-header"
            style={{
              width: "35%",
              marginLeft: "15px",
            }}
          />

          <p
            className="skeleton skeleton-text skeleton-paragragh"
            style={{
              width: "60%",
              marginLeft: "15px",
            }}
          />

          <div className="shop-card-info">
            <div className="shop-card-bottom">
              <p className="skeleton skeleton-text skeleton-short-text"></p>

              <p className="skeleton skeleton-text skeleton-short-text"></p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="shop">
        <div className="container">
          <div className="shop-wrapper">
            <h2 className="skeleton skeleton-text skeleton-page-header" />

            <div className="shop-card-wrapper">{skeletonElements}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="shop">
      <div className="container">
        <div className="shop-wrapper">
          <h2>{header[0].toUpperCase() + header.slice(1).toLowerCase()}</h2>

          <div className="shop-card-wrapper">
            {data &&
              data.map((cardData) => (
                <ShopCard
                  key={cardData._id}
                  page={header}
                  data={cardData}
                  dataLength={data.length}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

ShopCardWrapper.propTypes = { header: PropTypes.string.isRequired };
ShopCardWrapper.propTypes = { data: PropTypes.array.isRequired };

export default ShopCardWrapper;
