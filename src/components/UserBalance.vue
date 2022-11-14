
<template>
  <cv-grid>
    <cv-row>
      <cv-column>
        <h2>Comportamiento Mesual y balance</h2>
      </cv-column>
    </cv-row>
    <cv-row>
      <cv-column>
        <div class="cv-grid-story__preview-col">
            <Todos/> 
            <cv-number-input
            v-model="userIndex"
            :light="'light'"
            value="0"
            max="9999"
            min="0"
            :label="`Introduce un indice de usuario`"
            :helper-text="`selecciona un numero entre 0 y 9999`">
            </cv-number-input>
            <cv-button @click="onClick">get Global Balance</cv-button>
        </div>
      </cv-column>
      <cv-column>
        <div class="cv-grid-story__preview-col">
            <h2>aqui va la barra de proporción</h2>
            <ProportionBar/>
          </div>
      </cv-column>
    </cv-row>
    <cv-row>
        <cv-column>
          <div class="cv-grid-story__preview-col">
            <ccv-line-chart :data='userBalanceData' :options='options'></ccv-line-chart>
          </div>
        </cv-column>
        <cv-column>
          <div class="cv-grid-story__preview-col">
            <HeatMap/>
          </div>
        </cv-column>
      </cv-row>
  </cv-grid>
</template>

<script>
import Todos from '@/components/Todos.vue'
import UserBalance from '@/scripts/UserBalance.js'
// import Gauge from "@/components/Gauge.vue"
import HeatMap from "@/components/HeatMap.vue"
import ProportionBar from "@/components/ProportionBar.vue"
  export default {
    name: 'UserBalance',
    components: {
      Todos,
      // Gauge,
      HeatMap,
      ProportionBar,
    },
    data() {
      return {
        yourName: '',
        descriptive: null,
        visible: false,
        userIndex: 0,
        elements: [
          {}
        ],
        userBalanceData: [],
        options: {
          "title": "Balance en tiempo (ultimos 120 días)",
          "axes": {
            "bottom": {
						"title": "Fecha de la transaccion",
						"mapsTo": "date",
						"scaleType": "time"
          },
          "left": {
            "mapsTo": "value",
						"title": "Monto de la transaccion",
						"scaleType": "linear"
          }
        },
        // "curve": "curveMonotoneX",
        "height": "400px"
      }
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
        const user = new UserBalance(this.userIndex)
        let updateData = []
        let jsonData = user.generateTable()
        jsonData.forEach(element => {
          updateData.push({
            "group": "Dataset: Balance en el tiempo",
            "date": element["timeStamp"],
            "value": element["amount_cum_sum"]
          })
        });
        this.userBalanceData = updateData;
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
  .half {
    width: 50%;
  }
  .cv-text-input {
    margin: 30px 0;
  }
</style>
