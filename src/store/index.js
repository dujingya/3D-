import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    },
    uncrement (state) {
      state.count--
    }
  },
  actions: {
    increment (context) {
      console.log(context, 1111111)
      context.commit('increment')
    },
    uncrement (context) {
      console.log(222222)
      context.commit('uncrement')
    }
  }
})

export default store
