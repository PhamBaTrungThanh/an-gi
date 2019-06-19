export default {
  currentDish(state, getters) {
    if (
      getters.currentDishIndexInPool === false ||
      getters.currentDishIndexInPool === -1
    ) {
      return false
    }

    return state.dishPool[getters.currentDishIndexInPool]
  },
  currentDishIndexInPool(state) {
    if (state.currentDishId === false) {
      return false
    }
    if (state.dishPool.length === 0) {
      return false
    }
    if (state.dishPool.length === 1) {
      return 0
    }
    const dishIndex = state.dishPool.findIndex(
      d => d.id === state.currentDishId
    )
    return dishIndex
  }
}
