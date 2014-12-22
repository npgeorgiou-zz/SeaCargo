var mongoose = require('mongoose');
var db = require("./db");
var Category = mongoose.model('Category');

function getAllCategories(callback) {
    Category.find({}, function (err, categories) {
        if (err) {
            return callback(err);
        }
        callback(null, categories);
    });
}

function deleteCategoryByCategoryId(categoryid, callback) {
    Category.findOneAndRemove({_id: categoryid}, function (err, deletedDoc) {
        if (err) {
            return callback(err);
        }
        callback(null, deletedDoc)

    });

}

module.exports = {
    getAllCategories: getAllCategories,
    deleteCategoryByCategoryId: deleteCategoryByCategoryId
}