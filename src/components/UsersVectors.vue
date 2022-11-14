
<template>
  <div class="sample">
    <h1>Create a new DF by preprocessing raw data</h1>
    <cv-button @click="onClick">get vectors DF</cv-button>
  </div>
</template>

<script>
import UsersVectors from "@/scripts/UsersVectors"
  export default {
    name: 'UsersVectors',
    data() {
      return {
      };
    },
    mounted(){
    },
    methods: {
      onClick() {
        const users = new UsersVectors()
        users.analize()
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