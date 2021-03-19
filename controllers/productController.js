import productModel from "../models/product";
import co from "co";

export const getProducts = (req, res) => {
    let getData = co(function* () {
        return {
            product : yield productModel.findOne({ 'id' : req.params.id}).exec()
        };
    });
    getData.then( result => {
        res.render('products/detail', {product: result.product});
    });
}