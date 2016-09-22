var Sequelize = require("sequelize");
var sequelize = require("../domain/sequelize");

var Category  = sequelize.define('category', {
  name:  { type: Sequelize.STRING, allowNull: false, notEmpty: true, primaryKey: true },
  description: { type: Sequelize.STRING, allowNull: true, defaultValue: null }
}, {
  underscored: true,
  indexes: [{ unique: true, fields: ['name'] }]
});

module.exports = Category;