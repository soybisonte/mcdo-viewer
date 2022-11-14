import Profiles from "@/assets/datasets/profiles.json"
import * as dfd from "danfojs";

export default class UserBalance {
    constructor(userID) {
        this.userID = userID
    }
    generateBalanceTable() {
        const user = Profiles[this.userID]
        const userOperations = new dfd.DataFrame(user.transactions.flat(2))
        userOperations.asType("amount", "float32")
        const timestamps = dfd.toDateTime(userOperations.column("timeStamp"))

        userOperations.addColumn("operationDate", timestamps.$dateObjectArray, { inplace: true })
        const groupedByType = userOperations.groupby(["transactionType"])
        const income1 = groupedByType.getGroup(["deposit"])
        const income2 = groupedByType.getGroup(["invoice"])
        const incomes = dfd.concat({ dfList: [income1, income2], axis: 0 })
        const outcome1 = groupedByType.getGroup(["withdrawal"])
        const outcome2 = groupedByType.getGroup(["payment"])
        const outcomes = dfd.concat({ dfList: [outcome1, outcome2], axis: 0 })
        this.maxmin = {
            incomes: {
                max: incomes["amount"].max(),
                min: incomes["amount"].min(),
            },
            outcomes: {
                max: outcomes["amount"].max(),
                min: outcomes["amount"].min(),
            },
        }

        this.transactionsDistribution = [
            {
                "group": "deposit",
				"value": income1.shape[0]
            },
            {
                "group": "invoice",
				"value": income2.shape[0]
            },
            {
                "group": "whitdrawal",
				"value": outcome1.shape[0]
            },
            {
                "group": "payment",
				"value": outcome2.shape[0]
            },
        ]


        const negatives = outcomes["amount"].mul(-1)
        outcomes.drop({columns: ["amount"]})
        outcomes.addColumn("amount", negatives.$data, { inplace: true })

        const balance = dfd.concat({ dfList: [incomes, outcomes], axis: 0 })

        balance.sortValues("operationDate", {ascending:true, inplace:true})
        balance.addColumn("amount_cum_sum", balance["amount"].cumSum(),{inplace:true})
        
        const balanceDataCarbon = balance.loc({columns: ["timeStamp","amount_cum_sum"]})
        const jsonData = dfd.toJSON(balanceDataCarbon)
        return jsonData
    }
}