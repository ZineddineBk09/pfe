export const SET_RIDER_SESSION = 'SET_RIDER_SESSION'
export const REMOVE_RIDER_SESSION = 'REMOVE_RIDER_SESSION'


export const setRiderSession = function (session) {
  return {
    type: SET_RIDER_SESSION,
    payload: session,
  }
}

export const removeRiderSession = function () {
  return {
    type: REMOVE_RIDER_SESSION,
  }
}
