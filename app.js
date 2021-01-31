import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();


app.use(helmet);
app.use(morgan("dev"));
app.use(cookieParser);


export default app;