const database = require('../models');
const user = database.user;

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(204);
  const refreshToken = cookies.refreshToken;

  const foundUser = await user.findOne({
    where: {
      refreshToken: refreshToken,
    },
    raw: true,
  });
  if (!foundUser) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
    return res.sendStatus(204);
  }

  await user.update(
    { refreshToken: '' },
    {
      where: {
        refreshToken: refreshToken,
      },
      raw: true,
    }
  );
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'None',
    secure: 'true',
  });
  res.sendStatus(204);
};

module.exports = { handleLogout };
