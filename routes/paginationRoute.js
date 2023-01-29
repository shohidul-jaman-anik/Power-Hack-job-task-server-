const express = require("express");
const router = express.Router();
const pagination=require("../controllers/paginationController")

router.route('/')
    .get(pagination.billingPageCount)

module.exports=router;