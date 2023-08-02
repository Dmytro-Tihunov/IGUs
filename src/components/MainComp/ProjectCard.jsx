import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider";
import { Rating } from "react-simple-star-rating";

function ProjectCard({
  id,
  title,
  description,
  score,
  subcategory,
  favorites,
  handleChange,
  userScore,
  handleScore,
  url,
}) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [rating, setRating] = useState(0);
  const shortDescription = description.slice(0, 40); // change 100 to whatever number of characters you want to display initially
  const { auth } = useAuth();

  const addFavorite = (id) => {
    handleChange(id);
  };

  const cleanUrl = (url) => {
    return url.replace(/:\/\//g, ".");
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleRating = (rate) => {
    handleScore(id, rate)
  };

  return (
    <Col className="col-12 col-lg-3 d-flex justify-content-center align-items-center">
      <div className="cateCard">
        <div className="cardImage">
          <span
            className={favorites.includes(id) ? "show" : ""}
            onClick={() => addFavorite(id)}
          >
            <i className="fa fa-bookmark"></i>
          </span>
          <div
            className="image-tool"
            style={{
              backgroundImage: `url(https://wwcbzpqlwqiojdnspqoi.supabase.co/storage/v1/object/public/SS/${cleanUrl(
                url
              )}.png)`,
            }}
          ></div>
        </div>
        <div className="cardContent">
          <h5 className="cardTitle">{title}</h5>
          <p className="text">
            {description.length > 100 ? (
              <>
                {showFullDescription ? description : `${shortDescription}...`}
                <span
                  onClick={toggleDescription}
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                >
                  {showFullDescription ? " Show Less" : " Load More"}
                </span>
              </>
            ) : (
              description
            )}
          </p>

          <div className="sub-and-score">
            <div className="tags">{subcategory}</div>
            <div className="score-points">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                />
              </svg>
              {score}
            </div>
          </div>

          {auth && (
            <div className="score-stars">
            <Rating initialValue={userScore} fillColor="#000000" onClick={handleRating} />
            </div>
          )}
          <div className="actionBtn">
            <a href={url} target="_blank" className="cta btn btn-primary">
              try now
            </a>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default ProjectCard;
