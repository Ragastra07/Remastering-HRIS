'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class karir extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  karir.init({
    tgl_masuk: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'karir',
  });
  return karir;
};