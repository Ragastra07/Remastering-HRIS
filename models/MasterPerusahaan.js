'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MasterPerusahaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MasterPerusahaan.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    nama_pt: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('Non Aktif', 'Aktif'),
      defaultValue: 'Aktif',
      allowNull: false,
    },
    created_id: {
      type: Sequelize.SMALLINT,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      
    }
  }, {
    sequelize,
    modelName: 'MasterPerusahaan',
  });
  return MasterPerusahaan;
};