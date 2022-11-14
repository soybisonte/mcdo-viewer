
<template>
  <cv-grid>
    <cv-row>
      <cv-column>
        <h2>Comportamiento Mesual Individual</h2>
      </cv-column>
    </cv-row>
    <cv-row>
      <cv-column>
        <div class="cv-grid-story__preview-col">
            <!-- <Todos/>  -->
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
    </cv-row>
    <cv-row>
        <cv-column>
          <div class="cv-grid-story__preview-col">
            <div class="wrapper">
              <h2>Final balance: {{user.balance}}</h2> 
            </div>
            <div class="wrapper">
              <h3>Max income: {{user.transMaxMin.incomes.max}}</h3> 
            </div>
            <div class="wrapper">
              <h3>Min Income: {{user.transMaxMin.incomes.min}}</h3> 
            </div>
            <div class="wrapper">
              <h3>Max outcome: {{user.transMaxMin.outcomes.max}}</h3> 
            </div>
            <div class="wrapper">
              <h3>Min outcome: {{user.transMaxMin.outcomes.min}}</h3> 
            </div>
            <div class="wrapper">
              <h3>Horas frecuentes de operacion: 
                <span v-for="(hour, index) in user.frequentOperationHour" :key="index">
                  {{hour}}H,
                </span>
              </h3> 
            </div>
            <cv-data-table :columns="characteristics.columns" :data="characteristics.generals"   ref="table"></cv-data-table>
            <ccv-meter-chart :data='user.transDist' :options='baroptions'></ccv-meter-chart>
            <ccv-line-chart :data='userBalanceData' :options='options'></ccv-line-chart>
          </div>
        </cv-column>
      </cv-row>
  </cv-grid>
</template>

<script>
// import Todos from '@/components/Todos.vue'
import UserBalance from '@/scripts/UserBalance.js'
// import Gauge from "@/components/Gauge.vue"
// import HeatMap from "@/components/HeatMap.vue"
// import ProportionBar from "@/components/ProportionBar.vue"
  export default {
    name: 'UserBalance',
    components: {
      // Todos,
      // Gauge,
      // HeatMap,
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
        characteristics: {
          columns: [
            "Final Balance", 
            "Incomes Mean",
            "Outcomes Mean",
            "Max Income",
            "Min Income",
            "Max Outcome",
            "Min Outcome",
            "Frequent Operation Hour",
          ],
          generals: [[
          0, 
           0,
            0,
            0,
            0,
            0
          ]
          ]
        },
        userBalanceData: [],
        user: {
          balance: 0,
          frequentOperationHour: [],
          transDist: [
            {
              group: "null",
              value: 0
            }
          ],
          transMaxMin: {
            incomes: {
                max: 0,
                min: 0,
            },
            outcomes: {
                max: 0,
                min: 0,
            },
        }
        },
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
      },
      baroptions: {
		"title": "Distribucion de transacciones",
		"height": "130px",
		"meter": {
				"proportional": {
						"total": 0,
						"unit": "Transacciones"
				}
		},
		"color": {
				"pairing": {
						"option": 3
				}
		}
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
        let jsonData = user.generateBalanceTable()
        jsonData.forEach(element => {
          updateData.push({
            "group": "Dataset: Balance en el tiempo",
            "date": element["timeStamp"],
            "value": element["amount_cum_sum"]
          })
        });
        
        this.userBalanceData = updateData;
        this.user.transDist = user.transactionsDistribution
        this.user.transMaxMin = user.maxmin
        this.user.frequentOperationHour = user.frequentOperationHour
        this.characteristics.generals = [[
          this.user.balance,
          user.means.incomeMean,
          user.means.outcomeMean,
          this.user.transMaxMin.incomes.max,
          this.user.transMaxMin.incomes.min,
          this.user.transMaxMin.outcomes.max,
          this.user.transMaxMin.outcomes.min,
          this.user.frequentOperationHour[0],
        ]]
        this.user.balance = this.userBalanceData.at(-1).value.toFixed(2)
      }
    },
  };
</script>

<style>
.wrapper{
  display: flex;
  margin: 1em 0.5em;
}
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
