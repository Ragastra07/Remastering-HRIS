'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('phks', {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('phks');
  }
};