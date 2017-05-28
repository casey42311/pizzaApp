var express = require('express');
var router = express.Router();
var customer = require('../models/pizza-customer');

router.get('/', function(req, res, next) {
  var callback = function(err, data) {
    res.send(data);
  }
  customer.latest(callback);
});         

router.post('/', function(req, res, next) {
  var newCustomer = req.body;    
  
  var callback = function(err) {
    if(err)
      res.send('unable to add customer');
    else
      res.send('customer added');
  }
  
  customer.add(newCustomer, callback);  
});

module.exports = router;
