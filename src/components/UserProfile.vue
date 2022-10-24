
<template>
  <div class="sample">
    <table class="table">
  <tr class="tr">
    <th v-for="(header, index) in subDF.$columns" :key="index">{{header}}</th>
  </tr>
  <tr class="tr" v-for="(user, idx) in subDF.$data" :key="idx">
    <td v-for="(value, ix) in user" :key="ix">
      {{value}}
    </td>
    <td>
      <!-- <button>ir al perfil</button> -->
    </td>
  </tr>
</table>
  </div>
</template>

<script>
import Profiles from "@/assets/datasets/profiles.json"
import * as dfd from "danfojs";
  export default {
    name: 'UserProfile',
    data() {
      return {
        yourName: '',
        descriptive: null,
        visible: false,
        userDF: null,
        subDF: null
      };
    },
    beforeMount(){
      this.userDF = new dfd.DataFrame(Profiles)
      this.subDF = this.userDF.loc({columns: ["userId", "username","age"]})  
    },
    methods: {
      formatDate(dateStr){
        let formatted = dateStr.split(/[/:\-T]/)
        return `${formatted[0]}-${formatted[1]}-${formatted[2]} ${formatted[3]}:${formatted[4]}:${formatted[5]}`
      },
      mapData() {
        this.userDF = new dfd.DataFrame(Profiles)
        this.subDF = this.userDF.loc({columns: ["userId","age"]})
        console.log(this.subDF);
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
  .table {
    max-height: 350px;
    overflow: scroll;
    display: block;
  }
  .cv-text-input {
    margin: 30px 0;
  }
  .tr{
    padding: 0.5em 1em;
  }
</style>