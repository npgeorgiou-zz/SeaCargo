var express     = require('express');
var router      = express.Router();
var sorter      = require('../util/sorter');
var Order       = require("../model/orders");
var OrderDetail = require("../model/orderDetails");

// GET orders
router.get('/', function (req, res) {
    console.log("here");
    Order.getAllOrders(function (err, allOrders) {
        if (err) {
            return err;
        }
        res.render("ordersList", {tableTitle: "All Orders", list: allOrders.sort(sorter)});
    })
});


// DELETE order by id
router.delete('/:orderid', function (req, res) {
    var orderid = req.params.orderid;
    Order.deleteOrderByOrderId(orderid, function (err, deletedDoc) {
        if (err) {
            return err;
        }
        console.log(deletedDoc);
        res.end('/orders');
    })
});

// GET orders of certain product
router.get('/product/:productid', function (req, res) {
    var productid = req.params.productid;

    OrderDetail.getOrderDetailsByProductId(productid, function (err, OrderDetails) {
        if (err) {
            return err;
        }
        //make array with orderids
        var orderIds = [];
        OrderDetails.forEach(function (entry) {
            orderIds.push(entry.orderId)
        });
        //return orders that match these ids
        Order.getOrderByMultipleOrderIds(orderIds, function (err, orders) {
            if (err) {
                return err;
            }
            res.render("ordersList", {tableTitle: "Orders of product with ID " + productid, list: orders.sort(sorter)});
        })

    })
});

// GET orders of certain customer
router.get('/customer/:customerid', function (req, res) {
    var customerid = req.params.customerid;
    Order.getOrdersByCustomerId(customerid, function (err, orders) {
        if (err) {
            return err;
        }
        res.render("ordersList", {tableTitle: "Orders of customer with ID " + customerid, list: orders.sort(sorter)});
    })
});

// GET orders of certain employee
router.get('/employee/:employeeid', function (req, res) {
    var employeeid = req.params.employeeid;
    Order.getOrdersByEmployeeId(employeeid, function (err, orders) {
        if (err) {
            return err;
        }
        res.render("ordersList", {tableTitle: "Orders of employee with ID " + employeeid, list: orders.sort(sorter)});
    })
});

module.exports = router;
