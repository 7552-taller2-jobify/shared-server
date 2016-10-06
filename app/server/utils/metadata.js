var pjson = require('../../../package.json');

var metadata = function(json) {
  var count = 0;
  for (var key in json) {
    if ({}.hasOwnProperty.call(json, key)) {
      count = json[key].length;
      break;
    }
  }

  json.metadata = {
    version: pjson.version,
    count: count
  };
  return json;
};

module.exports = metadata;
