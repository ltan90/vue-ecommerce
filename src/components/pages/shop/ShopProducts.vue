<template>
  <div class="products">
    <h1>Latest Product</h1>
    <hr/>
    <div class="row">
      <div class="col-3" v-for="product in products" :key="product.id">
        <router-link :to="'/shop/products/' + product.id">
          <img :src="'../../../../static/img/' + product.image" :alt="product.name" width="100%">
          <h2 class="heading-product">{{ product.name }}</h2>
          <p>Price: {{ formatPrice(product.price) }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Common from './../../mixin/Common'

export default {
  name: 'ShopProducts',
  data () {
    return {
      products: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$axios.get('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/products').then(res => {
        this.products = res.data
      })
    }
  },
  mixins: [Common]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .heading-product{
    font-size: 18px;
  }
</style>
