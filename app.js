import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import { localsMiddleware } from "./middleware";
import userRouter from "./routers/userRouter";
import productRouter from "./routers/productRouter";
import adminRouter from "./routers/adminRouter";
import boardRouter from "./routers/boardRouter";
import passport from "passport";
import "./passport";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use('/JS', express.static(__dirname + '/node_modules/jquery/dist'));

app.use(helmet());
app.set("views", __dirname + "/views");
app.set("view engine", "ejs"); 
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(localsMiddleware);
app.use(passport.initialize());

app.use(routes.home, globalRouter);
app.use(routes.user, userRouter);
app.use(routes.admin, adminRouter);
app.use(routes.products, productRouter);
app.use(routes.board, boardRouter);

app.use('/uploads', express.static('uploads')); //업로드 path 추가

export default app;