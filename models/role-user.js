// ! SPETIE_494 Express.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roleuser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  role - user.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'role-user',
  });
  return role - user;
};