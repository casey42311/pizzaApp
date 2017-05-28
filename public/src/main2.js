(function(app) {
  document.addEventListener('DOMContentLoaded',  function() {
    ng.platform.browser.bootstrap(app.OrderComponent);
  });
})(window.app || (window.app = {}));