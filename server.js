var express = require('express');
var dateFormat = require('dateformat');
var bodyParser = require('body-parser');
var positions = require("./server/positions");
var categories = require("./server/categories");
var skills = require("./server/skills");
var app = express();

//extends to qs lib
app.use(bodyParser.urlencoded({extended: true}));
//Needed to read req.body
app.use(bodyParser.json());

//Logger middleware
app.use(function(req, res, next) {
  console.log(dateFormat(Date.now(),"yyyy-mm-dd'T'hh:MM:ss"), "["+req.method+"] "+req.originalUrl);
  next();
});

//Routing to others responsables to handle request
app.use('/job_positions', positions)
app.use('/categories', categories)
app.use('/skills', skills)

//error handler
app.use(function err(err, req, res, next) {
  console.error(err);
  res.setHeader('Content-Type', 'application/json');
  res.status(500).json({code:500,message:err});
});

if (require.main === module) {
  var port = process.env.PORT || 5000;
  app.listen(port, function() {
    console.log("==> Shared-Server starts on port " + port);
    console.log("Try http://localhost:"+port+"/job_positions/test\n");
  });
} else {
  module.exports = app;
}
