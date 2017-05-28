(function(app) {
  app.OrderComponent = ng.core
    .Component({
      selector: 'order',
      templateUrl: '../../order-confirmation.html',
      providers: [ng.http.HTTP_PROVIDERS, app.PizzaCustomerService]
    })
    .Class({
      constructor: [app.PizzaCustomerService, function(_service) {
        this.service = _service;
        this.orders = [];
        this.errorMessage = '';
      }],
      getDetails: function() {
        this.service.getDetails()
                    .subscribe(this.updateDetails.bind(this), this.updateError.bind(this));
      },
      updateDetails: function(data) {
        this.orders = data;
      },  
      updateError: function(err) {
        this.errorMessage = err;
      },
      ngOnInit: function() {
        this.getDetails();
      }
    });
})(window.app || (window.app = {}));