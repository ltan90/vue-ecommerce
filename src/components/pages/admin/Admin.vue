<template>
  <div class="admin">
    <app-nav />
    <div class="container-fluid">
      <div class="row">
        <app-sidebar />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '../../layout/Nav.vue'
import Sidebar from '../../layout/Sidebar.vue'

export default {
  name: 'Login',
  components: {
    'app-nav': Nav,
    'app-sidebar': Sidebar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
