import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  searchCocktailsApi,
  searchByIngredientApi,
} from "../../actions/api-actions";

const Search = ({ searchStr = "", cocktailSearch = true }) => {
  const [searchString, setSearchString] = useState(searchStr);
  const [searchCocktails, setSearchCocktails] = useState(cocktailSearch);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    let searchQuery;
    if (searchCocktails) {
      searchQuery = `s=${searchString}`;
      searchCocktailsApi(dispatch, searchQuery)
        .then((results) => navigate(`/results?${searchQuery}`))
        .catch((e) => alert(e));
    } else {
      searchQuery = `i=${searchString}`;
      searchByIngredientApi(dispatch, searchQuery)
        .then((results) => navigate(`/results?${searchQuery}`))
        .catch((e) => alert(e));
    }
  };

  return (
    <div>
      <div className="input-group w-75 mx-auto mb-2">
        <input
          className="form-control form-control-lg"
          placeholder={
            searchCocktails ? "Search Cocktails" : "Search by Ingredient"
          }
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
        <div className="input-group-lg">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div
        className="input-group w-50 mx-auto text-center"
        onChange={(e) => {
          setSearchCocktails(e.target.value === "cocktail");
        }}
      >
        <div
          className="btn-group mx-auto"
          role="group"
          aria-label="basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            name="searchType"
            id="cocktail"
            value="cocktail"
            {...(cocktailSearch && { defaultChecked: true })}
          />
          <label className="btn btn-outline-primary" htmlFor="cocktail">
            Search for Cocktails
          </label>
          <input
            type="radio"
            className="btn-check"
            name="searchType"
            id="ingredient"
            value="ingredient"
            {...(!cocktailSearch && { defaultChecked: true })}
          />
          <label className="btn btn-outline-primary" htmlFor="ingredient">
            Search by Ingredient
          </label>
        </div>
      </div>
    </div>
  );
};

export default Search;
