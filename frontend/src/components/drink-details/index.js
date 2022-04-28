import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { getProfile } from "../../actions/auth-actions";
import { cocktailLookup } from "../../actions/api-actions";

import DrinkRating from "../search-results/rating";
import Nav from "../home/nav";

const DrinkDetails = () => {
  const stateProfile = useSelector((state) => state.auth.profile);
  const searchResults = useSelector((state) => state.api.results);
  const drinkDetails = useSelector((state) => state.api.details);

  const [profile, setProfile] = useState(stateProfile);
  const [details, setDetails] = useState();

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
        {location.state.fromSearch && (
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
            {details && profile && (
              <DrinkRating drink={details} profile={profile} />
            )}
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
      </div>
    </>
  );
};

export default DrinkDetails;
