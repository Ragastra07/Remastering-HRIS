const { CatatanPelanggaran, Karyawan } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    // Function to list violations for a specific employee
    index: async (req, res) => {
        const { id } = req.params;
        const search = req.query.search || '';

        try {
            // Get the list of violations with employee details
            const lists = await CatatanPelanggaran.findAll({
                include: [{
                    model: Karyawan,
                    as: 'karyawan',
                    where: {
                        catatan: {
                            [Op.like]: `%${search}%`
                        }
                    }
                }],
                where: {
                    karyawan_id: id
                },
                order: [['createdAt', 'DESC']],
                limit: 10
            });

            // Get the employee's full name
            const karyawan = await Karyawan.findByPk(id);
            const nama_karyawan = karyawan ? karyawan.nama_lengkap : '';

            res.render('Apps/Karyawan/CatatanPelanggaran', {
                id_karyawan: id,
                lists,
                nama: nama_karyawan
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    // Function to list all violations
    indexAll: async (req, res) => {
        const search = req.query.search || '';

        try {
            // Get the list of violations with employee details
            const lists = await CatatanPelanggaran.findAll({
                include: [{
                    model: Karyawan,
                    as: 'karyawan',
                    where: {
                        catatan: {
                            [Op.like]: `%${search}%`
                        }
                    }
                }],
                order: [
                    ['status', 'ASC'],
                    ['tanggal', 'DESC']
                ],
                limit: 10
            });

            // Get all active employees
            const karyawan = await Karyawan.findAll({
                where: { status_karyawan: 0 }
            });

            res.render('Apps/Pelanggaran/Index', {
                lists,
                karyawan
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    // Function to store new violations
    store: async (req, res) => {
        const { karyawan_id, tanggal, catatan, tingkatan, status } = req.body;

        try {
            // Validate input
            if (!karyawan_id || !tanggal || !catatan || !tingkatan || !status) {
                return res.status(400).send('All fields are required.');
            }

            // Create new violation record
            const data = {
                karyawan_id,
                tanggal,
                catatan,
                tingkatan,
                status,
                created_id: req.user.id // Assuming req.user contains authenticated user info
            };

            await CatatanPelanggaran.create(data);

            res.redirect('/apps/pelanggaran/indexAll');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    // Function to update existing violations
    update: async (req, res) => {
        const { id } = req.params;
        const { karyawan_id, tanggal, catatan, tingkatan, status } = req.body;

        try {
            // Validate input
            if (!karyawan_id || !tanggal || !catatan || !tingkatan || !status) {
                return res.status(400).send('All fields are required.');
            }

            // Find and update the violation record
            const pelanggaran = await CatatanPelanggaran.findByPk(id);

            if (!pelanggaran) {
                return res.status(404).send('Pelanggaran not found');
            }

            const updatedData = {
                karyawan_id,
                tanggal,
                catatan,
                tingkatan,
                status
            };

            await pelanggaran.update(updatedData);

            res.redirect('/apps/pelanggaran/indexAll');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    // Function to soft delete a violation
    delete: async (req, res) => {
        const { id } = req.params;

        try {
            // Find the violation record
            const pelanggaran = await CatatanPelanggaran.findByPk(id);

            if (!pelanggaran) {
                return res.status(404).send('Pelanggaran not found');
            }

            pelanggaran.deleted_status = 1;

            await pelanggaran.save();

            const msg = 'Hapus Data Berhasil';
            res.redirect('back').with('msg', msg);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
};