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


Position.belongsTo(Category, {foreignKey: 'category_name', constraints: false}); // must have category_name attribte in Position

Category.sync();

Position.sync();

module.exports = Position;
