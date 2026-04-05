import Finance from "../models/finance.js"






export const createFinanceRecord = async (req, res) => {


    const { amount = undefined, type = undefined, category = undefined, description = undefined } = req.body
    const user = req.user
    const { userId } = user

    if (!amount && !type && !category && !description) {
        return res.status(400).json({ error: "Required fields missing" })
    }
    if (!amount) {
        return res.status(400).json({ error: "Required amount" })
    }
    else if (!type) {
        return res.status(400).json({ error: "Required type" })
    } else if (!category) {
        return res.status(400).json({ error: "Required category" })
    } else if (!description) {
        return res.status(400).json({ error: "Required description" })
    } else if (!["INCOME", "EXPENSE"].includes(type)) {
        return res.status(400).json({ error: "Invalid type" })
    } else if (amount < 0) {
        return res.status(400).json({ error: "Amount must be > 0" })
    }

    const newRecord = Finance({
        amount: amount,
        type: type,
        category: category,
        description: description,
        userId: userId
    })
    await newRecord.save()

    return res.status(200).json({ message: "Create finance record" })
}




export const getAllRecords = async (req, res) => {
    try {


        const getAllRecords = await Finance.find({})

        const filteredRecords = getAllRecords.map((item) => ({
            id: item._id,
            amount: item.amount,
            type: item.type,
            category: item.category,
            description: item.description

        }))
        return res.status(200).json({ records: filteredRecords })

    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
}

export const getSingleRecord = async (req, res) => {
    try {

        const { recordId } = req.params
        const isRecord = await Finance.findOne({ _id: recordId })

        if (!isRecord) {
            return res.status(400).json({ error: "Record not found" })
        }
        return res.status(200).json({
            id: isRecord._id,
            amount: isRecord.amount,
            type: isRecord.type,
            category: isRecord.category,
            description: isRecord.description
        })
    } catch (e) {
        return res.status(400).json({ error: "Invalid record id" })
    }
}




export const updateRecord = async (req, res) => {


    const { recordId } = req.params
    const isRecord = await Finance.findOne({ _id: recordId })

    if (!isRecord) {
        return res.status(400).json({ error: "Record not Found" })
    }
    const { amount = undefined, type = undefined, category = undefined, description = undefined } = req.body
    if (!amount && !type && !category && !description) {
        return res.status(400).json({ error: "Required fields missing" })
    }
    else if (amount) {
        await Finance.UpdateOne({ _id: recordId }, { $set: { amount: amount } })
        return res.status(200).json({ success: "Record updated amount successfully" })
    } else if (type) {
        if (!["INCOME", "EXPENSE"].includes(type)) {
            return res.status(400).json({ error: "Invalid type" })
        }
        await Finance.UpdateOne({ _id: recordId }, { $set: { type: type } })
        return res.status(200).json({ success: "Record updated type successfully" })
    } else if (category) {
        await Finance.UpdateOne({ _id: recordId }, { $set: { category: category } })
        return res.status(200).json({ success: "Record updated category successfully" })
    } else if (description) {
        await Finance.UpdateOne({ _id: recordId }, { $set: { description: description } })
        return res.status(200).json({ success: "Record updated description successfully" })
    }







}




export const deleteRecord = async (req, res) => {


    const { recordId } = req.params
    const isRecord = await Finance.findOne({ _id: recordId })

    if (!isRecord) {
        return res.status(400).json({ error: "Record not Found" })
    }

    await Finance.deleteOne({ _id: recordId })


    return res.status(200).json({ success: "Record deleted successfully" })
}



export const filterRecords = async (req, res) => {

    const { type = undefined, category = undefined, startDate = undefined, endDate = undefined } = req.query

    let filter = {}
    if (type) {
        filter.type = type
    }
    if (category) {
        filter.category = category
    }
    if (startDate && endDate) {
        filter.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }
    const records = await Finance.find({ filter })

    return res.status(200).json({ records: records })
}