<template>
  <div id="app">
    <UserBalance />
    <UsersVectors />
    <DataPredictor />
  </div>
</template>

<script>

// import Generals from './components/Generals.vue'
import UserBalance from './components/UserBalance.vue'
import UsersVectors from './components/UsersVectors.vue';
import DataPredictor from './components/DataPredictor.vue';

export default {
  name: 'App',
  components: {
    // Generals,
    UserBalance,
    UsersVectors,
    DataPredictor
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
