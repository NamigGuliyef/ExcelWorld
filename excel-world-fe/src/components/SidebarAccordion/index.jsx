import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SidebarAccordion = ({ data, header }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="blog-accordion">
      <div className="blog-acc-header" onClick={() => setOpen((prev) => !prev)}>
        <p>{header}</p>

        {open ? (
          <i className="fa-solid fa-angle-down"></i>
        ) : (
          <i className="fa-solid fa-angle-right"></i>
        )}
      </div>

      {open && (
        <div className="blog-acc-links">
          {data &&
            data.map(({ _id, title }) => (
              <NavLink
                key={_id}
                to={`/blogs/${_id}`}
                className="blog-sidebar-link"
              >
                {title}
              </NavLink>
            ))}
        </div>
      )}
    </div>
  );
};

SidebarAccordion.propTypes = { data: PropTypes.object.isRequired };
SidebarAccordion.propTypes = { header: PropTypes.string.isRequired };
SidebarAccordion.propTypes = { blogHeaders: PropTypes.array };

export default SidebarAccordion;
