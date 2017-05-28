var db = require('../db');

var collectionName = 'pizza';

module.exports = {
  latest: function(callback) {
    db.get().collection(collectionName).find().sort({$natural:-1}).limit(1).toArray(callback);
  },
  
  add: function(newCustomer, callback) {
    var inserted = function(err) {
      if(!err)
        callback();
      else
        callback('unable to add customer');
    }                                              
    if(!newCustomer || newCustomer.firstName === undefined || newCustomer.lastName === undefined || newCustomer.phoneNumber === undefined || newCustomer.email === undefined || newCustomer.lat === undefined || newCustomer.lon === undefined)  
      callback('unable to add customer');
    else
      db.get().collection(collectionName).insertOne(newCustomer, inserted);
  }
};