describe('Metadata', function() {
  var metadata = require('../../app/server/utils/metadata');

  it('debe devolver metadata json de un json con una lista vacia',
    function() {
      var json = {element: []};
      var res = metadata(json);
      expect(res).toEqual({element: [], metadata:
        {version: "1.0.0", count: 0}});
    });

  it('debe devolver metadata json de un json con una lista de varios elementos',
    function() {
      var json = {element: [1, 2, 3, 4, 5, 6, 7]};
      var res = metadata(json);
      expect(res).toEqual({element: [1, 2, 3, 4, 5, 6, 7],
        metadata: {version: "1.0.0", count: 7}});
    });
});
