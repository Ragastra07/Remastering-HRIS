const model = require('../models/index');
const { Op } = require('sequelize');

module.exports = {
    // Method to retrieve divisions (GET /divisi)
    async index(req, res) {
        try {
            const search = req.query.search || '';

            // Fetch divisions with search filter
            const divisions = await model.MasterDivisi.findAll({
                where: {
                    nama_divisi: {
                        [Op.like]: `%${search}%`
                    }
                },
                order: [['createdAt', 'DESC']],
                limit: 10 // You can also implement pagination here
            });

            // Return data as JSON
            res.status(200).json({
                status: 'success',
                data: divisions
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    },

    // Method to store a new division (POST /divisi)
    async store(req, res) {
        try {
            const { nama_divisi, status } = req.body;

            // Validate input
            if (!nama_divisi || !status) {
                return res.status(400).json({ status: 'error', message: 'Division name and status are required' });
            }

            // Create new division
            const newDivision = await model.MasterDivisi.create({
                nama_divisi,
                status,
                created_id: req.user.id // Assuming user authentication middleware has set req.user
            });

            // Return success response
            res.status(201).json({ status: 'success', data: newDivision });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    },

    // Method to update a division (PUT /divisi/:id)
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nama_divisi, status } = req.body;

            // Validate input
            if (!nama_divisi || !status) {
                return res.status(400).json({ status: 'error', message: 'Division name and status are required' });
            }

            // Find division by ID
            const division = await model.MasterDivisi.findByPk(id);
            if (!division) {
                return res.status(404).json({ status: 'error', message: 'Division not found' });
            }

            // Update division
            division.nama_divisi = nama_divisi;
            division.status = status;
            await division.save();

            // Return success response
            res.status(200).json({ status: 'success', data: division });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    }
};
