var express = require('express');
var router = express.Router();
var Employee = require("../model/employees");

/* GET emploees listing. */
router.get('/', function (req, res) {
    Employee.getAllEmployees(function (err, AllEmployees) {
        if (err) {
            return err;
        }
        console.log(AllEmployees);
        res.render("employeesList", {tableTitle: "All Employees",list: AllEmployees.sort(sorter)});
    })
});

//GET emploee by id
router.get('/:empId', function (req, res) {
    var empId = req.params.empId;
    Employee.getEmployeeById(empId, function (err, emploee) {
        if (err) {
            return err;
        }
        res.render("employeeInfo", {tableTitle: "Employee Card", object: emploee});

    })
});

router.delete('/:emplid', function (req, res) {
    var emplid = req.params.emplid;
    Employee.deleteEmpByEmpId(emplid, function (err, deletedDoc) {
        if (err) {
            return err;
        }
        console.log(deletedDoc);
        res.end('/employees');
    })
});
var sorter = function (entry1, entry2) {
    // This is a comparison function that will result in emploees being sorted in
    // DESCENDING order.
    if (entry1._id > entry2._id) return 1;
    if (entry1._id < entry2._id) return -1;
    return 0;
};

module.exports = router;

