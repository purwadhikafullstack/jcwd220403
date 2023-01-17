const router = require('express').Router()

const {pagesControllers} = require("../controllers")

router.get('/api/landingpage', pagesControllers.landingPage);
router.get('/api/detail/property/:id', pagesControllers.getById);

module.exports = router;