import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { getProfile } from "../../actions/auth-actions";
import { cocktailLookup } from "../../actions/api-actions";
import { getAllDrinkRatings } from "../../services/ratings-service";
import { getUserFullName } from "../../services/users-service";

import Nav from "../home/nav";
import StarRating from "../star-scale/rating";
import DrinkReview from "./review";

const DrinkDetails = () => {
  const stateProfile = useSelector((state) => state.auth.profile);
  const searchResults = useSelector((state) => state.api.results);
  const drinkDetails = useSelector((state) => state.api.details);

  const [profile, setProfile] = useState(stateProfile);
  const [details, setDetails] = useState();
  const [allReviews, setAllReviews] = useState([]);

  const dispatch = useDispatch();

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchProfile() {
      await getProfile(dispatch);
    }
    fetchProfile();
  }, [dispatch]);

  useEffect(() => {
    setProfile(stateProfile);
  }, [stateProfile]);

  useEffect(() => {
    if (!details) {
      if (searchResults) {
        const currDetails = searchResults.find((r) => r.id === params.did);
        setDetails(currDetails);
      } else {
        const lookupString = `i=${params.did}`;
        cocktailLookup(dispatch, lookupString).catch((e) => alert(e));
      }
    }
  }, [dispatch, details, searchResults, params.did]);

  useEffect(() => {
    if (drinkDetails && drinkDetails.id === params.did) {
      setDetails(drinkDetails);
    }
  }, [drinkDetails, params.did]);

  useEffect(() => {
    const fetchAllDrinkRatings = async () => {
      let ratings = await getAllDrinkRatings(params.did);
      if (ratings) {
        if (profile) {
          ratings = ratings.filter((rating) => rating.userId !== profile._id);
        }
        const ratingDetails = await Promise.all(
          ratings.map(async (rating) => {
            const userFullName = await getUserFullName(rating.userId).then(
              (res) => res.fullName
            );
            return { ...rating, userFullName: userFullName };
          })
        ).then((res) => res);
        setAllReviews(ratingDetails);
      }
    };
    fetchAllDrinkRatings();
  }, [profile, params.did]);

  function renderIngredients() {
    return (
      <ul className="list-group mb-2">
        {details.ingredients.map((i, index) => {
          return (
            <li key={index} className="list-group-item border-dark">
              {i}
            </li>
          );
        })}
      </ul>
    );
  }

  function renderInstructions() {
    return (
      <ul className="mb-2">
        {details.instructions.map((i, index) => {
          return <li key={index}>{i}</li>;
        })}
      </ul>
    );
  }

  return (
    <>
      <Nav />
      <div className="container mt-4">
        {location.state && location.state.fromSearch && (
          <div className="row mb-2">
            <div className="col-3">
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate(-1)}
              >
                Back to search results
              </button>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12 text-center">
            <h1>{details && details.name}</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center">
            <div className="d-block">
              {details && profile && (
                <StarRating drink={details} profile={profile} />
              )}
            </div>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-5">
            <img
              className="mw-100"
              src={details && `${details.image}`}
              alt="drink"
            />
          </div>
          <div className="col-7">
            <h3>Ingredients</h3>
            {details && renderIngredients()}
            <h3>Instructions</h3>
            {details && renderInstructions()}
            <h3>
              Glass: <strong>{details && details.glass}</strong>
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h3>
              {allReviews.length > 0 ? "" : "No "}
              {profile ? "Other User Reviews" : "User Reviews"}
            </h3>
          </div>
        </div>
        <div className="row mb-4">
          {allReviews.map((review) => {
            return <DrinkReview key={review._id} review={review} />;
          })}
        </div>
      </div>
    </>
  );
};

export default DrinkDetails;
