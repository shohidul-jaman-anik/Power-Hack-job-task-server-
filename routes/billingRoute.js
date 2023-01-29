const express = require("express");
const billingController = require("../controllers/billingController");
const router = express.Router();
const checkLogin = require("../middlewares/checkLogin")

// router.post('/add-billing', billingController.addBill)
// router.get('/billing-list', billingController.deleteBilling)
// router.patch('/', updateBilling)
// router.delete('/', deleteBilling)

router.route('/',checkLogin)
    .post(billingController.addBill)
    .get(billingController.getBilling)

router.route('/:id')
    .patch(billingController.updateBilling)
    .delete(billingController.deleteBilling)

module.exports = router;

