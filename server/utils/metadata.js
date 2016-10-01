var pjson = require('../../package.json');

var metadata = function(json) {
  var count = 0;
  for (key in json) {
    count = json[key].length;
    break;
  }
  
  json.metadata = {
    version: pjson.version,
    count: count
  };
  return json;
}

module.exports = metadata;