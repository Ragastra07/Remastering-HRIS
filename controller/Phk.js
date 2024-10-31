const { KaryawanPHK, Karyawan } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  // Function to list employees who have been laid off
  index: async (req, res) => {
    const search = req.query.search || "";

    try {
      // Query to get the layoff records with employee details
      let karyawan_phk = await KaryawanPHK.findAll({
        include: [
          {
            model: Karyawan,
            as: "karyawan",
            attributes: ["nama_lengkap", "nik_karyawan"],
          },
        ],
        order: [["karyawan", "nik_karyawan", "ASC"]],
      });

      // Apply search filter if provided
      if (search) {
        karyawan_phk = karyawan_phk.filter((record) =>
          record.karyawan.nama_lengkap
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      }

      // Paginate results
      const page = req.query.page || 1;
      const limit = 10;
      const offset = (page - 1) * limit;
      const paginatedResults = karyawan_phk.slice(offset, offset + limit);

      // Get all active employees
      const employees = await Karyawan.findAll({
        where: { status_karyawan: 0 },
      });

      // Render the view with results
      res.render("Apps/PHK/Index", {
        karyawan_phk: paginatedResults,
        employees,
        all_employees: await Karyawan.findAll(), // For editing
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },

  // Function to store a new layoff record
  store: async (req, res) => {
    const { karyawan_id, penyebab_phk, tanggal_phk } = req.body;

    try {
      // Create new layoff record
      const newRecord = await KaryawanPHK.create({
        karyawan_id,
        penyebab_phk,
        tanggal_phk,
        created_id: req.user.id, // Assuming req.user holds authenticated user info
      });

      // If successfully created, update employee status to "laid off" (status = 2)
      const employee = await Karyawan.findByPk(karyawan_id);
      employee.status_karyawan = 2;
      await employee.save();

      // Redirect to the layoff index page
      res.redirect("/apps/phk/index");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },

  // Function to update an existing layoff record
  update: async (req, res) => {
    const { karyawan_id, penyebab_phk, tanggal_phk } = req.body;
    const { id } = req.params;

    try {
      // Find the existing layoff record
      const layoffRecord = await KaryawanPHK.findByPk(id);

      if (!layoffRecord) {
        return res.status(404).json({ msg: "Layoff record not found" });
      }

      // Update the record
      layoffRecord.karyawan_id = karyawan_id;
      layoffRecord.penyebab_phk = penyebab_phk;
      layoffRecord.tanggal_phk = tanggal_phk;

      await layoffRecord.save();

      // Redirect to the layoff index page
      res.redirect("/apps/phk/index");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },

  // Function to soft delete a layoff record
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      // Find the layoff record
      const layoffRecord = await KaryawanPHK.findByPk(id);

      if (!layoffRecord) {
        return res.status(404).json({ msg: "Layoff record not found" });
      }

      // Soft delete by setting deleted_status to 1
      layoffRecord.deleted_status = 1;
      await layoffRecord.save();

      const msg = "Data deletion successful";
      res.redirect("back").with("msg", msg);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },
};
