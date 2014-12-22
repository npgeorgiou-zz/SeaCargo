var express = require('express');
var router = express.Router();
var Product = require("../model/products");

/* GET products listing. */
router.get('/', function (req, res) {
    Product.getAllProducts(function (err, allProducts) {
        if (err) {
            return err;
        }
        res.render("productsList", {tableTitle: "All Products",list: allProducts.sort(sorter)});
    })
});

//GET products by id
router.get('/:productid', function (req, res) {
    var productid = req.params.productid;
    Product.getProductsByCategoryId(productid, function (err, products) {
        if (err) {
            return err;
        }
        res.render("productsList", {tableTitle: "Products in Category " + categoryid, list: products});

    })
});

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

var sorter = function (entry1, entry2) {
    // This is a comparison function that will result in dates being sorted in
    // DESCENDING order.
    if (entry1._id > entry2._id) return 1;
    if (entry1._id < entry2._id) return -1;
    return 0;
};

module.exports = router;
