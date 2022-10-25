
<template>
  <div class="sample">
    <h1>Análisis de perfiles 30 días</h1>
    <cv-button @click="onClick">Init</cv-button>
    <br/>
    <br/>
    <div>{{descriptive}}</div>
    <div ref="demographicHist"></div>
    <div ref="demographicDescribe"></div>
  </div>
</template>

<script>
import Profiles from "@/assets/datasets/profiles.json"
import * as dfd from "danfojs";
  export default {
    name: 'Generals',
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
        // df.print();
        const demographic = df.loc({columns: ["age", "registeredAt"]})
        demographic.plot(this.$refs.demographicHist).hist()
        demographic.describe().print()
        let transData = []
        Profiles.forEach((user,index) => {
          if(index < 30) {
            transData.push(user.transactions)
          }
        })
        let userTransactionDF =  new dfd.DataFrame(transData.flat(2))
        userTransactionDF.print()
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