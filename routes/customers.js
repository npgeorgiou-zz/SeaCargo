var express = require('express');
var router = express.Router();
var Customer = require("../model/customers");

/* GET customers listing. */
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

router.delete('/:custid', function (req, res) {
    var custid = req.params.custid;
    Customer.deleteCustByCustId(custid, function (err, deletedDoc) {
        if (err) {
            return err;
        }
        console.log(deletedDoc);
        res.end('/customers');
    })
});

var sorter = function (entry1, entry2) {
    // This is a comparison function that will result in dates being sorted in
    // ASCENDING order.
    if (entry1._id > entry2._id) return 1;
    if (entry1._id < entry2._id) return -1;
    return 0;
};

module.exports = router;

