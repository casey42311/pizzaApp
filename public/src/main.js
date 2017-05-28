(function(app) {
  document.addEventListener('DOMContentLoaded',  function() {
    ng.platform.browser.bootstrap(app.PizzaCustomerComponent);
  });
})(window.app || (window.app = {}));