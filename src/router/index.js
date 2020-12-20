import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login'
import Admin from '@/components/pages/admin/Admin'
import Categories from '@/components/pages/admin/Categories'
import Suppliers from '@/components/pages/admin/Suppliers'
import Products from '@/components/pages/admin/Products'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {path: 'login'}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/admin/categories',
      name: 'Amin.Categories',
      component: Categories
    },
    {
      path: '/admin/suppliers',
      name: 'Amin.Suppliers',
      component: Suppliers
    },
    {
      path: '/admin/products',
      name: 'Amin.Products',
      component: Products
    }
  ],
  mode: 'history'
})
