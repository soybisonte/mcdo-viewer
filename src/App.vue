<template>
  <div id="app">
    <UserBalance />
    <UsersVectors />
    <Predictor></Predictor>
  </div>
</template>

<script>

// import Generals from './components/Generals.vue'
import UserBalance from './components/UserBalance.vue'
import UsersVectors from './components/UsersVectors.vue';
import Predictor from './components/Predictor.vue';

export default {
  name: 'App',
  components: {
    // Generals,
    UserBalance,
    UsersVectors,
    Predictor
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
