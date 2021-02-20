import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import { localsMiddleware } from "./middleware";
import userRouter from "./routers/userRouter";
import passport from "passport";
import "./passport";


const app = express();


app.use(helmet());
app.set("view engine", "pug"); 
app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(localsMiddleware);

app.use(passport.initialize());

app.use(routes.home, globalRouter);
app.use(routes.user, userRouter);

export default app;