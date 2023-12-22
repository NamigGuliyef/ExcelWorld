import { useEffect, useState } from "react";
import { getYoutube } from "../../api/functions";

const LearnExcel = () => {
  const [link, setLink] = useState(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    getYoutube()
      .then(({ youtubeLink }) => {
        setLink(...youtubeLink);
      })
      .catch((error) => console.log(error));
  }, []);

  const linkId = link?.largeYoutubeLink.split("v=")[1].split("&")[0];

  return (
    <>
      <div className="learnExcel">
        <div className="container">
          <div className="row">
            {/* text */}
            <div className="text-learnExcel col-12">
              <h1>Learn Excel with me</h1>
            </div>

            {/* video */}
            <div className="video-learexcel">
              <iframe
                src={`https://www.youtube.com/embed/${linkId}?${
                  play && "autoplay=1"
                }`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />

              <div
                className="playIcon-wrapper"
                onClick={() => setPlay(true)}
                style={play ? { display: "none" } : { display: "flex" }}
              >
                <span className="playIcon">
                  <i className="fa-solid fa-play" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearnExcel;
