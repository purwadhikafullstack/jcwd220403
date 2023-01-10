const userRouters = require('./userRouters');
const tenantRouters = require("./tenantRouters")
const refresh = require('./refresh');
const logout = require('./logout');
const authRouters = require('./authRouters');

module.exports = {
  userRouters,
  tenantRouters,
  refresh,
  logout,
  authRouters
};
