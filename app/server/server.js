var express = require('express');
var dateFormat = require('dateformat');
var bodyParser = require('body-parser');
var positions = require("./positions");
var categories = require("./categories");
var skills = require("./skills");
var app = express();

app.use(express.static(__dirname + '/public'));


// extends to qs lib
app.use(bodyParser.urlencoded({extended: true}));
// Needed to read req.body
app.use(bodyParser.json());

// Logger middleware
app.use(function(req, res, next) {
  console.log(dateFormat(Date.now(), "yyyy-mm-dd'T'hh:MM:ss"), "[" +
   req.method + "] " + req.originalUrl);
  next();
});

// Routing to others responsables to handle request
app.use('/job_positions', positions);
app.use('/categories', categories);
app.use('/skills', skills);

// borrar
app.post('/users/login', function(req, res, next) {
  var json = {
    profile: {
      id: 1,
      first_name: "sergio matias",
      last_name: "piano",
      email: "smpiano@gmail.com",
      birthday: "24/07/1984",
      address: {
        lat: "-34.61543532",
        lon: "-58.37213459"
      }
    },
    positions: {
      job_positions: [],
      metadata: {
        version: "1.0.0",
        count: 0
      }
    }
  };
  res.send(json);
});

// error handler
app.use(function(err, req, res, next) {
  console.error('Jobify ERROR: ' + err);
  res.status(500).json({code: 500, message: err.message});
});

if (require.main === module) {
  var port = process.env.PORT || 5000;
  app.listen(port, function() {
    console.log("==> Shared-Server starts on port " + port);
    console.log("Try http://localhost:" + port + "/job_positions/test\n");
  });
} else {
  module.exports = app;
}
