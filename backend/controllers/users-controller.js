import * as usersModel from "../models/users.js";

const usersController = (app) => {
  app.get("/api/users/:uid", getUserById);
  app.get("/api/users/fullName/:uid", getUserFullName);
  app.get("/api/users/basicInfo/:uid", getUserBasicInfo);
  app.put("/api/users/updateEmail", updateEmail);
};

const getUserById = async (req, res) => {
  const userId = req.params.uid;
  const user = await usersModel.findUserById(userId);
  user.password = "";
  res.json(user);
};

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

const updateEmail = async (req, res) => {
  const body = req.body;
  const userId = body.userId;
  const newEmail = body.email;
  const allEmails = await usersModel
    .findAllEmails()
    .then((res) => res.map((u) => u.email));
  if (allEmails.includes(newEmail)) {
    res.json({ error: "A user with this email address already exists." });
  } else {
    const status = await usersModel.updateUser(userId, { email: newEmail });
    if (status.modifiedCount === 1) {
      req.session["profile"].email = newEmail;
    }
    res.json(status);
  }
};

export default usersController;
