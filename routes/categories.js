var express = require('express');
var router = express.Router();
var Category = require("../model/categories");

/* GET categories listing. */
router.get('/', function (req, res) {
    console.log("here");
    Category.getAllCategories(function (err, AllCategories) {
        if (err) {
            return err;
        }
        res.render("categoriesList", {tableTitle: "All Categories", list: AllCategories.sort(sorter)});
    })
});

router.delete('/:categoryid', function (req, res) {
    var categoryid = req.params.categoryid;
    Category.deleteCategoryByCategoryId(categoryid, function (err, deletedDoc) {
        if (err) {
            return err;
        }
        console.log(deletedDoc);
        res.end('/categories');
    })
});

var sorter = function (entry1, entry2) {
    // This is a comparison function that will result in categories being sorted in
    // DESCENDING order.
    if (entry1._id > entry2._id) return 1;
    if (entry1._id < entry2._id) return -1;
    return 0;
};

module.exports = router;
