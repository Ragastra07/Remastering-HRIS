const { CatatanPelanggaran, Karyawan } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    // Function to list violations for a specific employee
    index: async (req, res) => {
        const { id } = req.params;
        const search = req.query.search || '';

        try {
            // Fetch the list of violations with employee details
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

            // Fetch the employee's full name
            const karyawan = await Karyawan.findByPk(id);
            const employee_name = karyawan ? karyawan.nama_lengkap : '';

            res.render('Apps/Employee/ViolationRecord', {
                employee_id: id,
                lists,
                name: employee_name
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
            // Fetch all violations with employee details
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

            // Fetch all active employees
            const employees = await Karyawan.findAll({
                where: { status_karyawan: 0 }
            });

            res.render('Apps/Violation/Index', {
                lists,
                employees
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    // Function to store new violation records
    store: async (req, res) => {
        const { employee_id, date, note, level, status } = req.body;

        try {
            // Validate input
            if (!employee_id || !date || !note || !level || !status) {
                return res.status(400).send('All fields are required.');
            }

            // Create a new violation record
            const data = {
                employee_id,
                date,
                note,
                level,
                status,
                created_by: req.user.id // Assuming req.user contains authenticated user information
            };

            await CatatanPelanggaran.create(data);

            res.redirect('/apps/violation/indexAll');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    // Function to update existing violation records
    update: async (req, res) => {
        const { id } = req.params;
        const { employee_id, date, note, level, status } = req.body;

        try {
            // Validate input
            if (!employee_id || !date || !note || !level || !status) {
                return res.status(400).send('All fields are required.');
            }

            // Find and update the violation record
            const violation = await CatatanPelanggaran.findByPk(id);

            if (!violation) {
                return res.status(404).send('Violation not found');
            }

            const updatedData = {
                employee_id,
                date,
                note,
                level,
                status
            };

            await violation.update(updatedData);

            res.redirect('/apps/violation/indexAll');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    // Function to soft delete a violation record
    delete: async (req, res) => {
        const { id } = req.params;

        try {
            // Find the violation record
            const violation = await CatatanPelanggaran.findByPk(id);

            if (!violation) {
                return res.status(404).send('Violation not found');
            }

            violation.deleted_status = 1;

            await violation.save();

            const msg = 'Data deletion successful';
            res.redirect('back').with('msg', msg);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
};
