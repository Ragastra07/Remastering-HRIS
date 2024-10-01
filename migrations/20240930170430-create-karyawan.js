'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('karyawans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        type: Sequelize.TINYINT,
        comments: 'islam'
      },
      jenis_kelamin: {
        type: Sequelize.TINYINT,
        comment: '1 = Laki-laki, 2 = Perempuan',
        allowNull: true,
      },
      gol_darah: {
        type: Sequelize.TINYINT,
        comment: '1 = A, 2 = B, 3 = O, 4 = AB',
        allowNull: true,
      },
      riwayat_penyakit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_kk: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kode_pos: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nik_penduduk: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      alamat_ktp: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      alamat_domisili: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      pendidikan: {
        type: Sequelize.TINYINT,
        comment: '1 = SD, 2 = SMP, 3 = SMA, 4 = D1, 5 = D2, 6 = D3, 7 = D4, 8 = S1, 9 = S2, 10 = S3',
        allowNull: true,
      },
      nama_sekolah: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      jurusan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email_pribadi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_telp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_wa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_keluarga: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hubungan_keluarga: {
        type: Sequelize.TINYINT,
        comment: '1 = Suami/Istri 2 = Ayah, 3 = Ibu, 4 = Kakak/Adik, 5 = Paman/Bibi, 6 = Kakek/Nenek',
        allowNull: true,
      },
      status_pernikahan: {
        type: Sequelize.TINYINT,
        comment: '1 = Belum Menikah, 2 = Sudah Menikah, 3 = Janda, 4 = Duda',
        allowNull: true,
      },
      status_keluarga: {
        type: Sequelize.TINYINT,
        comment: '1 = Kepala Keluarga, 2 = Ibu, 3 = Anak ke 1, 4 = Anak ke 2, 5 = Anak ke 3, 6 = Lainya',
        allowNull: true,
      },
      jenis_sosmed: {
        type: Sequelize.TINYINT,
        comment: '1 = IG, 2 = FB, 3 = TikTok, 4 = YouTube, 5 = Twitter',
        allowNull: true,
      },
      nama_sosmed: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // Data di perusahaan
      nik_karyawan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      divisi_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      pt_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      jabatan_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      posisi_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      grade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tanggal_masuk: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status_kerja: {
        type: Sequelize.TINYINT,
        comment: '1 = Kontrak, 2 = Tetap, 3 = Training',
        allowNull: true,
      },
      komposisi_peran: {
        type: Sequelize.TINYINT,
        comment: '1 = Support, 2 = Core',
        allowNull: true,
      },
      komposisi_generasi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tanggal_kontrak: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      tanggal_karyawan_tetap: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      akhir_kontrak: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      masa_kontrak: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      masa_kerja_bulan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      masa_kerja_tahun: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kota_rekruitmen: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kota_penugasan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      posisi_awal_diterima: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email_internal: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_npwp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_bpjs_kesehatan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_bpjs_ketenagakerjaan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nama_bank: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rekening: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ukuran_baju: {
        type: Sequelize.TINYINT,
        comment: '1 = S, 2 = M, 3 = L, 4 = XL, 5 = XXL, 6 = Jumbo',
        allowNull: true,
      },
      pengalaman_kerja_terakhir: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      jabatan_kerja_terakhir: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status_karyawan: {
        type: Sequelize.TINYINT,
        comment: '0 = Aktif, 1 = Resign, 2 = PHK',
        defaultValue: 0,
        allowNull: true,
      },
      created_id: {
        type: Sequelize.TINYINT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('karyawans');
  }
};