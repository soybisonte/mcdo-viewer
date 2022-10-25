
<template>
  <div class="sample">
    <h1>Users General Balance</h1>
    
    <h2>Comportamiento Mesual y balance</h2>
    <cv-number-input
    v-model="userIndex"
    :light="'light'"
    value="0"
    max="999"
    min="0"
    :label="`Introduce un indice de usuario`"
    :helper-text="`selecciona un numero entre 0 y 999`">
    </cv-number-input>
    <br>
    <br>
    <br>
    <cv-button @click="onClick">get Global Balance</cv-button>
    <div id="plot_div"></div>
  </div>
</template>

<script>
import Profiles from "@/assets/datasets/profiles.json"
import * as dfd from "danfojs";
  export default {
    name: 'UserBalance',
    data() {
      return {
        yourName: '',
        descriptive: null,
        visible: false,
        userIndex: 0
      };
    },
    mounted(){
    },
    methods: {
      formatDate(dateStr){
        let formatted = dateStr.split(/[/:\-T]/)
        return `${formatted[0]}-${formatted[1]}-${formatted[2]} ${formatted[3]}:${formatted[4]}:${formatted[5]}`
      },
      onClick() {
        
        this.visible = true;
        const user = Profiles[this.userIndex]
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
        const negatives = outcomes["amount"].mul(-1)
        outcomes.drop({columns: ["amount"]})
        outcomes.addColumn("amount", negatives.$data, { inplace: true })
        
        const balance = dfd.concat({ dfList: [incomes, outcomes], axis: 0 })
        // console.log(outcomes["amount"]);
        
        balance.addColumn("amount_cum_sum", balance["amount"].cumSum(),{inplace:true})
        balance.sortValues("timeStamp", {ascending:true, inplace:true})
        balance.print()
        const subDF = balance.loc({columns: ["operationDate","amount_cum_sum"]})
        subDF.print()


        const layout = {
            title: "Balance mensual",
            xaxis: {
              title: "Date",
            },
            yaxis: {
              title: "Count",
            },
          };

          const config = {
            columns: ["amount_cum_sum"],
          };

          const new_df = subDF.setIndex({ column: "operationDate" });
          new_df.plot("plot_div").line({ config, layout });
      }
    },
  };
</script>

<style>
  .sample {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 960px;
    margin: 5% auto;
  }

  .cv-text-input {
    margin: 30px 0;
  }
</style>