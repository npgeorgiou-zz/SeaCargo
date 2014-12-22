var express = require('express');
var router = express.Router();
var orders = require("../model/orders");

/* GET users listing. */
router.get('/', function (req, res) {
    console.log("here");
    orders.getAllOrders(function (err, allOrders) {
        if (err) {
            return err;
        }
        res.end(allOrders);
    })
});

module.exports = router;
