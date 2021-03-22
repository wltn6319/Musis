import ProductsModel from '../models/product';
import paginate from 'express-paginate';
import adminRequired from '../libs/adminRequired';
import csrf from 'csurf';
import path from 'path';
import multer from 'multer';
import fs from 'fs';

export const getAdminHome = (req, res) => {
    res.redirect('/admin/products');
    //res.render('products.ejs');
}

export const getAdminProducts = async(req, res, next) => {
    let token = req.cookies.token   //로그인이 되어있는지 판별 (로그인시 상단에 <로그아웃 프로필> 표시 안되있을시 <로그인? 표시 )
    const [ results, itemCount ] = await Promise.all([
        ProductsModel.find().sort('-created_at').limit(req.query.limit).skip(req.skip).exec(),
        ProductsModel.countDocuments({})
    ]);
    const pageCount = Math.ceil(itemCount / req.query.limit);
    
    const pages = paginate.getArrayPages(req)( 10 , pageCount, req.query.page); // 10개씩 페이지 블락

    res.render('admin/products', { 
        user : token,
        products : results , 
        pages: pages,
        pageCount : pageCount,
    });
}

export const getProductWrite = (req, res) => {
    let token = req.cookies.token   //로그인이 되어있는지 판별 (로그인시 상단에 <로그아웃 프로필> 표시 안되있을시 <로그인? 표시 )
    res.render( 'admin/form' , { user: token, product : "", csrfToken : req.csrfToken() }); 
}

export const postProductWrite = (req, res) => {
    let product = new ProductsModel({
        name : req.body.name,
        thumbnail : (req.file) ? req.file.filename : "",
        price : req.body.price,
        description : req.body.description,
        username : "zlel175"
        // username : req.user.username
    });

    if(!product.validateSync()){
        product.save(function(err){
            res.redirect('/admin/products');
        });
    }else{
        res.send('error');
    }
}

export const getProductDetail = async(req, res) => {
    try{
        let token = req.cookies.token   //로그인이 되어있는지 판별 (로그인시 상단에 <로그아웃 프로필> 표시 안되있을시 <로그인? 표시 )
        let product = await ProductsModel.findOne( { 'id' :  req.params.id }).exec();
        
        res.render('admin/productsDetail', { user: token, product: product });
    }catch(e){
        res.send(e);
    }
}

export const getProductEdit = (req, res) => {
    let token = req.cookies.token   //로그인이 되어있는지 판별 (로그인시 상단에 <로그아웃 프로필> 표시 안되있을시 <로그인? 표시 )
    ProductsModel.findOne({ id : req.params.id } , function(err, product){
        res.render('admin/form', { user: token, product : product, csrfToken : req.csrfToken() });
    });
}

export const postProductEdit = (req, res) => {
    ProductsModel.findOne( {id : req.params.id} , function(err, product){
        
        if(req.file && product.thumbnail){  //요청중에 파일이 존재 할시 이전이미지 지운다.
            fs.unlinkSync( uploadDir + '/' + product.thumbnail );
        }

        //넣을 변수 값을 셋팅한다
        let query = {
            name : req.body.name,
            thumbnail : (req.file) ? req.file.filename : product.thumbnail,
            price : req.body.price,
            description : req.body.description,
        };

        let products = new ProductsModel(query);
        if(!products.validateSync()){
            //update의 첫번째 인자는 조건, 두번째 인자는 바뀔 값들
            ProductsModel.update({ id : req.params.id }, { $set : query }, function(err){
                res.redirect('/admin/products/detail/' + req.params.id ); //수정후 본래보던 상세페이지로 이동
            });
        }else{
            res.send('error');
        }
    });
}

export const getProductDelete = (req, res) => {
    ProductsModel.remove({ id : req.params.id }, function(err){
        res.redirect('/admin/products');
    });
}