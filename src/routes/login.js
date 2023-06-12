const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          const message = "Username does not exist.";
          return res.status(404).json({ message });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then(isPasswordValid => {
            if (!isPasswordValid) {
              const message = `Incorrect password.`;
              return res.status(401).json({ message });
            }

            // JWT
            const token = jwt.sign(
              { userId: user.id }, 
              privateKey, 
              { expiresIn: "24h"}
            )

            const message = `User connected.`;
            return res.json({ message, data: user, token });
          });
      })
      .catch((err) => {
        const message = "User cannot connect. Try later.";
        return res.status(500).json({ message, data: err });
      });
  });
};
