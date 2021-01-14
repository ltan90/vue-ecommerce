<template>
  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
    <app-modal :modalHeading="handleProducts.id != null ? modalHeading.edit : modalHeading.add " :cond="showingModal" @modalClose="showingModal = false">
      <form>
        <div class="form-group row">
          <label for="productName" class="col-sm-3 col-form-label">Product Name</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="handleProducts.name" placeholder="Product name">
            <span v-if="validateFields.errorProductName" class="text-danger" v-text="validateFields.errorProductName"></span>
          </div>
        </div>
        <div class="form-group row">
          <label for="category_id" class="col-sm-3 col-form-label">Category</label>
          <div class="col-sm-9">
            <select class="form-control" v-model="handleProducts.category">
              <option value="">--Please choose category--</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat">
                {{ cat.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="supplier_id" class="col-sm-3 col-form-label">Supplier</label>
          <div class="col-sm-9">
            <select class="form-control" v-model="handleProducts.supplier">
              <option value="">--Please choose supplier--</option>
              <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier">
                {{ supplier.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="productPrice" class="col-sm-3 col-form-label">Product Price</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="handleProducts.price" placeholder="0">
            <span v-if="validateFields.errorProductPrice" class="text-danger" v-text="validateFields.errorProductPrice"></span>
          </div>
        </div>
        <div class="form-group row">
          <label for="productPrice" class="col-sm-3 col-form-label">Product Image</label>
          <div class="col-sm-9">
            <input type="file" class="form-control" @change="onFileChange">
          </div>
        </div>
        <div class="form-group row">
          <label for="productDescription" class="col-sm-3 col-form-label">Product Description</label>
          <div class="col-sm-9">
            <textarea class="form-control" cols="30" rows="5" v-model="handleProducts.description" placeholder="Product description"></textarea>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-9 ml-auto">
          <button type="submit" class="btn btn-primary" @click.prevent="handleProducts.id != null ? updateProduct() : addNewProduct()">{{handleProducts.id != null ? 'Update' : 'Save' }}</button>
          </div>
        </div>
      </form>
    </app-modal>
    <app-modal :modalHeading="modalHeading.delete" :cond="showingDeleteModal" @modalClose="showingDeleteModal = false">
      <h2>
        You are going to delete the product `{{ handleProducts.name }}`
      </h2>
      <button type="button" class="btn btn-danger mr-1" @click.prevent="deleteProduct()">Yes</button>
      <button type="button" class="btn btn-info" @click="showingDeleteModal = false">No</button>
    </app-modal>
    <div class="d-flex justify-content-between mt-3 mb-1">
      <h1 class="h3">Products</h1>
      <button class="btn btn-primary btn-sm" @click="showingModal = true; handleProducts = {category: '', supplier:''}">Add new</button>
    </div>
    <app-alert-success :alertHeading="alertHeading" :cond="showingAlertSuccess" @alertClose="showingAlertSuccess = false"/>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>
              <img :src="'../../../../static/img/' + product.image" :alt="product.name" width="64">
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.category.name }}</td>
            <td>{{ product.supplier.name }}</td>
            <td>{{ product.description }}</td>
            <td>
              <button class="btn btn-sm btn-warning mr-1" @click="showingModal = true; handleProducts = product">Edit</button>
              <button class="btn btn-sm btn-danger" @click="showingDeleteModal = true; handleProducts = product">Delete</button>
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
  name: 'Products',
  components: {
    'app-alert-success': AlertSuccess
  },
  data () {
    return {
      showingAlertSuccess: false,
      showingDeleteModal: false,
      showingModal: false,
      modalHeading: {
        add: 'Add new product',
        edit: 'Edit product',
        delete: 'Are you sure?'
      },
      alertSuccess: {
        created: 'Create product success',
        updated: 'Update product success',
        deleted: 'Delete product success'
      },
      alertHeading: '',
      handleProducts: {},
      products: [],
      categories: [],
      suppliers: [],
      validateFields: {
        errorProductName: '',
        errorProductPrice: ''
      },
      categoryName: '',
      supplierName: ''
    }
  },
  computed: {
    validateFullName () {
      return `<span class="text-danger">Please enter full name!</span>`
    }
  },
  methods: {
    checkForm () {
      this.validateFields.errorProductName = this.handleProducts.name ? '' : 'Please enter product name!'
      this.validateFields.errorProductPrice = this.handleProducts.price ? '' : 'Please enter product price!'
      return this.handleProducts.name && this.handleProducts.price
    },
    init () {
      this.$eventBus.$emit('loadingStatus', true)
      this.$axios.get('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/products').then(res => {
        this.products = res.data
        this.$eventBus.$emit('loadingStatus', false)
      })
      this.$axios.get('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/categories').then(res => {
        this.categories = res.data
      })
      this.$axios.get('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/suppliers').then(res => {
        this.suppliers = res.data
      })
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfers.files
      var file = files[0]
      this.handleProducts.image = file.name
    },
    addNewProduct () {
      if (this.checkForm()) {
        this.$eventBus.$emit('loadingStatus', true)
        this.$axios.post('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/products', this.handleProducts).then(res => {
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
    updateProduct () {
      if (this.checkForm()) {
        this.$eventBus.$emit('loadingStatus', true)
        this.$axios.put('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/products/' + this.handleProducts.id, this.handleProducts).then(res => {
          this.$eventBus.$emit('loadingStatus', false)
          if (res.statusText === 'OK') {
            this.showingModal = false
            this.showingAlertSuccess = true
            this.alertHeading = this.alertSuccess.updated
            this.handleProducts = {}
            let ob = this
            setTimeout(function () {
              ob.showingAlertSuccess = false
            }, 3000)
          }
        })
      }
    },
    deleteProduct () {
      this.$eventBus.$emit('loadingStatus', true)
      this.$axios.delete('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/products/' + this.handleProducts.id).then(res => {
        this.$eventBus.$emit('loadingStatus', false)
        if (res.statusText === 'OK') {
          this.showingDeleteModal = false
          this.showingAlertSuccess = true
          this.alertHeading = this.alertSuccess.deleted
          this.handleProducts = {}
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
