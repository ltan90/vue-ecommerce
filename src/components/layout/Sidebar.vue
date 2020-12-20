<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="sidebar-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link" to="/admin" exact>Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/categories">Categories</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/suppliers">Suppliers</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/products">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/orders">Orders</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      routers: [
        {path: '/admin', text: 'Dashboard'},
        {path: '/admin/categories', text: 'Categories'},
        {path: '/admin/suppliers', text: 'Suppliers'},
        {path: '/admin/products', text: 'Products'},
        {path: '/admin/orders', text: 'Orders'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.router-link-active{
  color: #007bff;
}
</style>
