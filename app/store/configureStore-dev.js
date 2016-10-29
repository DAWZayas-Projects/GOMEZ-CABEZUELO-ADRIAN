import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import DevTools from '../containers/DevTools'
import { persistState } from 'redux-devtools';

const middlewares = [thunkMiddleware]

console.log(process.env)

const enhancer = compose(
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

middlewares.push(createLogger());


const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export default function configureStore(preloadedState) {
	    const store = createStoreWithMiddleware(rootReducer, preloadedState, enhancer)
	    return store
}
