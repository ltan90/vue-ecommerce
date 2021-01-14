<template>
  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
    <app-modal :modalHeading="handleSuppliers.id != null ? modalHeading.edit : modalHeading.add " :cond="showingModal" @modalClose="showingModal = false">
      <form>
        <div class="form-group row">
          <label for="supplierName" class="col-sm-3 col-form-label">Supplier Name</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="handleSuppliers.name" placeholder="supplier name">
            <span v-if="validateFields.errorSupplierName" class="text-danger" v-text="validateFields.errorSupplierName"></span>
          </div>
        </div>
        <div class="form-group row">
          <label for="supplierDescription" class="col-sm-3 col-form-label">Supplier Description</label>
          <div class="col-sm-9">
            <textarea class="form-control" cols="30" rows="5" v-model="handleSuppliers.description" placeholder="supplier description"></textarea>
            <span v-if="validateFields.errorSupplierDescription" class="text-danger" v-text="validateFields.errorSupplierDescription"></span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-9 ml-auto">
          <button type="submit" class="btn btn-primary" @click.prevent="handleSuppliers.id != null ? updateSupplier() : addNewSupplier()">{{handleSuppliers.id != null ? 'Update' : 'Save' }}</button>
          </div>
        </div>
      </form>
    </app-modal>
    <app-modal :modalHeading="modalHeading.delete" :cond="showingDeleteModal" @modalClose="showingDeleteModal = false">
      <h2>
        You are going to delete the supplier `{{ handleSuppliers.name }}`
      </h2>
      <button type="button" class="btn btn-danger mr-1" @click.prevent="deleteSupplier()">Yes</button>
      <button type="button" class="btn btn-info" @click="showingDeleteModal = false">No</button>
    </app-modal>
    <div class="d-flex justify-content-between mt-3 mb-1">
      <h1 class="h3">Suppliers</h1>
      <button class="btn btn-primary btn-sm" @click="showingModal = true; handleSuppliers = {}">Add new</button>
    </div>
    <app-alert-success :alertHeading="alertHeading" :cond="showingAlertSuccess" @alertClose="showingAlertSuccess = false"/>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sup in suppliers" :key="sup.id">
            <td>{{ sup.id }}</td>
            <td>{{ sup.name }}</td>
            <td>{{ sup.description }}</td>
            <td>
              <button class="btn btn-sm btn-warning mr-1" @click="showingModal = true; handleSuppliers = sup">Edit</button>
              <button class="btn btn-sm btn-danger" @click="showingDeleteModal = true; handleSuppliers = sup">Delete</button>
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
  name: 'Suppliers',
  components: {
    'app-alert-success': AlertSuccess
  },
  data () {
    return {
      showingAlertSuccess: false,
      showingDeleteModal: false,
      showingModal: false,
      modalHeading: {
        add: 'Add new supplier',
        edit: 'Edit supplier',
        delete: 'Are you sure?'
      },
      alertSuccess: {
        created: 'Create supplier success',
        updated: 'Update supplier success',
        deleted: 'Delete supplier success'
      },
      alertHeading: '',
      handleSuppliers: {},
      suppliers: [],
      validateFields: {
        errorSupplierName: '',
        errorSupplierDescription: ''
      }
    }
  },
  methods: {
    checkForm () {
      this.validateFields.errorSupplierName = this.handleSuppliers.name ? '' : 'Please enter supplier name!'
      this.validateFields.errorSupplierDescription = this.handleSuppliers.description ? '' : 'Please enter supplier description!'
      return this.handleSuppliers.name && this.handleSuppliers.description
    },
    init () {
      this.$eventBus.$emit('loadingStatus', true)
      this.$axios.get('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/suppliers').then(res => {
        this.suppliers = res.data
        this.$eventBus.$emit('loadingStatus', false)
      })
    },
    addNewSupplier () {
      if (this.checkForm()) {
        this.$eventBus.$emit('loadingStatus', true)
        this.$axios.post('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/suppliers', this.handleSuppliers).then(res => {
          this.$eventBus.$emit('loadingStatus', false)
          console.log(res)
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
    updateSupplier () {
      if (this.checkForm()) {
        this.$eventBus.$emit('loadingStatus', true)
        this.$axios.put('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/suppliers/' + this.handleSuppliers.id, this.handleSuppliers).then(res => {
          this.$eventBus.$emit('loadingStatus', false)
          if (res.statusText === 'OK') {
            this.showingModal = false
            this.showingAlertSuccess = true
            this.alertHeading = this.alertSuccess.updated
            this.handleSuppliers = {}
            let ob = this
            setTimeout(function () {
              ob.showingAlertSuccess = false
            }, 3000)
          }
        })
      }
    },
    deleteSupplier () {
      this.$eventBus.$emit('loadingStatus', true)
      this.$axios.delete('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/suppliers/' + this.handleSuppliers.id).then(res => {
        this.$eventBus.$emit('loadingStatus', false)
        if (res.statusText === 'OK') {
          this.showingDeleteModal = false
          this.showingAlertSuccess = true
          this.alertHeading = this.alertSuccess.deleted
          this.handleSuppliers = {}
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
