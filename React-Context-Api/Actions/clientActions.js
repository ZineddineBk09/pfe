export const SET_CLIENT_SESSION = 'SET_CLIENT_SESSION'
export const REMOVE_CLIENT_SESSION = 'REMOVE_CLIENT_SESSION'

export const setClientSession = function (session) {
  return {
    type: SET_CLIENT_SESSION,
    payload: session,
  }
}

export const removeClientSession = function () {
  return {
    type: REMOVE_CLIENT_SESSION,
  }
}

