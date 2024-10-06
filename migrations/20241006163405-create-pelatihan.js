'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pelatihans', {
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
      nama_pelatihan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      agama: {
        allowNull: true,
        type: Sequelize.ENUM(
          'Internal Perusahaan',
          'Personal(Individual)',
          'Pemerintahan(Goverment)'
        )
      },
      tgl_mulai: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tgl_selesai: {
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
    await queryInterface.dropTable('pelatihans');
  }
};