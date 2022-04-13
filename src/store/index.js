import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      isCollapse: true,
    }
  },
  mutations: {
    collapseStatus (state) {
      state.isCollapse = !state.isCollapse
    }
  }
})

export default store

