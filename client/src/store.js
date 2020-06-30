import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const intitalState = {};

const middleware = [thunk];

const composeEnhancers = compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose(applyMiddleware(...middleware));
const store = createStore(rootReducer, initialState, composeEnhancers); 

/*
const store = createStore(rootReducer, intitalState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
*/

export default store;

