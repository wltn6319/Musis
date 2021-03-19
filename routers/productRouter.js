import express from "express";
import { getProducts } from "../controllers/productController";
import routes from "../routes";

const productRouter = express.Router();

productRouter.get(routes.productsDetail, getProducts)

export default productRouter;