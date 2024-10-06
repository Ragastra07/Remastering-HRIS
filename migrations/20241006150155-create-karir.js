'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('karirs', {
      id: {
        type: DataTypes.UUID,
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
      divisi_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'master_divisis', // Ganti dengan nama tabel yang sesuai
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      pt_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'master_perusahaans', // Ganti dengan nama tabel yang sesuai
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      jabatan_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'master_jabatans', // Ganti dengan nama tabel yang sesuai
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      posisi_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'master_posisis', // Ganti dengan nama tabel yang sesuai
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      tgl_masuk: {
        type: Sequelize.DATE
      },
      tgl_berakhir: {
        type: Sequelize.DATE
      },
      kategori_karir: {
        type: Sequelize.SMALLINT,
        allowNull: true,
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
    await queryInterface.dropTable('karirs');
  }
};