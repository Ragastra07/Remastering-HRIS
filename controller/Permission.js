const model = require('../models/index')
const { Op } = require('sequelize');
module.exports = {
  // List permissions with search and pagination
  async index (req, res) {
    try {
			// * take the search value and pagination parameters from query params HTTP request
      const { search = '', page = 1, limit = 10 } = req.query
			// * calculate the offset for pagination, based on the current page and limit
      const offset = (page - 1) * limit

      // Search and paginate permissions
			// * use Sequelize's findAndCountAll method to fetch permissions with pagination and search functionality
      // * findAndCountAll returns an object with an array of records (rows) and the total count (count) of records that matched the query conditions.
      const { rows: permissions, count: total } =
        await model.Permission.findAndCountAll({
          where: {
            name: {
							// ? Sequelize's LIKE operator is used to perform a case-insensitive search.
              [Op.like]: `%${search}%`
            }
          },
          order: [['createdAt', 'DESC']],
          limit: parseInt(limit),
          offset: parseInt(offset)
        })
			// * calculate the total number of pages based on the total count and the limit
			// ? take the result of calculating the total number of pages and rounding the result
      const totalPages = Math.ceil(total / limit)

      // * Return paginated permissions and metadata
      return res.status(200).json({
        data: permissions,
        meta: {
          total,
          totalPages,
          currentPage: parseInt(page),
          perPage: parseInt(limit)
        }
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },

  // Create a new permission
  async store (req, res) {
    try {
      const { name } = req.body

      // * Validation: ensure name is provided
      if (!name) {
        return res.status(400).json({ error: 'Permission name is required' })
      }

      // * Create the permission
      const permission = await model.Permission.create({ name })

      // Return the newly created permission
      return res.status(201).json(permission)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },

  // Update an existing permission
  async update (req, res) {
    try {
      const { id } = req.params
      const { name } = req.body

      // * Validation: ensure name is provided
      if (!name) {
        return res.status(400).json({ error: 'Permission name is required' })
      }

      // * Find the permission by ID
      const permission = await model.Permission.findByPk(id)
      if (!permission) {
        return res.status(404).json({ error: 'Permission not found' })
      }

      // * Update the permission name
      await permission.update({ name })

      //*  Return the updated permission
      return res.status(200).json(permission)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}
