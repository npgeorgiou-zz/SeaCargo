var express = require('express');
var router = express.Router();

/* GET Start Page */
router.get('/', function(req, res) {

    var error = req.query.error;
    res.locals.error = error;
    console.log(error);
    res.render("mainPage", {});;
});

module.exports = router;