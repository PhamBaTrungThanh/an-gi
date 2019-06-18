export default {
  /* Product input name */

  setQueryingTrue(state) {
    state.isQuerying = true
  },
  setQueryingFalse(state) {
    state.isQuerying = false
  },
  setDishQuery(state, query) {
    state.currentQuery = query
  },
  resetDishPool(state) {
    state.dishPool = []
  },
  addToDishPool(state, dishes) {
    state.dishPool.push(...dishes)
  }
}
