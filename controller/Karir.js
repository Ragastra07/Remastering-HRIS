const model = require('../models/index');
const { Op } = require('sequelize');

const { RiwayatOrganisasi, Karyawan, MasterPerusahaan, MasterDivisi, MasterJabatan, MasterPosisi } = require('../models')
const { validationResult } = require('express-validator');

module.exports = {
    // Function to list organization history by employee ID
    index: async (req, res) => {
        const { id } = req.params;
        const search = req.query.search || '';

        try {
            // Fetch organization history with search and pagination
            const lists = await RiwayatOrganisasi.findAll({
                include: [
                    { model: MasterPerusahaan, as: 'perusahaan' },
                    { model: MasterJabatan, as: 'jabatan' },
                    { model: Karyawan, as: 'karyawan' },
                    { model: MasterDivisi, as: 'divisi' },
                    { model: MasterPosisi, as: 'posisi' }
                ],
                where: {
                    karyawan_id: id,
                    '$divisi.nama_divisi$': { [Op.like]: `%${search}%` }
                },
                order: [['createdAt', 'DESC']],
                limit: 10
            });

            // Get related data
            const employee = await Karyawan.findByPk(id);
            const perusahaan = await MasterPerusahaan.findAll({ where: { status: 1 } });
            const divisi = await MasterDivisi.findAll({ where: { status: 1 } });
            const jabatan = await MasterJabatan.findAll({ where: { status: 1 } });
            const posisi = await MasterPosisi.findAll({ where: { status: 1 } });

            res.render('Apps/Karyawan/ListOrganisasi', {
                id_karyawan: id,
                lists,
                nama: employee.nama_lengkap,
                pt: perusahaan,
                divisi,
                jabatan,
                posisi
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    // Function to list all organization history
    indexAll: async (req, res) => {
        const search = req.query.search || '';

        try {
            // Fetch all organization history with search and pagination
            const lists = await RiwayatOrganisasi.findAll({
                include: [
                    { model: MasterPerusahaan, as: 'perusahaan' },
                    { model: MasterJabatan, as: 'jabatan' },
                    { model: Karyawan, as: 'karyawan' },
                    { model: MasterDivisi, as: 'divisi' },
                    { model: MasterPosisi, as: 'posisi' }
                ],
                where: {
                    '$karyawan.nama_lengkap$': { [Op.like]: `%${search}%` }
                },
                order: [['tgl_masuk', 'DESC']],
                limit: 10
            });

            // Get related data
            const karyawan = await Karyawan.findAll({ where: { status_karyawan: 0 } });
            const perusahaan = await MasterPerusahaan.findAll({ where: { status: 1 } });
            const divisi = await MasterDivisi.findAll({ where: { status: 1 } });
            const jabatan = await MasterJabatan.findAll({ where: { status: 1 } });
            const posisi = await MasterPosisi.findAll({ where: { status: 1 } });

            res.render('Apps/Organisasi/Index', {
                lists,
                karyawan,
                perusahaan,
                divisi,
                jabatan,
                posisi
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    // Function to store new organization history
    store: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            karyawan_id,
            kategori_karir,
            pt_id,
            divisi_id,
            jabatan_id,
            posisi_id,
            tgl_masuk,
            tgl_berakhir
        } = req.body;

        try {
            // Create new organization history record
            await RiwayatOrganisasi.create({
                karyawan_id,
                kategori_karir,
                pt_id,
                divisi_id,
                jabatan_id,
                posisi_id,
                tgl_masuk,
                tgl_berakhir,
                created_id: req.user.id
            });

            res.redirect('/apps/organisasi/indexAll');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    // Function to update existing organization history
    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const {
            karyawan_id,
            kategori_karir,
            pt_id,
            divisi_id,
            jabatan_id,
            posisi_id,
            tgl_masuk,
            tgl_berakhir
        } = req.body;

        try {
            // Find and update organization history record
            const orgHistory = await RiwayatOrganisasi.findByPk(id);
            if (!orgHistory) {
                return res.status(404).json({ msg: 'Record not found' });
            }

            await orgHistory.update({
                karyawan_id,
                kategori_karir,
                pt_id,
                divisi_id,
                jabatan_id,
                posisi_id,
                tgl_masuk,
                tgl_berakhir
            });

            res.redirect('/apps/organisasi/indexAll');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
};
