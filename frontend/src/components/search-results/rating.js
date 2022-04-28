import React, { useState, useEffect } from "react";

import {
  getUserDrinkRating,
  updateRating,
} from "../../services/ratings-service";

const DrinkRating = ({ drink, profile }) => {
  const [rating, setRating] = useState({
    userId: profile._id,
    drinkId: drink.id,
    score: 0,
  });

  const fetchRating = async () => {
    if (profile) {
      const response = await getUserDrinkRating(profile._id, drink.id);
      if (response) {
        setRating({ ...rating, score: response.score });
      }
    }
  };

  const handleRatingChange = async (score) => {
    if (score !== rating.score) {
      const newRating = { ...rating, score };
      setRating(newRating);
      await updateRating(newRating);
    }
  };

  useEffect(() => {
    fetchRating();
  });

  const renderStar = (score, lit) => {
    const style = lit ? "fas text-warning" : "far text-muted";
    return (
      <i
        key={score}
        className={`${style} fa-star fa-2x px-1`}
        role="button"
        onClick={() => handleRatingChange(score)}
      ></i>
    );
  };

  const renderRating = () => {
    const starsArr = [];
    for (let i = 1; i <= 5; i++) {
      starsArr.push(renderStar(i, i <= rating.score));
    }
    return starsArr;
  };

  return (
    <>
      <div className="d-block">{renderRating()}</div>
    </>
  );
};

export default DrinkRating;
