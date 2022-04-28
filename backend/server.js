import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import session from "express-session";

import authController from "./controllers/auth-controller.js";
import ratingsController from "./controllers/ratings-controller.js";

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/webdev";
mongoose.connect(CONNECTION_STRING);

const app = express();

let sess = {
  secret: process.env.SECRET || "SECRET",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
};
if (process.env.ENV === "production") {
  app.set("trust proxy", 1);
  sess.cookie.secure = true;
}

app.use(session(sess));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

authController(app);
ratingsController(app);

app.listen(process.env.PORT || 4000);
