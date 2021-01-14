<template>
  <div class="products">
    <div class="d-flex justify-content-between align-items-center">
      <h1>{{ product.name }}</h1>
      <router-link to="/shop/products">All Products</router-link>
    </div>
    <hr/>
    <div class="row">
      <div class="col-4">
        <img :src="'../../../../static/img/' + product.image" :alt="product.name" width="100%">
      </div>
      <div class="col-8">
        <p>Price: {{ formatPrice(product.price) }}</p>
        <p>Category: {{ category }}</p>
        <p>Supplier: {{ supplier }}</p>
        <p>{{ product.description }}</p>
        <div class="quantity">
          <span>Quantity</span>
          <input type="number" min="1" v-model="quantity" style="width: 50px"/>
          <button class="btn btn-primary btn-sm" @click="addToCart()">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Common from './../../mixin/Common'

export default {
  name: 'ShopDetailProduct',
  data () {
    return {
      product: {},
      category: '',
      supplier: '',
      quantity: 1
    }
  },
  methods: {
    init () {
      this.$axios.get('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/products/' + this.$route.params.id).then(res => {
        this.product = res.data
        this.category = res.data.category.name
        this.supplier = res.data.supplier.name
      })
    },
    addToCart () {
      this.$store.commit('addToCart', {product: this.product, quantity: parseInt(this.quantity)})
    }
  },
  created () {
    this.init()
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
