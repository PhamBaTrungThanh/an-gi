export default {
  clearUser(state) {
    state.user = {
      name: '',
      type: ''
    }
  },
  setUser(state, user) {
    state.user = user
  },
  setUserAsGuest(state) {
    state.user = {
      name: 'Guest',
      type: 'guest'
    }
  },
  setCredentialsState(state, { access_token, refresh_token }) {
    state.credentials = {
      accessToken: access_token,
      refreshToken: refresh_token
    }
  },
  clearPipeline(state) {
    state.pipeline = []
  },
  pushToPipeline(state, action) {
    state.pipeline.push(action)
  }
}
