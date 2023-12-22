import Footer from "../Footer";
import PropTypes from "prop-types";
import Header from "../Header";
import Navigation from "../Navigation";

const PageContainer = ({ children }) => {
  return (
    <>
      <Header />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
};

PageContainer.propTypes = { children: PropTypes.node.isRequired };

export default PageContainer;
