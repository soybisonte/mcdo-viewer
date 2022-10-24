
<template>
  <div class="sample">
    <h1>Análisis de perfiles 30 días</h1>
    <cv-button @click="onClick">Init</cv-button>
    <br/>
    <br/>
    <div>{{descriptive}}</div>
    <div ref="plot2"></div>
    <div ref="plot1"></div>
  </div>
</template>

<script>
import Profiles from "@/assets/datasets/profiles.json"
import * as dfd from "danfojs";
  export default {
    name: 'HelloWorld',
    data() {
      return {
        yourName: '',
        descriptive: null,
        visible: false,
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
        let df = new dfd.DataFrame(Profiles)
        const sub_df = df.loc({columns: ["age", "registeredAt"]})
        sub_df.plot(this.$refs.plot1).hist()

        let transData = []
        Profiles.forEach((user,index) => {
          if(index < 30) {
            transData.push(user.transactions)
          }
        })
        let userTransactionDF =  new dfd.DataFrame(transData.flat(2))
        const subDF = userTransactionDF.loc({columns: ["timeStamp"]})
        subDF.applyMap(this.formatDate, {inplace:true})
        const datesFormatted = subDF.getColumnData
        userTransactionDF.addColumn("operationDate", datesFormatted[0], {inplace:true})
        const layout = {
            title: "A financial charts",
            xaxis: {
              title: "operationDate",
            },
            yaxis: {
              title: "amount",
            },
          };

          const config = {
            columns: ["amount"],
          };
        let grp = userTransactionDF.groupby(["transactionType"])
        const deposits = grp.getGroup(['deposit'])
        const depositsDF = deposits.loc({columns: ["operationDate", "amount"]})
        
        depositsDF.print()
        // console.log(depositsDF);
        // depositsDF['timeStamp'].apply(this.formatDate)
        // depositsDF.print()
        depositsDF.plot(this.$refs.plot2).line(config, layout)
      },
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