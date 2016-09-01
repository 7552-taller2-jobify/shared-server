var express = require('express');

var positions = require("./server/positions");

var port = process.env.PORT || 5000;

var app = express();
 
app.use('/job_positions', positions)

app.listen(port, function() {
  console.log("Shared-Server listening on port " + port);
});
