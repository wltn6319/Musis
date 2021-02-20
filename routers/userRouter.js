import express from "express";
import passport from "passport";
import { getProfile } from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.profile, passport.authenticate("jwt", { session: false }), getProfile);

export default userRouter;