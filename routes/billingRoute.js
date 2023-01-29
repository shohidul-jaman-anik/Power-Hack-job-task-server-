const express = require("express");
const billingController = require("../controllers/billingController");
const router = express.Router();


// router.post('/add-billing', billingController.addBill)
// router.get('/billing-list', billingController.deleteBilling)
// router.patch('/', updateBilling)
// router.delete('/', deleteBilling)

router.route('/')
    .post(billingController.addBill)
    .get(billingController.getBilling)

router.route('/:id')
    .patch(billingController.updateBilling)
    .delete(billingController.deleteBilling)

module.exports = router;

