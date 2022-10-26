import Vue from 'vue'
import App from './App.vue'
import 'carbon-components/css/carbon-components.css';
import "@carbon/styles/css/styles.css";
import "@carbon/charts/styles.css";

import CarbonComponentsVue from '@carbon/vue';

import "@carbon/charts/styles.css";
import chartsVue from "@carbon/charts-vue";
// import "../plex-and-carbon-components.css";

Vue.use(chartsVue);

Vue.config.productionTip = false
Vue.use(CarbonComponentsVue);

new Vue({
  render: h => h(App),
}).$mount('#app')

