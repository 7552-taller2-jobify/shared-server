var Sequelize = require("sequelize");
var sequelize = require("../domain/sequelize");
var Category = require("./category");

var Skill = sequelize.define('skill', {
  name: {type: Sequelize.STRING, allowNull: false, notEmpty: true},
  description: {type: Sequelize.STRING, allowNull: true, defaultValue: null}
}, {
  indexes: [{unique: true, fields: ['name']}]
});

Category.hasMany(Skill, {foreignKey: 'category_name'});
Skill.sync();

module.exports = Skill;
