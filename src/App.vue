<template>
  <div id="app">
    <div id="loading" v-if="loading">
      <img src="/static/img/loading.gif" alt="loading">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.$eventBus.$on('loadingStatus', payload => {
      this.loading = payload
    })
  }
}
</script>

<style>
#app {
  /* display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  justify-content: center;
  height: 100vh; */
}
#loading{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255,255,255,0.5);
  z-index: 1100;
}
</style>
