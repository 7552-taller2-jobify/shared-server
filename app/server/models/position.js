var Sequelize = require("sequelize");
var sequelize = require("../domain/sequelize");
var Category = require("./category");

var Position = sequelize.define('position', {
  name: {type: Sequelize.STRING, allowNull: false, notEmpty: true},
  description: {type: Sequelize.STRING, allowNull: true, defaultValue: null}
}, {
  underscored: true,
  indexes: [{unique: true, fields: ['name']}]
});


Category.sync();
Position.belongsTo(Category, {foreignKey: 'category_name'}); // must have category_name attribte in Position
Position.sync();

module.exports = Position;
