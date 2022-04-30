import React, { useState, useEffect } from "react";

import {
  getUserDrinkRating,
  updateRating,
} from "../../services/ratings-service";

const StarRating = ({ drink, profile }) => {
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

  const renderStar = (pos, lit) => {
    const style = lit ? "fas text-warning" : "far text-muted";
    return (
      <i
        key={pos}
        className={`${style} fa-star fa-2x px-1`}
        role="button"
        onClick={() => handleRatingChange(pos)}
      ></i>
    );
  };

  return [1, 2, 3, 4, 5].map((i) => renderStar(i, i <= rating.score));
};

export default StarRating;
