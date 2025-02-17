import router from '@/router'
import isNil from 'lodash/isNil'
import { PASSPORT_REQUEST_CREDENTIALS } from '@/API/authentication'
// import { createNewUserFromFirebaseAuthUser } from '@/misc/helpers'
// import UsersDB from '@/firebase/users-db'

export default {
  // /**
  //  * Callback fired when user login
  //  */
  // login: async ({ commit }, firebaseAuthUser) => {
  //   const userFromFirebase = await new UsersDB().read(firebaseAuthUser.uid)

  //   const user = isNil(userFromFirebase)
  //     ? await createNewUserFromFirebaseAuthUser(firebaseAuthUser)
  //     : userFromFirebase

  //   commit('setUser', user)
  // },

  /**
   * Callback fired when user logout
   */
  logout: async ({ commit, state, dispatch }, firebaseUser) => {
    if (isNil(firebaseUser)) {
      const guestCredentials = await PASSPORT_REQUEST_CREDENTIALS(
        state.guestCredentials
      )
      dispatch('setCredentials', guestCredentials)
      commit('setUserAsGuest')
    }
    const currentRouter = router.app.$route
    if (!(currentRouter.meta && currentRouter.meta.authNotRequired)) {
      router.push('/login')
    }
  },
  setCredentials({ commit, state, dispatch }, credentials) {
    commit('setCredentialsState', credentials)
    if (state.pipeline.length > 0) {
      for (const pipeline of state.pipeline) {
        dispatch(pipeline, null, {
          root: true
        })
      }
      commit('clearPipeline')
    }
  }
}
