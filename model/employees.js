var mongoose = require('mongoose');
var db = require("./db");
var Employee = mongoose.model('Employee');

function getAllEmployees(callback) {
    Employee.find({}, function (err, customers) {
        if (err) {
            return callback(err);
        }
        callback(null, customers);
    });
}

function getEmployeeById(empId, callback) {
    Employee.findById(empId, function (err, emploee) {
        if (err) {
            return callback(err);
        }
        callback(null, emploee);
    });
}

function deleteEmpByEmpId(emplid, callback) {
    Employee.findOneAndRemove({_id: emplid}, function (err, deletedDoc) {
        if (err) {
            return callback(err);
        }
        callback(null, deletedDoc)

    });

}

module.exports = {
    getAllEmployees: getAllEmployees,
    getEmployeeById: getEmployeeById,
    deleteEmpByEmpId: deleteEmpByEmpId
}