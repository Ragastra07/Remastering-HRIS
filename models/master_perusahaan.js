'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_perusahaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_perusahaan.init({
    nama_pt: DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'master_perusahaan',
  });
  return master_perusahaan;
};