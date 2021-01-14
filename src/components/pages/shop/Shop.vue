<template>
  <div id="shop" class="container">
    <div class="row">
      <div class="col-12">
        <router-view />
      </div>
      <div class="col-12 mb-5">
        <cart
          @clearCart="clearCart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Cart from '../../layout/Cart.vue'
import Common from './../../mixin/Common'

export default {
  components: { Cart },
  name: 'Shop',
  methods: {
    clearCart () {
      this.carts = []
    }
  },
  mixins: [Common]
}
</script>

<style scoped>
  .bg-grey{
    background-color: grey;
  }
</style>
