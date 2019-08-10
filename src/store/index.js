import {createStore,applyMiddleware,compose,combineReducers}  from 'redux'
//import {} from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
//onst store=createStore(reducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer, /* preloadedState, */
    //applyMiddleware(thunk)
    composeEnhancers(
      applyMiddleware(thunk)
    )
   //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default store;