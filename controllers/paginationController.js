const Billing=require("../model/billingModel")

module.exports.billingPageCount = async (req, res, next) => {
    try {
        const count = await Billing.find({}).count();
        res.send({count})
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Couldn't get the billing data",
            error: error.message
        })
    }
}