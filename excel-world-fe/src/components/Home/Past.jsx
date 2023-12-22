import { useEffect, useState } from "react";
import { getCards } from "../../api/functions";
import { Link } from "react-router-dom";

const Past = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getCards()
      .then(({ pastInPic }) => {
        setCards(pastInPic);
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredCards = cards?.filter((card) => card.checked);

  return (
    <>
      {/* text */}
      <div className="text-Past col-12">
        <h1 className="textpast">Past in Pictures</h1>
      </div>
      {/* cart */}

      <div className="cart-Past">
        <div className="container">
          <div className="row">
            {filteredCards?.map((fd) => (
              <div key={fd._id} className="cartPast1 col-lg-4 col-sm-6 col-8  ">
                <div>
                  <div className="img-box">
                    <img src={fd.photo} alt="" />
                  </div>

                  <p className="p-Past">{fd.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* see more */}
      <div className="seeMore col-12">
        <Link to="/past-in-pictures">see more</Link>
      </div>
    </>
  );
};

export default Past;
