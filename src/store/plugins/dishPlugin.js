export default function dishPlugin() {
  return store => {
    store.subscribe(mutation => {
      if (mutation.type === 'route/ROUTE_CHANGED') {
        const { to } = mutation.payload

        if ('dishEvent' in to.meta) {
          if (to.name === 'search') {
            store.dispatch('dishes/queryDishes', to.params.query)
          } else if (to.name === 'dish') {
            store.dispatch('dishes/querySingleDish', to.params.id)
          }
        }
      }
    })
  }
}
