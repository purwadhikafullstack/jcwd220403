const router = require('express').Router()

const {pagesControllers, tenantControllers} = require("../controllers")

router.post('/api/landingpage', pagesControllers.landingPage);
router.get('/api/detail/property/:id', pagesControllers.getById);
router.get('/api/category', tenantControllers.getAllCategory)
router.get('/api/rooms', pagesControllers.getRoom)

module.exports = router;