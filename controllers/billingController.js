const Billing = require("../model/billingModel");

module.exports.addBill = async (req, res, next) => {
    try {
        const result = await Billing.create(req.body);
        res.status(200).json({
            status: "Success",
            message: "Successfully add billing data",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Couldn't create the billing data",
            error: error.message
        })
    }
}


module.exports.getBilling = async (req, res, next) => {
    console.log("query", req.query)
    try {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);
        const cursor = Billing.find({})
        let billing;
        if (page || size) {
            billing = await cursor.skip(page * size).limit(size);
            
        } else {
            billing = await Billing.find({});
        }

        res.status(200).json({
            status: "Success",
            message: "Successfully get the billing data",
            data: billing
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Couldn't get the billing data",
            error: error.message
        })
        console.log(error)
    }
}

module.exports.updateBilling = async (req, res, next) => {
    const { id } = req.params
    try {
        console.log(id);
        const result = await Brand.updateOne({ _id: id }, { $set: req.body }, { runValidators: true })
        console.log(result)
        if (!result.nModified) {
            res.status(200).json({
                status: "Fail",
                message: "Couldn't update the billing data"
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Successfully update the billing data",
            data: result
        })
    } catch (error) {
        res.status(200).json({
            status: "Fail",
            message: "Couldn't update the billing data",
            error: error.message
        })
        console.log(error)
    }
}


exports.deleteBilling = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Product.deleteOne({ _id: id })

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Could't delete the billing data"
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Billing Data Delete Successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Billing Data couldn't Delete Successfully",
            error: error.message
        })
        console.log(error, 'error')
    }
}