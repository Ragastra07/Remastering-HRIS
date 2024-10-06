'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pelanggarans', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pelanggarans');
  }
};