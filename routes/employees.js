var express  = require('express');
var router   = express.Router();
var sorter   = require('../util/sorter');
var Employee = require("../model/employees");

// GET employees
router.get('/', function (req, res) {
    Employee.getAllEmployees(function (err, AllEmployees) {
        if (err) {
            return err;
        }
        res.render("employeesList", {tableTitle: "All Employees",list: AllEmployees.sort(sorter)});
    })
});

// GET employee by id
router.get('/:empId', function (req, res) {
    var empId = req.params.empId;
    Employee.getEmployeeById(empId, function (err, emploee) {
        if (err) {
            return err;
        }
        res.render("employeeInfo", {tableTitle: "Employee Card", object: emploee});

    })
});

// DELETE employee by id
router.delete('/:emplid', function (req, res) {
    var emplid = req.params.emplid;
    Employee.deleteEmpByEmpId(emplid, function (err, deletedDoc) {
        if (err) {
            return err;
        }
        res.end('/employees');
    })
});

module.exports = router;

