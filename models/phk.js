'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class phk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      phk.belongsTo(models.Karyawan, { foreignKey: 'karyawan_id' });
      // Add associations for other related models (if applicable)
    }
  }
  phk.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    karyawan_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'karyawans', // Ganti dengan nama tabel yang sesuai
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    keterangan_phk: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    tgl_phk: {
      allowNull: false,
      type: Sequelize.DATE
    },
    created_id: {
      type: Sequelize.SMALLINT,
      allowNull: true
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
    modelName: 'phk',
  });
  return phk;
};