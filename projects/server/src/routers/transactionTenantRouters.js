const router = require('express').Router()

const {tenantTransaction} = require("../controllers")

router.get('/api/transactions/tenant/:tenantId/total', tenantTransaction.getTotalTransaction);
router.get('/api/transactions/tenant/:tenantId/:status', tenantTransaction.transactionsUser);


router.post('/api/transactions/accept', tenantTransaction.acceptTransaction);
router.post('/api/transactions/reject', tenantTransaction.rejectTransaction);

module.exports = router;