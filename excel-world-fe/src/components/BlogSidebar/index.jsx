import PropTypes from "prop-types";
import SidebarAccordion from "../SidebarAccordion";
// import sidebarLinks from "./sidebarLinks";
import { useState } from "react";

const BlogSidebar = ({ blogHeaders }) => {
  const [inputValue, setInputValue] = useState("");

  const inputChangeHandler = (e) => setInputValue(e.target.value);

  return (
    <div className="blog-sidebar">
      <div className="blog-sidebar-input">
        <input type="text" onChange={inputChangeHandler} />

        <i className="fa-solid fa-magnifying-glass" />
      </div>

      <SidebarAccordion header="Recently published" data={blogHeaders} />
    </div>
  );
};

BlogSidebar.propTypes = { blogHeaders: PropTypes.array };

export default BlogSidebar;
