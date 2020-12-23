<template>
  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Dashboard</h1>
    </div>
  </main>
</template>

<script>
import Nav from '../../layout/Nav.vue'
import Sidebar from '../../layout/Sidebar.vue'

export default {
  name: 'Dashboard',
  components: {
    'app-nav': Nav,
    'app-sidebar': Sidebar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
