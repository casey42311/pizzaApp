(function(app) {
  app.PizzaCustomerComponent = ng.core
    .Component({
      selector: 'pizza',
      templateUrl: 'pizza-customer.html',
      providers: [ng.http.HTTP_PROVIDERS, app.PizzaCustomerService]
    })
    .Class({
      constructor: [app.PizzaCustomerService, function(_service) {
        this.service = _service;
        this.newCustomer = {};
        this.errorMessage = '';
      }],
      success: function(position) {
        this.newCustomer.lat = position.coords.latitude.toFixed(4);
        this.newCustomer.lon = position.coords.longitude.toFixed(4);
      },
      locateme: function() {
        navigator.geolocation.getCurrentPosition(this.success.bind(this), this.updateError.bind(this));
      },  
      addCustomer: function() {
        this.service.addCustomer(this.newCustomer)
                    .subscribe(function() {}, this.updateError.bind(this));
      },
      updateError: function(err) {
        this.errorMessage = err;
      }
    });
})(window.app || (window.app = {}));