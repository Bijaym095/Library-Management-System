import express from "express";
import {
  addUser,
  deleteUser,
  getSingleUser,
  getUsers,
  updateUser,
} from "../controllers/user-controller.js";

const userRoute = express.Router();

userRoute.route("/").get(getUsers).post(addUser);
userRoute.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);

export default userRoute;
