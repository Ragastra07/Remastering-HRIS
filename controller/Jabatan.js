const model = require('../models/index');
const { Op } = require('sequelize');

module.exports = {
    // Method to retrieve positions (GET /jabatan)
    async index(req, res) {
        try {
            const search = req.query.search || '';

            // Fetch jabatan (positions) with search filter
            const jabatans = await model.MasterJabatan.findAll({
                where: {
                    nama_jabatan: {
                        [Op.like]: `%${search}%`
                    }
                },
                order: [['createdAt', 'DESC']],
                limit: 10 // Pagination logic could be added here
            });

            // Return data as JSON
            res.status(200).json({
                status: 'success',
                data: jabatans
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    },

    // Method to store a new jabatan (POST /jabatan)
    async store(req, res) {
        try {
            const { nama_jabatan, status } = req.body;

            // Validate input
            if (!nama_jabatan || !status) {
                return res.status(400).json({ status: 'error', message: 'Jabatan name and status are required' });
            }

            // Create new jabatan
            const newJabatan = await model.MasterJabatan.create({
                nama_jabatan,
                status,
                created_id: req.user.id // Assuming user authentication middleware has set req.user
            });

            // Return success response
            res.status(201).json({ status: 'success', data: newJabatan });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    },

    // Method to update a jabatan (PUT /jabatan/:id)
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nama_jabatan, status } = req.body;

            // Validate input
            if (!nama_jabatan || !status) {
                return res.status(400).json({ status: 'error', message: 'Jabatan name and status are required' });
            }

            // Find jabatan by ID
            const jabatan = await model.MasterJabatan.findByPk(id);
            if (!jabatan) {
                return res.status(404).json({ status: 'error', message: 'Jabatan not found' });
            }

            // Update jabatan
            jabatan.nama_jabatan = nama_jabatan;
            jabatan.status = status;
            await jabatan.save();

            // Return success response
            res.status(200).json({ status: 'success', data: jabatan });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    }
};
