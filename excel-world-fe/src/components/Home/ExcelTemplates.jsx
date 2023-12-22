import { Link } from "react-router-dom";
import img1 from "../../assets/Home/imgone.png";

const ExcelTemplates = () => {
  return (
    <>
      <div className="excelTemplates mt-5">
        <div className="container">
          <div className="row m-0">
            {/* left */}
            <div className="left-excelTemplates col-md-6 col-10">
              <img src={img1} alt="" />
            </div>
            {/* right */}
            <div className="right-excelTemplates col-md-6 col-11">
              <h1 className="h1-excelTemplates">
                50+ Excel Templates, Dashboards and many more
              </h1>
              <p className="p-excelTemplates ">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit
                Exercitation.
              </p>
              <div>
                <Link to="/signup" className="button-excelTemplates">
                  Sign up for goodies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExcelTemplates;
