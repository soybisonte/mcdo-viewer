
<template>
  <cv-grid>
    <cv-row>
        <cv-column>
          <div class="cv-grid-story__preview-col">
            <h1>Predictor</h1>
            <cv-button @click="runPrediction">Predict</cv-button>
          </div>
        </cv-column>
      </cv-row>
  </cv-grid>
</template>

<script>
import Predictor from "@/scripts/Predictor.js"
  export default {
    name: 'Predictor',
    components: {
    },
    data() {
      return {  
      }
    },
    mounted(){    
      
    },
    methods: {
      runPrediction() {
        const p = new Predictor()
        p.predict()
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
