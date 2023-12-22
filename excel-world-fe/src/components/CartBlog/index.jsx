import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CartBlog = ({ dataBlog }) => {
  if (!dataBlog.length) {
    const skeletonElements = [];

    for (let i = 0; i < 2; i++) {
      skeletonElements.push(
        <div className="cartProgramming " key={i}>
          <h2 className="skeleton skeleton-text skeleton-header" />

          <ul>
            <li className="skeleton skeleton-text skeleton-short-text" />

            <li className="skeleton skeleton-text skeleton-short-text" />

            <li className="skeleton skeleton-text skeleton-short-text" />
          </ul>

          <p className="skeleton skeleton-text skeleton-paragragh" />

          <p className="skeleton skeleton-text skeleton-paragragh" />

          <Link
            to="/"
            className="readmoreBlog skeleton skeleton-text skeleton-short-text"
          />
        </div>
      );
    }

    return <div>{skeletonElements}</div>;
  }

  return dataBlog.map((fd) => {
    const inputDate = new Date(fd.createdAt);
    const formattedDate = `${inputDate.toISOString().slice(8, 10)}/${inputDate
      .toISOString()
      .slice(5, 7)}/${inputDate.toISOString().slice(0, 4)}`;

    const parser = new DOMParser();
    const doc = parser.parseFromString(fd.description, "text/html");
    const paragraphs = doc.getElementsByTagName("p");
    const combinedText = Array.from(paragraphs)
      .map((p) => p.textContent)
      .join(" ");

    return (
      <div key={fd._id} className="cartProgramming ">
        <h2>
          <Link to={`/blogs/${fd._id}`}>{fd.title}</Link>
        </h2>

        <ul>
          <li>Author: İlqar Zərbəliyev</li>

          <li>Category: {fd.category}</li>

          <li>Date posted: {formattedDate}</li>
        </ul>

        <p className="text1-blog">{combinedText}</p>

        <Link to={`/blogs/${fd._id}`} className="readmoreBlog">
          Read more
        </Link>
      </div>
    );
  });
};

CartBlog.propTypes = { dataBlog: PropTypes.array.isRequired };

export default CartBlog;
