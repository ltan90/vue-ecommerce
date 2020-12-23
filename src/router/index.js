import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login'
import Admin from '@/components/pages/admin/Admin'
import Dashboard from '@/components/pages/admin/Dashboard'
import Categories from '@/components/pages/admin/Categories'
import Suppliers from '@/components/pages/admin/Suppliers'
import Products from '@/components/pages/admin/Products'
import Orders from '@/components/pages/admin/Orders'
import Shop from '@/components/pages/shop/Shop'
import ShopProducts from '@/components/pages/shop/ShopProducts'
import ShopDetailProduct from '@/components/pages/shop/ShopDetailProduct'
import Checkout from '@/components/pages/shop/Checkout'

Vue.use(Router)

const router = new Router({
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
      component: Admin,
      children: [
        {
          path: '/',
          name: 'Admin.Dashboard',
          component: Dashboard
        },
        {
          path: 'categories',
          name: 'Amin.Categories',
          component: Categories
        },
        {
          path: 'suppliers',
          name: 'Amin.Suppliers',
          component: Suppliers
        },
        {
          path: 'products',
          name: 'Amin.Products',
          component: Products
        },
        {
          path: 'orders',
          name: 'Amin.Orders',
          component: Orders
        }
      ]
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop,
      redirect: {path: '/shop/products'},
      children: [
        {
          path: 'products',
          name: 'Shop.ShopProducts',
          component: ShopProducts
        },
        {
          path: 'products/:id',
          name: 'Shop.ShopDetailProduct',
          component: ShopDetailProduct
        },
        {
          path: 'checkout',
          name: 'Shop.Checkout',
          component: Checkout
        }
      ]
    }
  ],
  mode: 'history'
})
export default router
