'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_divisi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_divisi.init({
    nama_divisi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'master_divisi',
  });
  return master_divisi;
};