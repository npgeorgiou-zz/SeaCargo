var mongoose = require('mongoose');
var config   = require('../config/config');

var dbURI    = 'mongodb://' + config.db.user + ':' + config.db.password + '@ds063879.mongolab.com:63879/mongolabdb';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

/** ORDER SCHEMA ** */
var OrderSchema = mongoose.Schema({
    _id: Number,
    customerId: String,
    employeeId: Number,
    orderDate: String,
    requiredDate: String,
    shippedDate: String,
    shipVia: String,
    freight: Number,
    shipName: String,
    shipAddress: String,
    shipCity: String,
    shipRegion: String,
    shipPostalCode: String,
    shipCountry: String
});

/** ORDERDETAIL SCHEMA ** * */
var DetailsSchema = mongoose.Schema({
    orderId: Number,
    productId: Number,
    unitPrice: Number,
    quantity: Number,
    discount: Number
});

/** PRODUCT SCHEMA ** * */
var ProductSchema = mongoose.Schema({
    _id: Number,
    name: String,
    categoryId: Number,
    quantityPerUnit: String,
    unitPrice: Number,
    unitsInStock: Number,
    unitsOnOrder: Number,
    reorderLevel: Number,
    discontinued: Number
});
/** CUSTOMER SCHEMA ** * */
var CustomerSchema = mongoose.Schema({
    _id: String,
    companyName: String,
    contactName: String,
    contactTitle: String,
    address: String,
    city: String,
    region: String,
    postalCode: String,
    country: String,
    phone: String,
    fax: String
});

/** EMPLOYEE SCHEMA ** * */
var EmployeeSchema = mongoose.Schema({
    _id: Number,
    lastName: String,
    firstName: String,
    title: String,
    titleOfCourtesy: String,
    birthDate: String,
    hireDate: String,
    address: String,
    city: String,
    region: String,
    postalCode: String,
    country: String,
    homePhone: String,
    extension: String,
    notes: String
});

/** CATEGORY SCHEMA ** * */
var CategorySchema = mongoose.Schema({
    _id: Number,
    name: String,
    description: String
});

mongoose.model('Order', OrderSchema);
mongoose.model('OrderDetail', DetailsSchema);
mongoose.model('Category', CategorySchema);
mongoose.model('Product', ProductSchema);
mongoose.model('Customer', CustomerSchema);
mongoose.model('Employee', EmployeeSchema);