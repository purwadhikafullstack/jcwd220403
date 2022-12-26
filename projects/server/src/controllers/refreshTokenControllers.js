require('dotenv').config();
const database = require('../models');
const jwt = require('jsonwebtoken');

const user = database.user;

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) return res.status(401);

  const refreshToken = cookies.refreshToken;

  const foundUser = await user.findOne({
    where: {
      refreshToken: refreshToken,
    },
    raw: true,
  });

  if (!foundUser) return res.status(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    (err, decoded) => {
      if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

      const accessToken = jwt.sign(
        { email: decoded.email },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '1h' }
      );
      res.json({ accessToken });
    }
  );
};

module.exports = { handleRefreshToken };
