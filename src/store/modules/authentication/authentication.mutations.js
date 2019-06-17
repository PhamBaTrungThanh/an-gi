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
  setCredentials(state, { access_token, refresh_token }) {
    state.credentials = {
      accessToken: access_token,
      refreshToken: refresh_token
    }
  }
}
