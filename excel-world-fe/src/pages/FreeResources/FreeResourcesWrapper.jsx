import PropTypes from "prop-types";
import ResourcesCard from "@/components/ResourcesCard";

const ResourcesWrapper = ({ header, data }) => {
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
              width: "80%",
              marginLeft: "15px",
            }}
          />

          <div className="shop-card-info">
            <div className="shop-card-bottom">
              <p
                className="skeleton skeleton-text skeleton-paragragh"
                style={{ width: "20%" }}
              ></p>
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
    <section className="resources">
      <div className="container">
        <div className="resources-wrapper">
          <h2>{header}</h2>

          <div className="resources-card-wrapper">
            {data.map((card) => (
              <ResourcesCard key={card._id} data={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

ResourcesWrapper.propTypes = { header: PropTypes.string.isRequired };
ResourcesWrapper.propTypes = { data: PropTypes.array.isRequired };

export default ResourcesWrapper;
