const model = require("../models/index");
const bcrypt = require("bcrypt");
module.exports = {
  async register(req, res) {
    try {
      const { name, username, email, password } = req.body;

      // Validate input data (add your validation logic here)

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // Adjust the salt rounds as needed

      // Create the user
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
};
