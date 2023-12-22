import PageContainer from "@/components/PageContainer";
import { useEffect, useState } from "react";
import { getCards } from "../../api/functions";

const PastInPictures = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getCards()
      .then(({ pastInPic }) => {
        setCards(pastInPic);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!cards.length) {
    const skeletonElements = [];

    for (let i = 0; i < 2; i++) {
      skeletonElements.push(
        <div className="pastInPictures-page-card" key={i}>
          <div className="past-image-wrapper skeleton" />

          <p className="skeleton skeleton-text skeleton-paragragh" />
        </div>
      );
    }

    return (
      <PageContainer>
        <div className="container">
          <div className="pastInPictures-page-wrapper">{skeletonElements}</div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="container">
        <section className="pastInPictures-page-wrapper">
          {cards.length &&
            cards.map((card) => (
              <div key={card._id} className="pastInPictures-page-card">
                <div className="past-image-wrapper">
                  <img src={card.photo} alt="" />
                </div>

                <div className="past-title">
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
        </section>
      </div>
    </PageContainer>
  );
};

export default PastInPictures;
