'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable("position",
      {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING},
        category: {type: Sequelize.STRING},
        description: {type: Sequelize.STRING},
        date_created: {type: Sequelize.DATE},
        last_modified: {type: Sequelize.DATE}
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable("position");
  }
};