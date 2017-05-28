describe('main2 tests', function() {
  var handler;
  
  document.addEventListener = function(event, eventHandler) {
    if(event === 'DOMContentLoaded')
      handler = eventHandler;
  };
  
  it('main registers OrderComponent with bootstrap', function(done) {
    ng.platform.browser.bootstrap = function(component) {
      expect(component).to.be.eql(app.OrderComponent);
      done();
    };
  
    handler();
  });
});