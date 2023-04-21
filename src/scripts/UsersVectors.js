import * as dfd from "danfojs";
import Profiles from "@/assets/datasets/profiles.json"
import UserBalance from '@/scripts/UserBalance'

export default class UsersVector {
    constructor(userID) {
        this.userID = userID
        this.UsersVector = null
        this.userVectorsDF = null
    }
    analize() {
        let userVectors = []
        Profiles.forEach((user, index) => {
          const userBalance = new UserBalance(index)
          userBalance.generateBalanceTable()
          userVectors.push(userBalance.getVector())
        // console.log(user.userId, userBalance);
        });
        // console.log(userVectors[0]);
        const cols = [
            "final_balance",
            "income_mean",
            "outcome_mean",
            "incomes_max",
            "incomes_min",
            "outcomes_max",
            "outcomes_min",
            "fequent_operation_hour"
        ]
        const userVectorsDF = new dfd.DataFrame(userVectors, {columns: cols})
        userVectorsDF.print()
        this.userVectors = userVectors
        this.userVectorsDF = userVectorsDF
    }
    downloadCSV () {
        const cols = [
            "final_balance",
            "income_mean",
            "outcome_mean",
            "incomes_max",
            "incomes_min",
            "outcomes_max",
            "outcomes_min",
            "fequent_operation_hour"
        ]
        const userVectorsDF = new dfd.DataFrame(this.userVectors, {columns: cols})
        dfd.toCSV(userVectorsDF, { fileName: "fakeDataProfiles.csv", download: true})
    }
}