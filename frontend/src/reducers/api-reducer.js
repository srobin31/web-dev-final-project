import * as api_actions from "../actions/api-actions";

const apiReducer = (state = {}, action) => {
  switch (action.type) {
    case api_actions.SEARCH_COCKTAILS:
      return { ...state, results: filterResults(action.results.drinks) };
    case api_actions.SEARCH_BY_INGREDIENT:
      return { ...state, results: filterResults(action.fullResults) };
    case api_actions.COCKTAIL_LOOKUP:
      return { ...state, details: filterResults(action.details.drinks)[0] };
    default:
      return state;
  }
};

const filterResults = (results) => {
  if (results) {
    const alcoholic = results.filter(
      (drink) => drink.strAlcoholic === "Alcoholic"
    );
    const normalized = alcoholic.map((drink) => normalizeDetails(drink));
    return normalized;
  } else {
    return [];
  }
};

const normalizeDetails = (drink) => {
  const ingredients = getIngredients(drink);
  const instructions = drink.strInstructions.split(". ");
  const drinkDetails = {
    id: drink.idDrink,
    name: drink.strDrink,
    alternate: drink.strDrinkAlternate,
    category: drink.strCategory,
    glass: drink.strGlass,
    instructions: instructions,
    ingredients: ingredients,
    image: drink.strDrinkThumb,
    preview: `${drink.strDrinkThumb}/preview`,
  };
  return drinkDetails;
};

const getIngredients = (drink) => {
  const ingredients = [];
  const strIngredient = "strIngredient";
  const strMeasure = "strMeasure";
  for (let i = 1; i <= 15; i++) {
    let ingredientKey = `${strIngredient}${i}`;
    let measureKey = `${strMeasure}${i}`;
    if (drink[ingredientKey]) {
      if (drink[measureKey]) {
        ingredients.push(`${drink[measureKey]} ${drink[ingredientKey]}`);
      } else {
        ingredients.push(drink[ingredientKey]);
      }
    }
  }
  return ingredients;
};

export default apiReducer;
