(function(app) {
  app.PizzaCustomerService = ng.core.
    Class({
      constructor: [ng.http.Http, function(_http) {
        this.http = _http;
      }],
      getDetails: function() {
        return this.http.get('/pizza')
                   .map(this.extractData);
      },
      addCustomer: function(data) {
        var options = 
          {headers: new ng.http.Headers({'Content-Type': 'application/json'})};

        return this.http.post('/pizza', JSON.stringify(data), options);
      },                            
      extractData: function(response) {
        if(response.status === 200)             
          return response.json();
        else
          throw new Error("error getting data");
      }
    });
})(window.app || (window.app = {}));