// ! SPETIE_494 Express.js
const model = require('../models/index')
const { Op } = require('sequelize');
module.exports = {
  // List roles with pagination and search functionality
  async index (req, res) {
    try {
			// * take the value from query params HTTP request
      const { q } = req.query
			// * use Sequelize's findAll method to fetch roles with pagination and search functionality
      const roles = await model.Role.findAll({
        where: q ? { name: { [Op.like]: `%${q}%` } } : {},
        include: [Permission],
        limit: 5,
        order: [['createdAt', 'DESC']]
      })
      return res.status(200).json(roles)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },

  // Create a new role with permissions
  async store (req, res) {
    try {
			// * take the values from the request body HTTP request
      const { name, permissions } = req.body
			// * use Sequelize's create method to create a new role with permissions
      const role = await model.Role.create({ name })
			// * if permissions are provided, find them by their IDs and associate them with the role
      if (permissions) {
        const permissionRecords = await model.Permission.findAll({
          where: { id: permissions }
        })
        await role.addPermissions(permissionRecords)
      }
      return res.status(201).json(role)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },

  // Edit an existing role
  async update (req, res) {
    try {
      const { id } = req.params
      const { name, permissions } = req.body
			// * find the role by its ID and update its name and permissions if provided
      const role = await model.Role.findByPk(id)
			// * if the role is not found, return a 404 error message
      if (!role) {
        return res.status(404).json({ error: 'Role not found' })
      }
			// * update the role's name and permissions if provided and save it to the database
      await role.update({ name })
      if (permissions) {
        const permissionRecords = await model.Permission.findAll({
          where: { id: permissions }
        })
        await role.setPermissions(permissionRecords)
      }
      return res.status(200).json(role)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },

  // Delete a role
  async destroy (req, res) {
    try {
      const { id } = req.params
      const role = await model.Role.findByPk(id)
      if (!role) {
        return res.status(404).json({ error: 'Role not found' })
      }
      await role.destroy()
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}
