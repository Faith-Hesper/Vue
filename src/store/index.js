import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      collapseStatus: true,
    }
  },
  mutations: {
    collapseStatusChange (state) {
      state.collapseStatus = !state.collapseStatus
    }
  }
})

export default store

