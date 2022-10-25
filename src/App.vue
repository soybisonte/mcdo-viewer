<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <Generals /> -->
    <UserBalance />
    <!-- <UserProfile/> -->
  </div>
</template>

<script>

// import Generals from './components/Generals.vue'
import UserBalance from './components/UserBalance.vue'
// import UserProfile from './components/UserProfile.vue';

export default {
  name: 'App',
  components: {
    // Generals,
    UserBalance,
    // UserProfile
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
