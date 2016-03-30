var express  = require('express');
var router   = express.Router();
var sorter   = require('../util/sorter');
var Customer = require("../model/customers");

// GET customers
router.get('/', function (req, res) {
    Customer.getAllCustomers(function (err, AllCustomers) {
        if (err) {
            return err;
        }
        console.log(AllCustomers);
        res.render("customersList", {tableTitle: "All Customers", list: AllCustomers.sort(sorter)});
    })
});

//GET customer by id
router.get('/:customerid', function (req, res) {
    var customerid = req.params.customerid;
    Customer.getCustomerById(customerid, function (err, customer) {
        if (err) {
            return err;
        }
        res.render("customerInfo", {tableTitle: "Customer Card", object: customer});

    })
});

// DELETE customer by id
router.delete('/:custid', function (req, res) {
    var custid = req.params.custid;
    Customer.deleteCustByCustId(custid, function (err, deletedDoc) {
        if (err) {
            return err;
        }
        res.end('/customers');
    })
});

module.exports = router;

