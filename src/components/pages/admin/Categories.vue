<template>
  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
    <app-modal :modalHeading="handleCategories.id != null ? modalHeading.edit : modalHeading.add " :cond="showingModal" @modalClose="showingModal = false">
      <form>
        <div class="form-group row">
          <label for="categoryName" class="col-sm-3 col-form-label">Category Name</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="handleCategories.name" placeholder="Category name">
            <span v-if="validateFields.errorCategoryName" class="text-danger" v-text="validateFields.errorCategoryName"></span>
          </div>
        </div>
        <div class="form-group row">
          <label for="categoryDescription" class="col-sm-3 col-form-label">Category Description</label>
          <div class="col-sm-9">
            <textarea class="form-control" cols="30" rows="5" v-model="handleCategories.description" placeholder="Category description"></textarea>
            <span v-if="validateFields.errorCategoryDescription" class="text-danger" v-text="validateFields.errorCategoryDescription"></span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-9 ml-auto">
          <button type="submit" class="btn btn-primary" @click.prevent="handleCategories.id != null ? updateCategory() : addNewCategory()">{{handleCategories.id != null ? 'Update' : 'Save' }}</button>
          </div>
        </div>
      </form>
    </app-modal>
    <app-modal :modalHeading="modalHeading.delete" :cond="showingDeleteModal" @modalClose="showingDeleteModal = false">
      <h2>
        You are going to delete the category `{{ handleCategories.name }}`
      </h2>
      <button type="button" class="btn btn-danger mr-1" @click.prevent="deleteCategory()">Yes</button>
      <button type="button" class="btn btn-info" @click="showingDeleteModal = false">No</button>
    </app-modal>
    <div class="d-flex justify-content-between mt-3 mb-1">
      <h1 class="h3">Categories</h1>
      <button class="btn btn-primary btn-sm" @click="showingModal = true; handleCategories = {}">Add new</button>
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
          <tr v-for="cat in categories" :key="cat.id">
            <td>{{ cat.id }}</td>
            <td>{{ cat.name }}</td>
            <td>{{ cat.description }}</td>
            <td>
              <button class="btn btn-sm btn-warning mr-1" @click="showingModal = true; handleCategories = cat">Edit</button>
              <button class="btn btn-sm btn-danger" @click="showingDeleteModal = true; handleCategories = cat">Delete</button>
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
  name: 'Categories',
  components: {
    'app-alert-success': AlertSuccess
  },
  data () {
    return {
      showingAlertSuccess: false,
      showingDeleteModal: false,
      showingModal: false,
      modalHeading: {
        add: 'Add new category',
        edit: 'Edit category',
        delete: 'Are you sure?'
      },
      alertSuccess: {
        created: 'Create category success',
        updated: 'Update category success',
        deleted: 'Delete category success'
      },
      alertHeading: '',
      handleCategories: {},
      categories: [],
      validateFields: {
        errorCategoryName: '',
        errorCategoryDescription: ''
      }
    }
  },
  methods: {
    checkForm () {
      this.validateFields.errorCategoryName = this.handleCategories.name ? '' : 'Please enter category name!'
      this.validateFields.errorCategoryDescription = this.handleCategories.description ? '' : 'Please enter category description!'
      return this.handleCategories.name && this.handleCategories.description
    },
    init () {
      this.$eventBus.$emit('loadingStatus', true)
      this.$axios.get('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/categories').then(res => {
        this.categories = res.data
        this.$eventBus.$emit('loadingStatus', false)
      })
    },
    addNewCategory () {
      if (this.checkForm()) {
        this.$eventBus.$emit('loadingStatus', true)
        this.$axios.post('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/categories', this.handleCategories).then(res => {
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
    updateCategory () {
      if (this.checkForm()) {
        this.$eventBus.$emit('loadingStatus', true)
        this.$axios.put('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/categories/' + this.handleCategories.id, this.handleCategories).then(res => {
          this.$eventBus.$emit('loadingStatus', false)
          if (res.statusText === 'OK') {
            this.showingModal = false
            this.showingAlertSuccess = true
            this.alertHeading = this.alertSuccess.updated
            this.handleCategories = {}
            let ob = this
            setTimeout(function () {
              ob.showingAlertSuccess = false
            }, 3000)
          }
        })
      }
    },
    deleteCategory () {
      this.$eventBus.$emit('loadingStatus', true)
      this.$axios.delete('https://5de3c9b181d1f6001478a46f.mockapi.io/api/v1/categories/' + this.handleCategories.id).then(res => {
        this.$eventBus.$emit('loadingStatus', false)
        if (res.statusText === 'OK') {
          this.showingDeleteModal = false
          this.showingAlertSuccess = true
          this.alertHeading = this.alertSuccess.deleted
          this.handleCategories = {}
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
