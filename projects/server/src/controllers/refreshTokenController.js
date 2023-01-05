require('dotenv').config();
const database = require('../models');
const jwt = require('jsonwebtoken');

const userLogin = database.login;

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) return res.sendStatus(401);

  const refreshToken = cookies.refreshToken;

  const foundUser = await userLogin.findOne({
    where: {
      refreshToken: refreshToken,
    },
  });
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      async (err, decoded) => {
        if (err) return res.sendStatus(403);
        //hacked user
        await userLogin.update(
          { refreshToken: null },
          {
            where: {
              email: decoded.email,
            },
          }
        );
      }
    );
    return res.sendStatus(403);
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    (err, decoded) => {
      if (err || foundUser.userId !== decoded.userId)
        return res.sendStatus(403);

      const accessToken = jwt.sign(
        { email: decoded.email, userId: jwt.decode.userId },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '30s' }
      );
      res.json({ accessToken });
    }
  );
};

module.exports = { handleRefreshToken };
