import productModel from "../models/product";
import co from "co";

export const getProducts = (req, res) => {
    let token = req.cookies.token   //로그인이 되어있는지 판별 (로그인시 상단에 <로그아웃 프로필> 표시 안되있을시 <로그인? 표시 )
    let getData = co(function* () {
        return {
            product : yield productModel.findOne({ 'id' : req.params.id}).exec()
        };
    });
    getData.then( result => {
        res.render('products/detail', {user: token, product: result.product});
    });
}