// ! SPETIE_494 Express.js
const model = require('../models')

module.exports = function (permissions) {
  return async function (req, res, next) {
    const user = await model.User.findByPk(req.user.id, {
      include: {
        model: model.Role,
        include: model.Permission
      }
    })

    if (!user) {
      return res.status(403).json({ message: 'User not found' })
    }

    const hasPermission = user.Roles.some(role =>
      role.Permissions.some(permission => permissions.includes(permission.name))
    )

    if (!hasPermission) {
      return res
        .status(403)
        .json({ message: 'Access denied: insufficient permission' })
    }

    next()
  }
}
