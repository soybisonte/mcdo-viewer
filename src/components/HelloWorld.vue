<template>
  <div class="sample">
    <h1>Example use of @carbon/vue</h1>
    <cv-button @click="onClick">Create</cv-button>
    <br/>
    <br/>
  </div>
</template>

<script>
  
  // import ProfilesGenerator from "@/scripts/ProfilesGenerator.js";
  export default {
    name: 'HelloWorld',
    data() {
      return {
        yourName: '',
        visible: false,
        profiiles: null
      };
    },
    methods: {
      onClick() {
        this.visible = true;
        // const FakeProfiles = new ProfilesGenerator({
        //   numberOfProfiles: 1000,
        //   pathToSave: './assets/datasets/profiles'
        // })
        // this.profiles = FakeProfiles.generateProfiles()
        // console.log(this.profiles);
      },
      modalClosed() {
        this.visible = false;
      },
      dataDisplay() {
        
        // dfd.readJSON(JSON.stringify(this.profiles))
        // .then(df => {
        //   df.head().print()
        // }).catch(err=>{
        //   console.log(err);
        // })
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
    max-width: 600px;
    margin: 5% auto;
  }

  .cv-text-input {
    margin: 30px 0;
  }
</style>