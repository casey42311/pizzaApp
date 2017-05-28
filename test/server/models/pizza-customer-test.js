var expect = require('chai').expect;
var db = require('../../../db');
var customers = require('../../../models/pizza-customer');

describe('pizza customer tests', function() {
  var sampleCustomers;
  var sampleCustomer;

  before(function(done) {
    db.connect('mongodb://localhost/mytestdb', done);
  });       
  
  after(function() {
    db.close();
  });          
  
  beforeEach(function() {
    sampleCustomers = [
      {firstName: 'John', lastName: 'Doe', phoneNumber: '333-222-1111', email: 'john@gmail.com', lat: '46', lon: '2' },
      {firstName: 'Mike', lastName: 'Hill', phoneNumber: '777-888-9999', email: 'mike@yahoo.com', lat: '46', lon: '2' }
    ];
    sampleCustomer = {firstName: 'John', lastName: 'Doe', phoneNumber: '333-222-1111', email: 'john@gmail.com', lat: '46', lon: '2' };
    db.get().collection('customers').insert(sampleCustomers);
  });                                            
  
  afterEach(function() {
    db.get().collection('customers').drop();
  });

  it('latest should return the most recent customer', function(done) {
    var callback = function(err, data) { 
      expect(err).to.be.null;
      expect(data).to.be.eql([{firstName: 'John', lastName: 'Doe', phoneNumber: '333-222-1111', email: 'john@gmail.com', lat: '46', lon: '2' }]);
      done();
    }
    customers.latest(callback);
  });

  it('add should return message after adding a customer', function(done) {
    var callback = function(err) {
      expect(err).to.be.eql('customer added!');
      done();
    }
    customers.add(sampleCustomer, callback);
  })
});