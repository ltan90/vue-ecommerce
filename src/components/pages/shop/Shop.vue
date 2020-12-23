<template>
  <div id="shop" class="container">
    <div class="row">
      <div class="col-8">
        <router-view />
      </div>
      <cart
        @clearCart="clearCart"
      />
    </div>
  </div>
</template>

<script>
import Cart from '../../layout/Cart.vue'
import Common from './../../mixin/Common'

export default {
  components: { Cart },
  name: 'Shop',
  // data () {
  //   return {
  //     carts: [],
  //     total: 0
  //   }
  // },
  // computed: {
  //   totalCart () {
  //     if (this.carts.length === 0) return this.total
  //     const total = this.carts.map(function (index) {
  //       return parseFloat(index.product.price) * index.quantity
  //     }).reduce(function (first, index) {
  //       return first + index
  //     })
  //     return this.formatPrice(total)
  //   }
  // },
  // mounted () {
  //   this.$eventBus.$on('addToCart', payload => {
  //     if (this.carts.length === 0) return this.carts.push(payload)
  //     for (let i = 0; i < this.carts.length; i++) {
  //       if (this.carts[i].product.id === payload.product.id) {
  //         this.carts[i].quantity += parseInt(payload.quantity)
  //         return
  //       }
  //     }
  //     this.carts.push(payload)
  //   })
  // },
  methods: {
    clearCart () {
      this.carts = []
    }
    // addToQuantity (payload) {
    //   if (payload.qtyValue <= 0) {
    //     this.carts.pop(payload)
    //   } else {
    //     this.carts.filter(cart => {
    //       if (cart.product.id === payload.product.id) {
    //         cart.quantity += parseInt(payload.quantity)
    //       }
    //     })
    //   }
    // }
  },
  mixins: [Common]
}
</script>

<style scoped>
  .bg-grey{
    background-color: grey;
  }
</style>
