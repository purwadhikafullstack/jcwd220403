const authRouters = require('./authRouters');
const userRouters = require('./userRouters');
const refresh = require('./refresh');
const logout = require('./logout');
const RegisterAsTenant = require('./registerAsTenantRouter');

module.exports = {
  authRouters,
  userRouters,
  refresh,
  logout,
  RegisterAsTenant,
};
