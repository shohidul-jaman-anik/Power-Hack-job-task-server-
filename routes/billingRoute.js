const express = require("express");
const billingController = require("../controllers/billingController");
const router = express.Router();
const checkLogin = require("../middlewares/checkLogin")

// router.use(checkLogin)

router.post('/add-billing', billingController.addBill)
router.get('/billing-list', billingController.getBilling)
router.patch('/update-billing/:id', billingController.updateBilling)
router.delete('/delete-billing/:id', billingController.deleteBilling)

// router.route('/')
//     .post(billingController.addBill)
//     .get(billingController.getBilling)

// router.route('/:id')
//     .patch(billingController.updateBilling)
//     .delete(billingController.deleteBilling)

module.exports = router;

