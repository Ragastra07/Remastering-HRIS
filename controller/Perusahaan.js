const model = require('../models/index')
const { Op } = require('sequelize');
module.exports = {
    // Method to retrieve positions (GET /positions)
    async index (req, res) {
        try {
            const search = req.query.search || '';
    
            // Fetch positions with search filter
            const positions = await model.MasterPosisi.findAll({
                where: {
                    nama_posisi: {
                        [Op.like]: `%${search}%`
                    }
                },
                order: [['createdAt', 'DESC']],
                limit: 10 // You can also implement pagination here
            });
    
            // Return data as JSON
            res.status(200).json({
                status: 'success',
                data: positions
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    },
    
    // Method to store a new position (POST /positions)
    async store (req, res) {
        try {
            const { nama_posisi, status } = req.body;
    
            // Validate input
            if (!nama_posisi || !status) {
                return res.status(400).json({ status: 'error', message: 'Position name and status are required' });
            }
    
            // Create new position
            const newPosition = await model.MasterPosisi.create({
                nama_posisi,
                status,
                created_id: req.user.id // Assuming user authentication middleware has set req.user
            });
    
            // Return success response
            res.status(201).json({ status: 'success', data: newPosition });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    },
    
    // Method to update a position (PUT /positions/:id)
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nama_posisi, status } = req.body;
    
            // Validate input
            if (!nama_posisi || !status) {
                return res.status(400).json({ status: 'error', message: 'Position name and status are required' });
            }
    
            // Find position by ID
            const position = await MasterPosisi.findByPk(id);
            if (!position) {
                return res.status(404).json({ status: 'error', message: 'Position not found' });
            }
    
            // Update position
            position.nama_posisi = nama_posisi;
            position.status = status;
            await position.save();
    
            // Return success response
            res.status(200).json({ status: 'success', data: position });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    },

};