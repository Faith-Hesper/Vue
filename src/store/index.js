import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      collapseStatus: true,
      map: {}
    }
  },
  mutations: {
    collapseStatusChange (state) {
      state.collapseStatus = !state.collapseStatus
    },
    mapChange(state, map) {
      state.map = map
    }
  }
})

export default store

