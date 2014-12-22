var express = require('express');
var router = express.Router();
var OrderDetail = require("../model/orderDetails");
var Product = require("../model/products");
var Order = require("../model/orders");
var Customer = require("../model/customers");
var Employee = require("../model/employees");


/* GET orderdetails. */
router.get('/:orderid', function (req, res) {
    var orderid = req.params.orderid;
    OrderDetail.getOrderDetailsByOrderId(orderid, function (err, details) {
        if (err) {
            return err;
        }
        //make array with productids
        var productIds = [];
        details.forEach(function (entry) {
            productIds.push(entry.productId)
        });
        //return products that match these ids
        Product.getProductsById(productIds, function (err, products) {
            if (err) {
                return err;
            }
            //get order from path (order id)
            Order.getOrderByOrderId(orderid, function (err, order) {
                if (err) {
                    return err;
                }
                //get customer
                console.log(orderid);
                console.log(order);
                Customer.getCustomerById(order[0].customerId, function (err, cust) {
                    if (err) {
                        return err;
                    }
                    //get emploee
                    Employee.getEmployeeById(order[0].employeeId, function (err, emploee) {
                        if (err) {
                            return err;
                        }
                        res.render("orderDetails", {tableTitle: "Order Details", order: order[0], emploee: emploee, customer: cust, orderDetails: details, products: products});
                    })
                })
            })
        })
    })

});

router.delete('/:orderdetailid', function (req, res) {
    var orderdetailid = req.params.orderdetailid;
    OrderDetail.getOrderIdByOrderDetailID(orderdetailid, function (err, orderId) {
        if (err) {
            return err;
        }
        console.log("### " + orderId);
        OrderDetail.deleteOrderDByOrderDId(orderdetailid, function (err, deletedDoc) {
            if (err) {
                return err;
                res.end('/');
            }
            res.end('/orderdetails/' + orderId);
        })
    })

});
module.exports = router;
