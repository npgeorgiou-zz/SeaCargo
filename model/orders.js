var mongoose = require('mongoose');
var db = require("./db");
var Order = mongoose.model('Order');


function getAllOrders(callback) {
    Order.find({}, function (err, jokes) {
        if (err) {
            return callback(err);
        }
        callback(null, jokes);
    });
}

function getOrderByOrderId(orderId, callback) {
    Order.find({_id: orderId}, function (err, order) {
        if (err) {
            return callback(err);
        }
        callback(null, order);
    });
}


function getOrderByMultipleOrderIds(orderId, callback) {
    Order.find({_id: { $in: orderId }}, function (err, order) {
        if (err) {
            return callback(err);
        }
        callback(null, order);
    });
}


function deleteOrderByOrderId(orderid, callback) {
    Order.findOneAndRemove({_id: orderid}, function (err, deletedDoc) {
        if (err) {
            return callback(err);
        }
        callback(null, deletedDoc)

    });

}


function getOrdersByProductId(orderId, callback) {
    Order.find({_id: orderId}, function (err, order) {
        if (err) {
            return callback(err);
        }
        callback(null, order);
    });
}

function getOrdersByCustomerId(custId, callback) {
    Order.find({customerId: custId}, function (err, order) {
        if (err) {
            return callback(err);
        }
        callback(null, order);
    });
}

function getOrdersByEmployeeId(empId, callback) {
    Order.find({employeeId: empId}, function (err, order) {
        if (err) {
            return callback(err);
        }
        callback(null, order);
    });
}

module.exports = {
    getAllOrders: getAllOrders,
    getOrderByOrderId: getOrderByOrderId,
    deleteOrderByOrderId: deleteOrderByOrderId,
    getOrderByMultipleOrderIds: getOrderByMultipleOrderIds,
    getOrdersByProductId: getOrdersByProductId,
    getOrdersByCustomerId: getOrdersByCustomerId,
    getOrdersByEmployeeId: getOrdersByEmployeeId
}