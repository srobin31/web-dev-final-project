import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const usersSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    registerDate: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "users" }
);

usersSchema.plugin(uniqueValidator);
export const usersModel = mongoose.model("usersModel", usersSchema);

export const findAllUsers = () => usersModel.find();
export const findUserById = (id) => usersModel.findById(id);
export const findUserByEmail = (email) => usersModel.findOne({ email: email });
export const findUserFullName = (id) =>
  usersModel.findById(id, { fullName: 1 });
export const findUserBasicInfo = (id) =>
  usersModel.findById(id, { fullName: 1, registerDate: 1 });

export const registerUser = (user) => usersModel.create(user);
export const updateUser = (uid, user) =>
  usersModel.updateOne({ _id: uid }, { $set: user });
export const findAllEmails = () => usersModel.find({}, { email: 1, _id: 0 });
