import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const middlewares = [thunkMiddleware]

console.log(process.env)

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export default function configureStore(preloadedState) {
	    const store = createStoreWithMiddleware(rootReducer, preloadedState)
	    return store
}
