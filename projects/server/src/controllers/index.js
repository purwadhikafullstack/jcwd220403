const authControllers = require('./authControllers');
const userControllers = require('./userControllers');
const tenantControllers = require('./tenantControllers');
const refreshTokenController = require('./refreshTokenController');
const logoutController = require('./logoutController');
const RegisterAsTenant = require('./registerAsTenantController');
const pagesControllers = require('./pagesControllers');
const roomControllers = require('./roomsControllers');
const bookingController = require('./booking/bookingController');
const paymentContoller = require('./booking/paymentController');

module.exports = {
  authControllers,
  userControllers,
  tenantControllers,
  refreshTokenController,
  logoutController,
  RegisterAsTenant,
  pagesControllers,
  roomControllers,
  bookingController,
  paymentContoller,
};
