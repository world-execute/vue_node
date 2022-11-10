<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt from "jwt-decode";

export default {
  name:'App',
  created() {
      if(localStorage.getItem('userToken')){
      const decode = jwt(localStorage.getItem('userToken'))
      //token存入vuex
      this.$store.dispatch('setAuthenticated',!this.isEmpty(decode))
      this.$store.dispatch('setUser',decode)

    }
  },
  methods:{
    isEmpty(value){
      return(
          value === undefined || value === null ||
          (typeof value === 'object' && Object.keys(value).length === 0) ||
          (typeof value === 'string' && value.trim().length === 0)
      )
    }

  }
}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
