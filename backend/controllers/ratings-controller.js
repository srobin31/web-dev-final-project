import * as ratingsModel from "../models/ratings.js";

const ratingsController = (app) => {
  app.get("/api/ratings/:uid/:did", findUserDrinkRating);
  app.get("/api/ratings/:id", findAllRatings);
  app.put("/api/ratings", updateRating);
};

const findUserDrinkRating = async (req, res) => {
  const userId = req.params.uid;
  const drinkId = req.params.did;
  const rating = await ratingsModel.findUserDrinkRating(userId, drinkId);
  res.json(rating);
};

const findAllRatings = async (req, res) => {
  const id = req.params.id;
  let ratings;
  if (isNaN(id)) {
    ratings = await ratingsModel.findAllUserRatings(id);
  } else {
    ratings = await ratingsModel.findAllDrinkRatings(id);
  }
  res.json(ratings);
};

const updateRating = async (req, res) => {
  const rating = req.body;
  const userId = rating.userId;
  const drinkId = rating.drinkId;
  const updatedScore = rating.score;
  const status = await ratingsModel.updateRating(userId, drinkId, updatedScore);
  res.json(status);
};

export default ratingsController;
