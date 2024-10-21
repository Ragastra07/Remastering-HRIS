const {
  Karyawan,
  MasterDivisi,
  MasterPerusahaan,
  MasterJabatan,
  MasterPosisi
} = require('../models')
const { Op } = require('sequelize')
const { format, differenceInYears } = require('date-fns')

module.exports = {
  // Method to list all employees (karyawan)
  index: async (req, res) => {
    try {
      const search = req.query.search

      // Fetch employees based on search criteria
      const karyawan = await Karyawan.findAll({
        include: ['perusahaan', 'divisi', 'jabatan', 'posisi'],
        where: {
          status_karyawan: 0,
          [Op.or]: [
            { nama_lengkap: { [Op.like]: `%${search}%` } },
            { nik_karyawan: { [Op.like]: `%${search}%` } },
            { nik_penduduk: { [Op.like]: `%${search}%` } }
          ]
        },
        order: [
          ['nik_karyawan', 'ASC'],
          ['createdAt', 'DESC']
        ],
        limit: 20
      })

      // Fetch master data for divisi, perusahaan, jabatan, and posisi
      const divisi = await MasterDivisi.findAll({ where: { status: 1 } })
      const perusahaan = await MasterPerusahaan.findAll({
        where: { status: 1 }
      })
      const jabatan = await MasterJabatan.findAll({ where: { status: 1 } })
      const posisi = await MasterPosisi.findAll({ where: { status: 1 } })

      // Calculate age and working period
      if (karyawan.length) {
        for (const k of karyawan) {
          const now = new Date()
          const tanggal_lahir = k.tanggal_lahir

          if (!tanggal_lahir) {
            await k.update({ umur: 0, komposisi_generasi: null })
          } else {
            const tahun_lahir = format(new Date(tanggal_lahir), 'yyyy')
            const age = differenceInYears(now, new Date(tanggal_lahir))

            await k.update({ umur: age })

            // Update generation composition based on year of birth
            if (tahun_lahir >= 1946 && tahun_lahir <= 1964) {
              await k.update({ komposisi_generasi: 'Gen Boomers' })
            } else if (tahun_lahir >= 1965 && tahun_lahir <= 1980) {
              await k.update({ komposisi_generasi: 'Gen X' })
            } else if (tahun_lahir >= 1981 && tahun_lahir <= 1996) {
              await k.update({ komposisi_generasi: 'Gen Milenial' })
            } else if (tahun_lahir >= 1997 && tahun_lahir <= 2012) {
              await k.update({ komposisi_generasi: 'Gen Z' })
            } else if (tahun_lahir >= 2013) {
              await k.update({ komposisi_generasi: 'Gen Alpha' })
            }

            // Calculate contract end date and work duration if applicable
            if (k.status_kerja == 1) {
              const akhir_kontrak = format(
                new Date(
                  tanggal_kontrak.setMonth(
                    tanggal_kontrak.getMonth() + masa_kontrak
                  )
                ),
                'yyyy-MM-dd'
              )
              await k.update({ akhir_kontrak })
            } else if (k.status_kerja == 2) {
              const interval = differenceInYears(
                now,
                new Date(k.tanggal_kontrak)
              )
              await k.update({ masa_kerja_tahun: `${interval} tahun` })
            }
          }
        }
      }

      // Return JSON response
      return res.status(200).json({
        karyawan,
        divisi,
        perusahaan,
        jabatan,
        posisi
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Server Error', error })
    }
  },

  // Method to store a new employee
  store: async (req, res) => {
    try {
      const { nama_lengkap, nik_karyawan, tanggal_lahir, task_file } = req.body

      // Create a new employee
      const karyawan = await Karyawan.create({
        nama_lengkap: nama_lengkap.toUpperCase(),
        nik_karyawan,
        nik_penduduk,
        tanggal_lahir,
        status_kerja,
        tanggal_kontrak,
        masa_kontrak,
        divisi_id,
        perusahaan_id,
        jabatan_id,
        posisi_id,
        status_karyawan,
        created_id: req.user.id // Assuming you have user authentication
      })

      // Calculate age
      const now = new Date()
      const age = differenceInYears(now, new Date(tanggal_lahir))
      await karyawan.update({ umur: age })

      // Handle file upload
      if (task_file) {
        const fileName = `${karyawan.nik_karyawan}.${task_file.extension}`
        // Assuming file handling logic here
        // Example: await uploadFile(task_file, fileName);
        await karyawan.update({ foto: fileName })
      }

      return res
        .status(201)
        .json({ message: 'Karyawan created successfully', karyawan })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Error creating employee', error })
    }
  },

  // Method to update an employee
  update: async (req, res) => { 
    try {
      const { id } = req.params
      const { nama_lengkap, tanggal_lahir, task_file } = req.body

      const karyawan = await Karyawan.findByPk(id)

      if (!karyawan) {
        return res.status(404).json({ message: 'Karyawan not found' })
      }

      // Update employee details
      await karyawan.update({
        nama_lengkap: nama_lengkap.toUpperCase(),
        nik_karyawan,
        nik_penduduk,
        tanggal_lahir,
        status_kerja,
        tanggal_kontrak,
        masa_kontrak,
        divisi_id,
        perusahaan_id,
        jabatan_id,
        posisi_id,
        status_karyawan
      })

      // Handle file upload
      if (task_file) {
        const fileName = `${karyawan.nik_karyawan}.${task_file.extension}`
        // Assuming file handling logic here
        // Example: await uploadFile(task_file, fileName);
        await karyawan.update({ foto: fileName })
      }

      return res
        .status(200)
        .json({ message: 'Karyawan updated successfully', karyawan })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Error updating employee', error })
    }
  }
}
