var expect = require('chai').expect;
var sinon = require('sinon');
var customer = require('../../../models/pizza-customer');
var express = require('express');

describe('pizza-customer routes tests', function() {
	var sandbox;
	var router;

	var stubResSend = function(expected, done) {
    return { send: function(data) {
      		expect(data).to.be.eql(expected);
      		done();
    	}};
  	};

	beforeEach(function() {
    	sandbox = sinon.sandbox.create();
    
    	sandbox.stub(express, 'Router').returns({
      		get: sandbox.spy(),
     		post: sandbox.spy(),
      		delete: sandbox.spy()
    	});
            
    	router = require('../../../routes/pizza');
  	});
  
  	afterEach(function() {
    	sandbox.restore();
  	});

	it('get should register /', function() {
		expect(router.get.calledWith('/', sandbox.match.any)).to.be.true;
	});

	it('get / handler should call pizza-customer latest and return the result', function(done) {
		var sampleCustomer = {firstName: 'John', lastName: 'Doe', phoneNumber: '333-222-1111', email: 'john@gmail.com', lat: '46', lon: '2' };

		sandbox.stub(customer, 'latest', function(callback) {
      		callback(null, sampleCustomer);
    });

  	var req = {};
  	var res = stubResSend(sampleCustomer, done);

    var registeredCallback = router.get.firstCall.args[1];
  	registeredCallback(req, res);
	});

	it('post should register /', function() {
    	expect(router.post.calledWith('/', sandbox.match.any)).to.be.true;
  	});

	it("post / handler should call pizza-customer's add function & returns success", function(done) {
    
    	var sampleCustomer = {firstName: 'John', lastName: 'Doe', phoneNumber: '333-222-1111', email: 'john@gmail.com', lat: '46', lon: '2' };
    
    	sandbox.stub(customer, 'add', function(newCustomer, callback) {
      		expect(newCustomer).to.be.eql(sampleCustomer);
      		callback(null);
    	});
    
    	var req = { body: sampleCustomer };
    	var res = stubResSend('customer added', done);

    	var registeredCallback = router.post.firstCall.args[1];
    	registeredCallback(req, res);
  });
})