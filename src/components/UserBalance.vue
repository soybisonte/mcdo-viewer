
<template>
  <div class="sample">
    <h1>Users General Balance</h1>
    <cv-button @click="onClick">Init General Balance</cv-button>
    <h2>clasificacion de todas las operaciones del mes</h2>
    <div ref="transPieChart"></div>
    <h2>Solo depositos</h2>
    <div ref="deposits"></div>
    <div ref="depositDescribe" ></div>
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
        
        let transData = []
        Profiles.forEach((user,index) => {
          if(index < 30) {
            transData.push(user.transactions)
          }
        })
        let userTransactionDF =  new dfd.DataFrame(transData.flat(2))
        const subDF = userTransactionDF.loc({columns: ["timeStamp"]})
        subDF.applyMap(this.formatDate, {inplace:true})
        let grp = userTransactionDF.groupby(["transactionType"])
        
        userTransactionDF.plot(this.$refs.transPieChart).pie({ config: { values: "amount", labels: "transactionType" } });

        const depositIncomes = grp.getGroup(['deposit'])
        const invoiceIncomes = grp.getGroup(['invoice'])
        const withdrawalOutcomes = grp.getGroup(['withdrawal'])
        const paymentOutcomes = grp.getGroup(['payment'])
        
        depositIncomes.describe().plot(this.$refs.depositDescribe).table()
        
        console.log('deposit describe');
        depositIncomes.describe().print()
        console.log('invoice describe');
        invoiceIncomes.describe().print()
        console.log('withdrawal describe');
        withdrawalOutcomes.describe().print()
        console.log('payment describe');
        paymentOutcomes.describe().print()
        
        let depositsAmounts = depositIncomes.loc({columns:["amount"]})
        depositsAmounts.plot(this.$refs.deposits).line()
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