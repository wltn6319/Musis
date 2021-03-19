import express from "express";
import { getAdminHome, getAdminProducts, getProductDetail, getProductEdit, getProductWrite, postProductEdit, postProductWrite, getProductDelete } from "../controllers/adminController";
import { verifyToken } from "../middleware";
import routes from "../routes";
import paginate from 'express-paginate';
import csrf from 'csurf';
import path from 'path';

const adminRouter = express.Router();
let csrfProtection = csrf({ cookie : true});
let uploadDir = path.join( __dirname , '../uploads' );

let multer  = require('multer');
let storage = multer.diskStorage({
    destination : function (req, file, callback) { //이미지가 저장되는 도착지 지정
        callback(null, uploadDir );
    },
    filename : function (req, file, callback) { // products-날짜.jpg(png) 저장 
        callback(null, 'products-' + Date.now() + '.'+ file.mimetype.split('/')[1] );
    }
});

let upload = multer({ storage : storage });

//adminRouter.get(routes.home, getAdminHome);
adminRouter.get(routes.admin, getAdminHome);
//adminRouter.get(routes.products, paginate.middleware(5, 100), getAdminProducts);
adminRouter.get(routes.products,  paginate.middleware(5, 100), getAdminProducts);
adminRouter.get(routes.productsWrite, csrfProtection, getProductWrite);
adminRouter.post(routes.productsWrite, upload.single('thumbnail'), csrfProtection, postProductWrite);

adminRouter.get(routes.adminProductDetail, getProductDetail);
adminRouter.get(routes.adminProductEdit, csrfProtection, getProductEdit);
adminRouter.post(routes.adminProductEdit, upload.single('thumbnail'), csrfProtection, postProductEdit);
adminRouter.get(routes.adminProductDelete, getProductDelete);

export default adminRouter;

// /user/profile