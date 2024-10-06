'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pelanggaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pelanggaran.belongsTo(models.Karyawan, { foreignKey: 'karyawan_id' });
      // Add associations for other related models (if applicable)
    }
  }
  Pelanggaran.init({
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
    tgl_pelanggaran: {
      type: Sequelize.DATE
    },
    catatan: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    tingkatan: {
      type: Sequelize.ENUM(
        'Teguran Lisan',
        'Teguran Tertulis',
        'SP 1',
        'SP 2',
        'SP 3',
      ),
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM(
        'Diproses',
        'Selesai',
      ),
      allowNull: true
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
    modelName: 'Pelanggaran',
  });
  return Pelanggaran;
};