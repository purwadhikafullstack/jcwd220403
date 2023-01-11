const authRouters = require('./authRouters');
const userRouters = require('./userRouters');
const refresh = require('./refresh');
const logout = require('./logout');

module.exports = {
  authRouters,
  userRouters,
  refresh,
  logout,
};
