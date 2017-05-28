describe('pizza component tests', function() {

	it('should set the selector attribute', function() {
    var componentAnnotations = 
      Reflect.getMetadata('annotations', app.PeopleComponent)[0];
   
    expect(componentAnnotations.selector).to.be.eql('pizza');
  });
})