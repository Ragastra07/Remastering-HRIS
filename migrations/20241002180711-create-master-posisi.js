'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_posisis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_posisi: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('Non Aktif', 'Aktif'),
        defaultValue: 'Aktif',
        allowNull: false,
      },
      created_id: {
        type: Sequelize.TINYINT,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_posisis');
  }
};