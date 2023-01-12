const express = require('express');
const router = express.Router();
const registerAsTenantController = require('../controllers/registerAsTenantController');

router.post(
  '/api/registerAsTenant',
  registerAsTenantController.RegisterAsTenant
);

router.get('/api/testRegTenant', registerAsTenantController.test);

module.exports = router;
