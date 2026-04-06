import Finance from "../models/finance.js"






export const createFinanceRecord = async (req, res) => {


    let { amount = undefined, type = undefined, category = undefined, description = undefined } = req.body
    const user = req.user
    const { userId } = user
    type = type.trim()
    category = category.trim()
    description = description.trim()

    if (amount === "" && type === "" && category === "" && description === "") {
        return res.status(400).json({ error: "Required fields missing" })
    }
    if (amount === undefined) {
        return res.status(400).json({ error: "Required amount" })
    }
    else if (type === undefined) {
        return res.status(400).json({ error: "Required type" })
    } else if (category === undefined) {
        return res.status(400).json({ error: "Required category" })
    } else if (description === undefined) {
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

    return res.status(201).json({ message: "Record created successfully" })
}




export const getAllRecords = async (req, res) => {
    try {
        const { userId } = req.user

        // Get Admin || Analyst || Viewer Records
        const getAllRecords = await Finance.find({ userId: userId })

        if (getAllRecords.length === 0) {
            return res.status(404).json({ error: "Records not found" })
        }


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
        const { userId } = req.user
        const isRecord = await Finance.findOne({ _id: recordId, userId: userId })

        if (isRecord === null) {
            return res.status(404).json({ error: "Record not found" })
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


    try {


        const { recordId } = req.params
        const { userId } = req.user
        const isRecord = await Finance.findOne({ _id: recordId, userId: userId })

        if (isRecord === null) {
            return res.status(404).json({ error: "Record not Found" })
        }
        const { amount = undefined, type = undefined, category = undefined, description = undefined } = req.body

        if (amount === undefined && type === undefined && category === undefined && description === undefined) {
            return res.status(400).json({ error: "Required fields missing" })

        } else if (amount !== undefined && type !== undefined && category !== undefined && description !== undefined) {
            if (!["INCOME", "EXPENSE"].includes(type)) {
                return res.status(400).json({ error: "Invalid type" })
            }
            await Finance.updateOne({ _id: recordId, userId: userId }, { $set: { type: type, amount: amount, category: category, description } })
            return res.status(200).json({ success: "Record updated amount,type,category and description successfully" })

        } else if (amount !== undefined && type !== undefined && category === undefined && description === undefined) {
            if (!["INCOME", "EXPENSE"].includes(type)) {
                return res.status(400).json({ error: "Invalid type" })
            }
            await Finance.updateOne({ _id: recordId, userId: userId }, { $set: { type: type, amount: amount } })
            return res.status(200).json({ success: "Record updated amount,type successfully" })

        }
        else if (amount !== undefined && type === undefined && category !== undefined && description === undefined) {

            await Finance.updateOne({ _id: recordId, userId: userId }, { $set: { amount: amount, category: category } })
            return res.status(200).json({ success: "Record updated amount,category successfully" })

        }
        else if (amount !== undefined && type === undefined && category === undefined && description !== undefined) {

            await Finance.updateOne({ _id: recordId, userId: userId }, { $set: { amount: amount, description: description } })
            return res.status(200).json({ success: "Record updated amount,description successfully" })

        }
        else if (amount === undefined && type !== undefined && category !== undefined && description === undefined) {

            await Finance.updateOne({ _id: recordId, userId: userId }, { $set: { type: type, category: category } })
            return res.status(200).json({ success: "Record updated type,category successfully" })

        } else if (amount === undefined && type !== undefined && category === undefined && description !== undefined) {
            if (!["INCOME", "EXPENSE"].includes(type)) {
                return res.status(400).json({ error: "Invalid type" })
            }
            await Finance.updateOne({ _id: recordId, userId: userId }, { $set: { type: type, description: description } })
            return res.status(200).json({ success: "Record updated type,description successfully" })

        } else if (amount === undefined && type === undefined && category !== undefined && description !== undefined) {

            await Finance.updateOne({ _id: recordId, userId: userId }, { $set: { category: category, description: description } })
            return res.status(200).json({ success: "Record updated category,description successfully" })

        }
        else if (amount !== undefined) {
            await Finance.updateOne({ _id: recordId, userId: userId }, { $set: { amount: amount } })
            return res.status(200).json({ success: "Record updated amount successfully" })
        } else if (type) {
            if (!["INCOME", "EXPENSE"].includes(type)) {
                return res.status(400).json({ error: "Invalid type" })
            }
            await Finance.updateOne({ _id: recordId, userId: userId }, { $set: { type: type } })
            return res.status(200).json({ success: "Record updated type successfully" })
        } else if (category) {
            await Finance.updateOne({ _id: recordId, userId: userId }, { $set: { category: category } })
            return res.status(200).json({ success: "Record updated category successfully" })
        } else if (description) {
            await Finance.updateOne({ _id: recordId, userId: userId }, { $set: { description: description } })
            return res.status(200).json({ success: "Record updated description successfully" })
        }






    } catch (e) {
        return res.status(400).json({ error: "Invalid record id" })
    }




}




export const deleteRecord = async (req, res) => {


    try {



        const { recordId } = req.params
        const { userId } = req.user
        const isRecord = await Finance.findOne({ _id: recordId, userId: userId })

        if (!isRecord || isRecord === null) {
            return res.status(404).json({ error: "Record not Found" })
        }

        await Finance.deleteOne({ _id: recordId, userId: userId })


        return res.status(200).json({ success: "Record deleted successfully" })

    } catch (e) {
        return res.status(400).json({ error: "Invalid record id" })
    }

}



export const filterRecords = async (req, res) => {


    try {


        const { type = undefined, category = undefined, startDate = undefined, endDate = undefined } = req.query
        const { userId } = req.user
        let filter = { userId: userId }
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
        const records = await Finance.find(filter)

        return res.status(200).json({ records: records })
    } catch (e) {
        return res.status(400).json({ error: "Invalid record id" })
    }
}