import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {reduxReactRouter, ReduxRouter} from 'redux-router'
import {devTools} from 'redux-devtools';
import createHistory from 'history/lib/createBrowserHistory'
import routes from '../routes'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

function configureStore(initState) {

  const finalCreateStore = compose(
    applyMiddleware(thunk),
    reduxReactRouter({
      routes,
      createHistory,
    }),
    //applyMiddleware(createLogger()),
    devTools()
  )(createStore)

  const store = finalCreateStore(rootReducer, initState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store
}

export default configureStore
