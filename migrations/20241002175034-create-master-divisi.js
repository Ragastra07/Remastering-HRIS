'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_divisis', {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_divisis');
  }
};