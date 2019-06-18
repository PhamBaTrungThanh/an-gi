import UsersDB from '@/firebase/users-db'

/**
 * Create new user from firebase auth user infos
 */
// eslint-disable-next-line
export const createNewUserFromFirebaseAuthUser = async firebaseAuthUser => {
  const providerData = firebaseAuthUser.providerData[0]
  const { displayName, photoURL, email } = providerData
  const userDb = new UsersDB()
  const user = {
    displayName,
    photoURL,
    email
  }

  return await userDb.create(user, firebaseAuthUser.uid)
}

export const localStorageAvailable = () => {
  const test = 'test'
  try {
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

export function innerGetCurrentGeoLocation(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      ({ code, message }) =>
        reject(
          Object.assign(new Error(message), {
            name: 'PositionError',
            code
          })
        ),
      options
    )
  })
}

export async function getCurrentGeolocation() {
  try {
    const geolocation = await innerGetCurrentGeoLocation({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
    geolocation.status = 'success'
    return geolocation
  } catch (e) {
    if (e.name == 'PositionError') {
      console.log(e.message + '. code = ' + e.code)
      return {
        status: 'geolocation_not_available'
      }
    }
  }
}
