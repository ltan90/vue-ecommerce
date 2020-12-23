<template>
  <div class="products">
    <h1>Delivery Information</h1>
    <hr/>
    <form>
      <input type="hidden" class="form-control" v-model="handleOrders.code" placeholder="Code">
      <div class="form-group row">
        <label for="fullName" class="col-sm-3 col-form-label">Full name</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" cols="30" rows="5" v-model="handleOrders.full_name" placeholder="Full name" />
          <span v-if="validateFields.errorFullName" class="text-danger" v-text="validateFields.errorFullName"></span>
        </div>
      </div>
      <div class="form-group row">
        <label for="address" class="col-sm-3 col-form-label">Address</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" v-model="handleOrders.address" placeholder="Address">
        </div>
      </div>
      <div class="form-group row">
        <label for="phone" class="col-sm-3 col-form-label">Phone number</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" v-model="handleOrders.phone" placeholder="Phone number">
        </div>
      </div>
      <div class="form-group row">
        <label for="email" class="col-sm-3 col-form-label">Email address</label>
        <div class="col-sm-9">
          <input type="email" class="form-control" v-model="handleOrders.email" placeholder="Email address">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-9 ml-auto">
        <button type="submit" class="btn btn-primary" @click.prevent="orderNow()">Order</button>
        </div>
      </div>
    </form>
    <transition name="fade" v-if="alertSuccessOrder">
      <div class="alert alert-success" role="alert">
        <span>Your information have send successfully!</span>
        <router-link to="/shop/products">Continue Shopping</router-link>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'Checkout',
  data () {
    return {
      handleOrders: {
        code: ''
      },
      alertSuccessOrder: false,
      validateFields: {
        errorFullName: ''
      }
    }
  },
  methods: {
    checkForm () {
      if (this.handleOrders.full_name) {
        return true
      }
      if (!this.handleOrders.full_name) {
        this.validateFields.errorFullName = 'Please enter full name!'
      } else {
        this.validateFields.errorFullName = ''
      }
    },
    orderNow () {
      if (this.checkForm()) {
        this.$eventBus.$emit('loadingStatus', true)
        this.$axios.post('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/orders', this.handleOrders).then(res => {
          this.$eventBus.$emit('loadingStatus', false)
          if (res.status === 201) {
            this.alertSuccessOrder = true
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .heading-product{
    font-size: 18px;
  }
</style>
