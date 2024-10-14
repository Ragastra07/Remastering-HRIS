'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('permission-roles', {
      permissionId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'permissions',
          key: 'id'
        }
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('permission-roles');
  }
};