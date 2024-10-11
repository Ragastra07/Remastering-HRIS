const model = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
module.exports = {
	// Register a new user to the system.
  async register(req, res) {
    try {
      const { name, username, email, password } = req.body;

      // * Validate input data (add your validation logic here)

      // * Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // Adjust the salt rounds as needed

      // * Create the user
      const user = await model.User.create({
        name,
        username,
        email,
        password: hashedPassword,
      });

      res
        .status(201)
        .json({ message: "User registered successfully", user});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
	// Login an existing user to the system.
	async login(req, res) {
    try {
      const { username, password } = req.body;

      // * Find the user by username
      const user = await model.User.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // * Compare the entered password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // * Generate a JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn : `1h`});


      res.status(200).json({ message: 'Login successful', user, token});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
};
