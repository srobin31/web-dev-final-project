import React from "react";
import { Link } from "react-router-dom";

import StarRating from "../star-scale/rating";

const DrinkPreview = ({ drink, profile }) => {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card">
        <div className="card-header">
          <h4 className="mb-0 d-inline">{drink.name}</h4>
          {drink.alcoholic === "Alcoholic" ? (
            <h4 className="mb-0 d-inline float-end">
              <i className="fas fa-cocktail"></i>
            </h4>
          ) : (
            <></>
          )}
        </div>
        <Link to={`/details/${drink.id}`} state={{ fromSearch: true }}>
          <img
            className="card-img-top"
            src={drink.image}
            alt={`${drink.name} drink`}
          />
        </Link>
        <div className="card-body text-center">
          <Link
            to={`/details/${drink.id}`}
            state={{ fromSearch: true }}
            className="btn btn-info w-100"
          >
            Details
          </Link>
        </div>
        {profile && (
          <div className="card-footer bg-transparent text-center">
            <div className="d-block">
              <StarRating drink={drink} profile={profile} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrinkPreview;
