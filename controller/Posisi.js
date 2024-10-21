
const model = require('../models/index')
const { Op } = require('sequelize');

module.exports = {
    async index (req, res){
        try {
            const search = req.query.search || '';
            const posisi = await model.MasterPosisi.findAll({
                where: {
                    nama_posisi: {
                        [Op.like]: `%${search}%`
                    }
                },
                order: [['createdAt', 'DESC']],
                limit: 10
            });
    
            res.status(200).json({
                status: 'success',
                data: posisi
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    },

    async store (req, res) {
        try {
            const { nama_posisi, status } = req.body;
    
            if (!nama_posisi || !status) {
                return res.status(400).json({ status: 'error', message: 'Nama posisi dan status diperlukan' });
            }
    

            const newPosisi = await model.MasterPosisi.create({
                nama_posisi: nama_posisi,
                status: status,
                created_id: req.user.id 
            });
    

            res.status(201).json({ status: 'success', data: newPosisi });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    },
    
    async update (req, res) {
        try {
            const { id } = req.params;
            const { nama_posisi, status } = req.body;
    

            if (!nama_posisi || !status) {
                return res.status(400).json({ status: 'error', message: 'Nama posisi dan status diperlukan' });
            }
    

            const posisi = await model.MasterPosisi.findByPk(id);
            if (!posisi) {
                return res.status(404).json({ status: 'error', message: 'Posisi tidak ditemukan' });
            }
    
            posisi.nama_posisi = nama_posisi;
            posisi.status = status;
            await posisi.save();
    
    
            res.status(200).json({ status: 'success', data: posisi });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    },
};