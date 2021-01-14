<template>
  <transition name="fade" v-if="showCart">
    <div class="cart col bg-grey mt-5">
      <h3>Your Cart</h3>
      <hr/>
      <div class="row mb-2">
        <div class="col-5">
          <b>Product</b>
        </div>
        <div class="col-3">
          <b>Quantity</b>
        </div>
        <div class="col-4">
          <b>Price</b>
        </div>
      </div>
      <div class="row" v-for="(item, i) in carts" :key="i">
        <div class="col-5">
          {{ item.product.name }}
        </div>
        <div class="col-3 d-inline-flex">
          <button @click="addToQuantity({product: item.product, quantity: -1, qtyValue: item.quantity-1})" class="btn btn-sm btn-warning">-</button>
          <input type="text" style="width: 30px; text-align: center" min="1" v-model="item.quantity" readonly/>
          <button @click="addToQuantity({product: item.product, quantity: +1, qtyValue: item.quantity+1})" class="btn btn-sm btn-warning">+</button>
        </div>
        <div class="col-4">
          {{ formatPrice(item.product.price * item.quantity) }}
        </div>
      </div>
      <hr/>
      <div class="row">
        <div class="col-5"></div>
        <div class="col-3">
          Total:
        </div>
        <div class="col-4">
          {{ formatPrice(totalCart) }}
        </div>
      </div>
      <hr>
      <div class="text-center">
        <button @click="clearCart" class="btn btn-warning">Remove All Cart</button>
        <router-link to="/shop/checkout" class="btn btn-info">Checkout</router-link>
      </div>
    </div>
  </transition>
</template>

<script>
import Common from './../mixin/Common'
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    // appName () {
    //   return this.$store.getters.getAppName
    // },
    // showCart () {
    //   return this.$store.getters.getCartLength
    // },
    // carts () {
    //   return this.$store.getters.getCarts
    // },
    // totalCart () {
    //   return this.$store.getters.getTotal
    // }
    ...mapGetters({
      showCart: 'getCartLength',
      carts: 'getCarts',
      totalCart: 'getTotal'
    })
  },
  methods: {
    addToQuantity (payload) {
      this.$store.commit('addToQuantity', payload)
    },
    clearCart () {
      this.$store.commit('clearCart')
    }
  },
  mixins: [Common]
}
</script>

<style scoped>
  .bg-grey{
    background-color: grey;
  }
  .cart{
    padding-top: 15px;
    padding-bottom: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 3px rgba(0,0,0,0.8);
  }
</style>
