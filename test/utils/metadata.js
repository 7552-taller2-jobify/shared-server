var metadata = require('metadata');
var assert = require('assert');
describe('Metadata', function() {
  describe('json con un elemento que contiene una lista', function() {
    it('debe devolver mismo json con metadata', function() {
    	var json = {element:[1,2,3,4,5,6,7]}
      assert.equal({{element:[1,2,3,4,5,6,7],metadata{version:1.0.0,count:7}}}, metadata(json));
    });
  });
});