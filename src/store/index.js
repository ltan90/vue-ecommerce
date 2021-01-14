import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    appName: 'Simple Ecommerce',
    carts: [],
    total: 0
  },
  getters: {
    getAppName (state) {
      return state.appName
    },
    getCarts (state) {
      return state.carts
    },
    getTotal (state) {
      if (state.carts.length === 0) return state.total
      return state.carts.map(function (index) {
        return parseFloat(index.product.price) * index.quantity
      }).reduce(function (first, index) {
        return first + index
      })
    },
    getCartLength (state, getters) {
      return getters.getCarts.length
    }
  },
  mutations: {
    addToCart (state, payload) {
      if (state.carts.length === 0) return state.carts.push(payload)
      for (let i = 0; i < state.carts.length; i++) {
        if (state.carts[i].product.id === payload.product.id) {
          state.carts[i].quantity += parseInt(payload.quantity)
          return
        }
      }
      return state.carts.push(payload)
    },
    addToQuantity (state, payload) {
      if (payload.qtyValue <= 0) {
        state.carts.pop(payload)
      } else {
        state.carts.filter(cart => {
          if (cart.product.id === payload.product.id) {
            cart.quantity += parseInt(payload.quantity)
          }
        })
      }
    },
    clearCart (state) {
      state.carts = []
    }
  }
})
export default store
