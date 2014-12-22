var mongoose = require('mongoose');
var db = require("./db");
var Product = mongoose.model('Product');

function getAllProducts(callback) {
    Product.find({}, function (err, products) {
        if (err) {
            return callback(err);
        }
        callback(null, products);
    });
}

function getProductsByCategoryId(categoryId, callback) {
    Product.find({ categoryId: categoryId }, function (err, products) {
        if (err) {
            return callback(err);
        }
        callback(null, products);
    });
}

function getProductsById(productIds, callback) {
    Product.find({ _id: { $in: productIds } }, function (err, product) {
        if (err) {
            return callback(err);
        }
        callback(null, product);
    });
}

function deleteProdByProdId(productid, callback) {
    Product.findOneAndRemove({_id: productid}, function (err, deletedDoc) {
        if (err) {
            return callback(err);
        }
        callback(null, deletedDoc)

    });

}

module.exports = {
    getAllProducts: getAllProducts,
    getProductsByCategoryId: getProductsByCategoryId,
    getProductsById: getProductsById,
    deleteProdByProdId:deleteProdByProdId
}