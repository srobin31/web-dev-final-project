import * as usersModel from "../models/users.js";

const usersController = (app) => {
  app.get("/api/users/:uid", getUserById);
  app.get("/api/users/fullName/:uid", getUserFullName);
  app.get("/api/users/basicInfo/:uid", getUserBasicInfo);
};

const getUserById = async (req, res) => {
  const userId = req.params.uid;
  const user = await usersModel.findUserById(userId);
  user.password = "";
  res.json(user);
}

const getUserFullName = async (req, res) => {
  const userId = req.params.uid;
  const user = await usersModel.findUserFullName(userId);
  res.json(user);
};

const getUserBasicInfo = async (req, res) => {
  const userId = req.params.uid;
  const user = await usersModel.findUserBasicInfo(userId);
  res.json(user);
};

export default usersController;
