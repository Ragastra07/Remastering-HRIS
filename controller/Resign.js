const { KaryawanResign, Karyawan } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    // Function to list resigned employees
    index: async (req, res) => {
        const search = req.query.search || '';
        
        try {
            // Query to get the resignation records with employee details
            let karyawan_resign = await KaryawanResign.findAll({
                include: [{
                    model: Karyawan,
                    as: 'karyawan',
                    attributes: ['nama_lengkap', 'nik_karyawan'],
                }],
                order: [['karyawan', 'nik_karyawan', 'ASC']]
            });

            // Apply search filter if provided
            if (search) {
                karyawan_resign = karyawan_resign.filter(record => record.karyawan.nama_lengkap.toLowerCase().includes(search.toLowerCase()));
            }

            // Paginate results
            const page = req.query.page || 1;
            const limit = 10;
            const offset = (page - 1) * limit;
            const paginatedResults = karyawan_resign.slice(offset, offset + limit);

            // Get all active employees (not resigned)
            const employees = await Karyawan.findAll({
                where: { status_karyawan: 0 }
            });

            // Render the view with results
            res.render('Apps/Resign/Index', {
                karyawan_resign: paginatedResults,
                employees,
                all_employees: await Karyawan.findAll()  // For editing
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    // Function to store a new resignation record
    store: async (req, res) => {

        const { karyawan_id, alasan_resign, tanggal_resign } = req.body;

        try {
            // Create new resignation record
            const newRecord = await KaryawanResign.create({
                karyawan_id,
                alasan_resign,
                tanggal_resign,
                created_id: req.user.id  // Assuming req.user holds authenticated user info
            });

            // If successfully created, update employee status to "resigned" (status = 1)
            const employee = await Karyawan.findByPk(karyawan_id);
            employee.status_karyawan = 1;
            await employee.save();

            // Redirect to the resignation index page
            res.redirect('/apps/resign/index');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    // Function to update an existing resignation record
    update: async (req, res) => {

        const { karyawan_id, alasan_resign, tanggal_resign } = req.body;
        const { id } = req.params;

        try {
            // Find the existing resignation record
            const resignRecord = await KaryawanResign.findByPk(id);

            if (!resignRecord) {
                return res.status(404).json({ msg: 'Resignation record not found' });
            }

            // Update the record
            resignRecord.karyawan_id = karyawan_id;
            resignRecord.alasan_resign = alasan_resign;
            resignRecord.tanggal_resign = tanggal_resign;

            await resignRecord.save();

            // Redirect to the resignation index page
            res.redirect('/apps/resign/index');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    // Function to soft delete a resignation record
    delete: async (req, res) => {
        const { id } = req.params;

        try {
            // Find the resignation record
            const resignRecord = await KaryawanResign.findByPk(id);

            if (!resignRecord) {
                return res.status(404).json({ msg: 'Resignation record not found' });
            }

            // Soft delete by setting deleted_status to 1
            resignRecord.deleted_status = 1;
            await resignRecord.save();

            const msg = 'Data deletion successful';
            res.redirect('back').with('msg', msg);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
};