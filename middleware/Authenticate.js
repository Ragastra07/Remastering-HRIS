const jwt = require('jsonwebtoken')

//Middleware
function authenticateToken (req, res, next) {

	// * extract authorization header from request headers for a JWT
  const authHeader = req.headers['authorization']

	// * check if the authorization header exists and if it contains a JWT token
  const token = authHeader && authHeader.split('  ')[1]

	// * if the token is null, send a 401 status (unauthorized) and end the request
  if (token == null) return res.sendStatus(401) // unauthorized

	// * if the token is valid, verify it using the JWT secret
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		// * if the verification fails, send a 403 status (forbidden) and end the request
    if (err) return res.sendStatus(403) // forbidden
		// * if the verification succeeds, assign the verified user to the request object for further processing
    req.user = user
    next()
  })
}

module.exports = authenticateToken
