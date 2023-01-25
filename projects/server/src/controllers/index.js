const authControllers = require('./auth/authControllers');
const userControllers = require('./userControllers');
const tenantControllers = require('./tenantControllers');
const refreshTokenController = require('./auth/refreshTokenController');
const logoutController = require('./auth/logoutController');
const RegisterAsTenant = require('./registerAsTenantController');
const tenantTransaction = require('./transactionTenantControllers');
const pagesControllers = require('./pagesControllers');
const roomControllers = require('./roomsControllers');
const paymentContoller = require('./transaction/paymentController');
const transactionControllers = require('./transaction/transactionControllers');
const privateTransactionControllers = require('./transaction/privateTransactionControllers');
const registerAsTenantController = require('./registerAsTenantController');
const propertyControllers = require('./property/propertyControllers');

module.exports = {
  authControllers,
  userControllers,
  tenantControllers,
  refreshTokenController,
  logoutController,
  RegisterAsTenant,
  pagesControllers,
  roomControllers,
  tenantTransaction,
  paymentContoller,
  transactionControllers,
  privateTransactionControllers,
  registerAsTenantController,
  propertyControllers,
};
