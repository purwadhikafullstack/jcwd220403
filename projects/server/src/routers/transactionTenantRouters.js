const router = require('express').Router()

const {tenantTransaction} = require("../controllers")

router.get('/api/transactions/tenant', tenantTransaction.transactionsUser);

module.exports = router;