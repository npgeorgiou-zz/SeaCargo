var mongoose = require('mongoose');
var db       = require("./db");
var Customer = mongoose.model('Customer');

function getAllCustomers(callback) {
    Customer.find({}, function (err, customers) {
        if (err) {
            return callback(err);
        }
        callback(null, customers);
    });
}

function getCustomerById(custId, callback) {
    Customer.findById(custId, function (err, customer) {
        if (err) {
            return callback(err);
        }
        callback(null, customer);
    });
}


function deleteCustByCustId(custid, callback) {
    Customer.findOneAndRemove({_id: custid}, function (err, deletedDoc) {
        if (err) {
            return callback(err);
        }
        callback(null, deletedDoc)

    });

}

module.exports = {
    getAllCustomers: getAllCustomers,
    getCustomerById: getCustomerById,
    deleteCustByCustId: deleteCustByCustId
}