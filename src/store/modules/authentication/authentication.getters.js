export default {
  isUserAuthenticated: state => !state.user.type === 'guest',
  getAccessToken: state =>
    state.credentials.accessToken ? state.credentials.accessToken : ''
}
