'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_perusahaans', {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_perusahaans');
  }
};