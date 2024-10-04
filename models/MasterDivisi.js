'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MasterDivisi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MasterDivisi.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    nama_divisi: {
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
    modelName: 'MasterDivisi',
  });
  return MasterDivisi;
};