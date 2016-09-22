var Sequelize = require("sequelize");
var pg = require("pg");
var seq = new Sequelize(process.env.DATABASE_URL,{
  define: {
    timestamps: true,
    createdAt: 'date_created', //overriding field name
    updatedAt: 'last_updated' //overriding field name
  }
});
var q = require("q");

seq.authenticate()
  .then(function(err) {
    console.log('Database connection SUCCESS ['+process.env.DATABASE_URL+'].\n');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

pg.types.setTypeParser(1114, function(stringValue) {
  return new Date(stringValue + "+0300"); //ARG timezone
});

module.exports = seq;
