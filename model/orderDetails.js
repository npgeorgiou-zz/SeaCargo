var mongoose = require('mongoose');
var db = require("./db");
var OrderDetail = mongoose.model('OrderDetail');


function getOrderDetailsByOrderId(orderid, callback) {
    OrderDetail.find({ orderId: orderid }, function (err, orderdetails) {
        if (err) {
            return callback(err);
        }
        callback(null, orderdetails);
    });
}

function deleteOrderDByOrderDId(orderid, callback) {
    OrderDetail.findOneAndRemove({_id: orderid}, function (err, deletedDoc) {
        if (err) {
            return callback(err);
        }
        callback(null, deletedDoc)

    });

}

function getOrderDetailsByProductId(producid, callback) {
    OrderDetail.find({ productId: producid }, function (err, orderdetails) {
        if (err) {
            return callback(err);
        }
        callback(null, orderdetails);
    });
}

function getOrderIdByOrderDetailID(orderDid, callback) {
    OrderDetail.find({ _id: orderDid }, function (err, orderDetail) {
        if (err) {
            return callback(err);
        }
        console.log(">>> " + orderDetail);
        callback(null, orderDetail[0].orderId);
    });
}

module.exports = {
    getOrderDetailsByOrderId: getOrderDetailsByOrderId,
    deleteOrderDByOrderDId: deleteOrderDByOrderDId,
    getOrderDetailsByProductId: getOrderDetailsByProductId,
    getOrderIdByOrderDetailID: getOrderIdByOrderDetailID
}