'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_jabatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  master_jabatan.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    nama_jabatan: {
      type: Sequelize.STRING
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
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    sequelize,
    modelName: 'master_jabatan',
  });
  return master_jabatan;
};