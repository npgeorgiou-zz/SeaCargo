var express = require('express');
var router  = express.Router();
var sorter  = require('../util/sorter');
var Product = require("../model/products");

// GET products listing
router.get('/', function (req, res) {
    Product.getAllProducts(function (err, allProducts) {
        if (err) {
            return err;
        }
        res.render("productsList", {tableTitle: "All Products",list: allProducts.sort(sorter)});
    })
});

// GET products by id
router.get('/:productid', function (req, res) {
    var productid = req.params.productid;
    Product.getProductsByCategoryId(productid, function (err, products) {
        if (err) {
            return err;
        }
        res.render("productsList", {tableTitle: "Products in Category " + productid, list: products});

    })
});

// DELETE products by id
router.delete('/:productid', function (req, res) {
    var productid = req.params.productid;
    Product.deleteProdByProdId(productid, function (err, deletedDoc) {
        if (err) {
            return err;
        }
        console.log(deletedDoc);
        res.end('/products');
    })
});


module.exports = router;
