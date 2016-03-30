var express  = require('express');
var router   = express.Router();
var sorter   = require('../util/sorter');
var Category = require("../model/categories");

// GET categories
router.get('/', function (req, res) {
    console.log("here");
    Category.getAllCategories(function (err, AllCategories) {
        if (err) {
            return err;
        }
        res.render("categoriesList", {tableTitle: "All Categories", list: AllCategories.sort(sorter)});
    })
});

// DELETE category by id
router.delete('/:categoryid', function (req, res) {
    var categoryid = req.params.categoryid;
    Category.deleteCategoryByCategoryId(categoryid, function (err, deletedDoc) {
        if (err) {
            return err;
        }
        res.end('/categories');
    })
});

module.exports = router;
