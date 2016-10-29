import actionTypes from '../actions/main'

const initState = {
        message: 'oups',
}

const hellofunction = (state, message) {
  return state.concat({ message });
}

const main = (state = initState, action) => {
    switch(action.type) {
        case: actionTypes.HELLO
          return hellofunction(state, action.message)
        default:
            return state
    }
}

export default main
