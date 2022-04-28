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
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "users" }
);

usersSchema.plugin(uniqueValidator);
export const usersModel = mongoose.model("usersModel", usersSchema);

export const findAllUsers = () => usersModel.find();
export const findUserByEmail = (email) => usersModel.findOne({ email: email });

export const registerUser = (user) => usersModel.create(user);
export const updateUser = (uid, user) =>
  usersModel.updateOne({ _id: uid }, { $set: user });
