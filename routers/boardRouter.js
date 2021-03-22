import express from "express";
import {  getlist, boardCreate, board_create_summit, boardDetail, boardUpdate, boardDelete, boardUpdate_summit } from "../controllers/boardController";
import routes from "../routes";
import { verifyToken } from "../middleware";


const boardRouter = express.Router();

boardRouter.get(routes.list, getlist);

boardRouter.get(routes.boardCreate, verifyToken, boardCreate);
boardRouter.post(routes.boardCreate, verifyToken, board_create_summit);

boardRouter.get(routes.boardUpdate, verifyToken, boardUpdate);
boardRouter.post(routes.boardUpdate, verifyToken, boardUpdate_summit);

boardRouter.get(routes.boardDetail, verifyToken, boardDetail);
boardRouter.get(routes.boardDelete, verifyToken, boardDelete);


export default boardRouter;