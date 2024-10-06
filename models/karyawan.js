'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Karyawan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      Karyawan.belongsTo(models.MasterDivisi, { foreignKey: 'divisi_id' });
      Karyawan.belongsTo(models.MasterPerusahaan, { foreignKey: 'pt_id' });
      Karyawan.belongsTo(models.MasterJabatan, { foreignKey: 'jabatan_id' });
      Karyawan.belongsTo(models.MasterPosisi, { foreignKey: 'posisi_id' });
      // Add associations for other related models (if applicable)
    }
  }
  Karyawan.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    nama_lengkap: {
      allowNull: true,
      type: Sequelize.STRING
    },
    nama_panggilan: {
      type: Sequelize.STRING
    },
    tempat_lahir: {
      allowNull: true,
      type: Sequelize.STRING
    },
    tanggal_lahir: {
      allowNull: true,
      type: Sequelize.DATE
    },
    umur: {
      allowNull: true,
      type: Sequelize.INTEGER
    },
    agama: {
      allowNull: true,
      type: Sequelize.ENUM(
        'Islam',
        'Kristen',
        'Katolik',
        'Hindu',
        'Buddha',
        'Konghucu'
      )
    },
    jenis_kelamin: {
      type: Sequelize.ENUM('Pria', 'Wanita'),
      comment: '1 = Laki-laki, 2 = Perempuan',
      allowNull: true
    },
    gol_darah: {
      type: Sequelize.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
      allowNull: true
    },
    riwayat_penyakit: {
      type: Sequelize.STRING,
      allowNull: true
    },
    no_kk: {
      type: Sequelize.STRING,
      allowNull: true
    },
    kode_pos: {
      type: Sequelize.STRING,
      allowNull: true
    },
    nik_penduduk: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true
    },
    alamat_ktp: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    alamat_domisili: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    pendidikan: {
      type: Sequelize.ENUM(
        'SD',
        'SMP',
        'SMA',
        'D1',
        'D2',
        'D3',
        'D4',
        'S1',
        'S2',
        'S3'
      ),
      allowNull: true
    },
    nama_sekolah: {
      type: Sequelize.STRING,
      allowNull: true
    },
    jurusan: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email_pribadi: {
      type: Sequelize.STRING,
      allowNull: true
    },
    no_telp: {
      type: Sequelize.STRING,
      allowNull: true
    },
    no_wa: {
      type: Sequelize.STRING,
      allowNull: true
    },
    no_keluarga: {
      type: Sequelize.STRING,
      allowNull: true
    },
    hubungan_keluarga: {
      type: Sequelize.ENUM(
        'Suami/Istri',
        'Ayah',
        'Ibu',
        'Kakak/Adik',
        'Paman/Bibi',
        'Kakek/Nenek'
      ),
      allowNull: true
    },
    status_pernikahan: {
      type: Sequelize.ENUM('Belum Menikah', 'Sudah Menikah', 'Janda', 'Duda'),
      allowNull: true
    },
    status_keluarga: {
      type: Sequelize.ENUM(
        'Kepala Keluarga',
        'Ibu',
        'Anak ke 1',
        'Anak ke 2',
        'Anak ke 3',
        'Lainnya'
      ),
      allowNull: true
    },
    jenis_sosmed: {
      type: Sequelize.ENUM('IG', 'FB', 'TikTok', 'YouTube', 'Twitter'),
      allowNull: true
    },
    nama_sosmed: {
      type: Sequelize.STRING,
      allowNull: true
    },
    // Data di perusahaan
    nik_Karyawan: {
      type: Sequelize.STRING,
      allowNull: true
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
    grade: {
      type: Sequelize.STRING,
      allowNull: true
    },
    tanggal_masuk: {
      type: Sequelize.DATE,
      allowNull: true
    },
    status_kerja: {
      type: Sequelize.ENUM('Kontrak', 'Tetap', 'Training'),
      allowNull: true
    },
    komposisi_peran: {
      type: Sequelize.ENUM('Support', 'Core'),
      allowNull: true
    },
    komposisi_generasi: {
      type: Sequelize.STRING,
      allowNull: true
    },
    tanggal_kontrak: {
      type: Sequelize.DATE,
      allowNull: true
    },
    tanggal_Karyawan_tetap: {
      type: Sequelize.DATE,
      allowNull: true
    },
    akhir_kontrak: {
      type: Sequelize.DATE,
      allowNull: true
    },
    masa_kontrak: {
      type: Sequelize.STRING,
      allowNull: true
    },
    masa_kerja_bulan: {
      type: Sequelize.STRING,
      allowNull: true
    },
    masa_kerja_tahun: {
      type: Sequelize.STRING,
      allowNull: true
    },
    kota_rekruitmen: {
      type: Sequelize.STRING,
      allowNull: true
    },
    kota_penugasan: {
      type: Sequelize.STRING,
      allowNull: true
    },
    posisi_awal_diterima: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email_internal: {
      type: Sequelize.STRING,
      allowNull: true
    },
    no_npwp: {
      type: Sequelize.STRING,
      allowNull: true
    },
    no_bpjs_kesehatan: {
      type: Sequelize.STRING,
      allowNull: true
    },
    no_bpjs_ketenagakerjaan: {
      type: Sequelize.STRING,
      allowNull: true
    },
    nama_bank: {
      type: Sequelize.STRING,
      allowNull: true
    },
    rekening: {
      type: Sequelize.STRING,
      allowNull: true
    },
    ukuran_baju: {
      type: Sequelize.ENUM('S', 'M', 'L', 'XL', 'XXL', 'XXXL'),
      allowNull: true
    },
    pengalaman_kerja_terakhir: {
      type: Sequelize.STRING,
      allowNull: true
    },
    jabatan_kerja_terakhir: {
      type: Sequelize.STRING,
      allowNull: true
    },
    foto: {
      type: Sequelize.STRING,
      allowNull: true
    },
    status_Karyawan: {
      type: Sequelize.ENUM('Aktif', 'Resign', 'PHK'),
      defaultValue: 'Aktif',
      allowNull: true
    },
    created_id: {
      type: Sequelize.SMALLINT,
      allowNull: true
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Karyawan',
  });
  return Karyawan;
};