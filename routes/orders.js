var express = require('express');
var router = express.Router();
var Order = require("../model/orders");
var OrderDetail = require("../model/orderDetails");

/* GET orders listing. */
router.get('/', function (req, res) {
    console.log("here");
    Order.getAllOrders(function (err, allOrders) {
        if (err) {
            return err;
        }
        res.render("ordersList", {tableTitle: "All Orders", list: allOrders.sort(sorter)});
    })
});

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

/* GET orders of certain product listing. */
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

/* GET orders of certain customer listing. */
router.get('/customer/:customerid', function (req, res) {
    var customerid = req.params.customerid;
    Order.getOrdersByCustomerId(customerid, function (err, orders) {
        if (err) {
            return err;
        }
        res.render("ordersList", {tableTitle: "Orders of customer with ID " + customerid, list: orders.sort(sorter)});
    })
});

/* GET orders of certain employee listing. */
router.get('/employee/:employeeid', function (req, res) {
    var employeeid = req.params.employeeid;
    Order.getOrdersByEmployeeId(employeeid, function (err, orders) {
        if (err) {
            return err;
        }
        res.render("ordersList", {tableTitle: "Orders of emploee with ID " + employeeid, list: orders.sort(sorter)});
    })
});

var sorter = function (entry1, entry2) {
    // This is a comparison function that will result in dates being sorted in
    // DESCENDING order.
    if (entry1.orderDate > entry2.orderDate) return -1;
    if (entry1.orderDate < entry2.orderDate) return 1;
    return 0;
};

module.exports = router;
