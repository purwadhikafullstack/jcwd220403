const authControllers = require("./authControllers");
const userControllers = require("./userControllers");
const tenantControllers = require("./tenantControllers");
const refreshTokenController = require("./refreshTokenController");
const logoutController = require("./logoutController");

module.exports = {
  authControllers,
  userControllers,
  tenantControllers,
  refreshTokenController,
  logoutController,
};