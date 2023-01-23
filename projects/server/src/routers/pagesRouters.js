const router = require('express').Router()

const {pagesControllers, tenantControllers} = require("../controllers")

router.post('/api/landingpage', pagesControllers.landingPage);
router.post('/api/detail/property/:id', pagesControllers.getById);
router.get('/api/category', tenantControllers.getAllCategory)

module.exports = router;