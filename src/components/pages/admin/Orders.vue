<template>
  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
    <app-modal :modalHeading="handleOrders.id != null ? modalHeading.edit : modalHeading.add " :cond="showingModal" @modalClose="showingModal = false">
      <form>
        <div class="form-group row">
          <label for="code" class="col-sm-3 col-form-label">Code</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="handleOrders.code" placeholder="Code">
          </div>
        </div>
        <div class="form-group row">
          <label for="product" class="col-sm-3 col-form-label">Product</label>
          <div class="col-sm-9">
            <select class="form-control" v-model="handleOrders.product">
              <option value="">--Please choose product--</option>
              <option v-for="product in products" :key="product.id" :value="product">
                {{ product.name }}
              </option>
            </select>
          </div>
        </div>
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
            <span v-if="validateFields.errorAddress" class="text-danger" v-text="validateFields.errorAddress"></span>
          </div>
        </div>
        <div class="form-group row">
          <label for="phone" class="col-sm-3 col-form-label">Phone number</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="handleOrders.phone" placeholder="Phone number">
            <span v-if="validateFields.errorPhone" class="text-danger" v-text="validateFields.errorPhone"></span>
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-sm-3 col-form-label">Email address</label>
          <div class="col-sm-9">
            <input type="email" class="form-control" v-model="handleOrders.email" placeholder="Email address">
            <span v-if="validateFields.errorEmail" class="text-danger" v-text="validateFields.errorEmail"></span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-9 ml-auto">
          <button type="submit" class="btn btn-primary" @click.prevent="handleOrders.id != null ? updateOrder() : addNewOrder()">{{handleOrders.id != null ? 'Update' : 'Save' }}</button>
          </div>
        </div>
      </form>
    </app-modal>
    <app-modal :modalHeading="modalHeading.delete" :cond="showingDeleteModal" @modalClose="showingDeleteModal = false">
      <h2>
        You are going to delete the order `{{ handleOrders.name }}`
      </h2>
      <button type="button" class="btn btn-danger mr-1" @click.prevent="deleteOrder()">Yes</button>
      <button type="button" class="btn btn-info" @click="showingDeleteModal = false">No</button>
    </app-modal>
    <div class="d-flex justify-content-between mt-3 mb-1">
      <h1 class="h3">Orders</h1>
      <button class="btn btn-primary btn-sm" @click="showingModal = true; handleOrders = {product: ''}">Add new</button>
    </div>
    <app-alert-success :alertHeading="alertHeading" :cond="showingAlertSuccess" @alertClose="showingAlertSuccess = false"/>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Code</th>
            <th>Product</th>
            <th>Full name</th>
            <th>Phone number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.code }}</td>
            <td>{{ order.product.name }}</td>
            <td>{{ order.full_name }}</td>
            <td>{{ order.phone }}</td>
            <td>
              <button class="btn btn-sm btn-warning mr-1" @click="showingModal = true; handleOrders = order">Edit</button>
              <button class="btn btn-sm btn-danger" @click="showingDeleteModal = true; handleOrders = order">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import AlertSuccess from '../../layout/AlertSuccess.vue'

export default {
  name: 'Orders',
  components: {
    'app-alert-success': AlertSuccess
  },
  data () {
    return {
      showingAlertSuccess: false,
      showingDeleteModal: false,
      showingModal: false,
      modalHeading: {
        add: 'Add new order',
        edit: 'Edit order',
        delete: 'Are you sure?'
      },
      alertSuccess: {
        created: 'Create order success',
        updated: 'Update order success',
        deleted: 'Delete order success'
      },
      alertHeading: '',
      handleOrders: {
        code: 1,
        product: '',
        fullName: '',
        address: '',
        phone: '',
        email: ''
      },
      orders: [],
      products: [],
      validateFields: {
        errorFullName: '',
        errorAddress: '',
        errorPhone: '',
        errorEmail: ''
      }
    }
  },
  methods: {
    checkForm () {
      this.validateFields.errorFullName = this.handleOrders.full_name ? '' : 'Please enter full name!'
      this.validateFields.errorAddress = this.handleOrders.address ? '' : 'Please enter address!'
      this.validateFields.errorPhone = this.handleOrders.phone ? '' : 'Please enter phone number!'
      this.validateFields.errorEmail = this.handleOrders.email ? '' : 'Please enter email address!'
      return this.handleOrders.full_name && this.handleOrders.address && this.handleOrders.phone && this.handleOrders.email
    },
    init () {
      this.$eventBus.$emit('loadingStatus', true)
      this.$axios.get('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/orders').then(res => {
        this.orders = res.data
        this.$eventBus.$emit('loadingStatus', false)
      })
      this.$axios.get('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/products').then(res => {
        this.products = res.data
      })
    },
    addNewOrder () {
      if (this.checkForm()) {
        this.$eventBus.$emit('loadingStatus', true)
        this.$axios.post('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/orders', this.handleOrders).then(res => {
          this.$eventBus.$emit('loadingStatus', false)
          if (res.status === 201) {
            this.showingModal = false
            this.showingAlertSuccess = true
            this.alertHeading = this.alertSuccess.created
            this.init()
            let ob = this
            setTimeout(function () {
              ob.showingAlertSuccess = false
            }, 3000)
          }
        })
      }
    },
    updateOrder () {
      if (this.checkForm()) {
        this.$eventBus.$emit('loadingStatus', true)
        this.$axios.put('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/orders/' + this.handleOrders.id, this.handleOrders).then(res => {
          this.$eventBus.$emit('loadingStatus', false)
          if (res.statusText === 'OK') {
            this.showingModal = false
            this.showingAlertSuccess = true
            this.alertHeading = this.alertSuccess.updated
            this.handleOrders = {}
            let ob = this
            setTimeout(function () {
              ob.showingAlertSuccess = false
            }, 3000)
          }
        })
      }
    },
    deleteOrder () {
      this.$eventBus.$emit('loadingStatus', true)
      this.$axios.delete('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/orders/' + this.handleOrders.id).then(res => {
        this.$eventBus.$emit('loadingStatus', false)
        if (res.statusText === 'OK') {
          this.showingDeleteModal = false
          this.showingAlertSuccess = true
          this.alertHeading = this.alertSuccess.deleted
          this.handleOrders = {}
          this.init()
          let ob = this
          setTimeout(function () {
            ob.showingAlertSuccess = false
          }, 3000)
        }
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
