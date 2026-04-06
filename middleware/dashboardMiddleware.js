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

        console.log(totalIncome, totalExpense)
        res.json({
            totalIncome: totalIncome,
            totalExpense: totalExpense,
            netBalance: totalIncome - totalExpense
        })

    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
}