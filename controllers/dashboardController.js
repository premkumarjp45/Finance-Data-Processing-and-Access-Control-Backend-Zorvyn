import mongoose from "mongoose"
import Finance from "../models/finance.js"


export const dashboardSummary = async (req, res) => {

    try {
        const { userId } = req.user
        const getData = await Finance.find({ userId: userId })

        if (!getData) {
            return res.status(404).json({ error: "Not Found" })
        }
        let totalIncome = 0
        let totalExpense = 0
        for (let item of getData) {
            if (item.type === "INCOME") {
                totalIncome += item.amount
            } else {
                totalExpense += item.amount
            }
        }


        return res.status(200).json({
            totalIncome: totalIncome,
            totalExpense: totalExpense,
            netBalance: totalIncome - totalExpense
        })

    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
}


export const dashboardCategory = async (req, res) => {

    try {
        const { userId } = req.user
        const getData = await Finance.aggregate([
            {

                $match: { userId: new mongoose.Types.ObjectId(userId) }
            }, {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount"
                    }
                }


            }, {
                $project: {
                    _id: 0,
                    category: "$_id",
                    total: 1
                }

            }

        ])



        if (!getData) {
            return res.status(404).json({ error: "Not Found" })
        }



        return res.status(200).json({ data: getData })


    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
}



export const dashboardTrend = async (req, res) => {

    try {
        const { userId } = req.user
        const getData = await Finance.aggregate([
            {

                $match: { userId: new mongoose.Types.ObjectId(userId) }
            }, {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" }
                    },
                    totalIncome: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: ["$type", "INCOME"]
                                }, "$amount", 0
                            ]
                        }
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: ["$type", "EXPENSE"]
                                }, "$amount", 0
                            ]
                        }
                    }

                }


            }

        ])

        //console.log(getData)


        if (!getData) {
            return res.status(404).json({ error: "Not Found" })
        }



        return res.status(200).json({ data: getData })


    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
}