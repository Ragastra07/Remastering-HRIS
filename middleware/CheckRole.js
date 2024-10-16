const model = require('../models')

module.exports = function (roles) {
  return async function (req, res, next) {
    const user = await model.User.findByPk(req.user.id, {
      include: model.Role
    })

    if (!user) {
      return res.status(403).json({ message: 'User not found' })
    }

    const hasRole = user.Roles.some(role => roles.includes(role.name))
    if (!hasRole) {
      return res
        .status(403)
        .json({ message: 'Access denied: insufficient role' })
    }

    next()
  }
}
