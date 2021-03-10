import express from "express";
import { getProfile, postProfile } from "../controllers/userController";
import { verifyToken } from "../middleware";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.profile, verifyToken, getProfile);
userRouter.post(routes.profile, verifyToken, postProfile);

export default userRouter;

// /user/profile