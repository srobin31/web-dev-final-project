import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { cocktailLookup } from "../../actions/api-actions";
import { renderDateStr } from "../../utils/date";

import DrinkRating from "../search-results/rating";

const ReviewItem = ({ profile, review }) => {
  const drinkDetails = useSelector((state) => state.api.details);
  const [details, setDetails] = useState();

  const dispatch = useDispatch();

  const fetchDetails = useCallback(async () => {
    const lookupString = `i=${review.drinkId}`;
    await cocktailLookup(dispatch, lookupString).catch((e) => alert(e));
  }, [dispatch, review.drinkId]);

  useEffect(() => {
    if (drinkDetails && parseInt(drinkDetails.id) === review.drinkId) {
      setDetails(drinkDetails);
    }
  }, [drinkDetails, review.drinkId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const renderItem = () => {
    return (
      <div className="col-xl-3 col-lg-4 col-md-6 col-xs-12 d-xs-flex mb-4">
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">{details.name}</h4>
          </div>
          <Link to={`/details/${review.drinkId}`} state={{ fromSearch: false }}>
            <img
              className="card-img-top"
              src={details.image}
              alt={`${details.name} drink`}
            />
          </Link>
          <div className="card-body text-center">
            <Link
              to={`/details/${review.drinkId}`}
              state={{ fromSearch: false }}
              className="btn btn-info w-100"
            >
              Details
            </Link>
          </div>
          <div className="card-footer bg-transparent text-center">
            <DrinkRating drink={details} profile={profile} />
            <h6 className="mt-2">Reviewed on {renderDateStr(review.date)}</h6>
          </div>
        </div>
      </div>
    );
  };

  return <>{details ? renderItem() : <></>}</>;
};

export default ReviewItem;
