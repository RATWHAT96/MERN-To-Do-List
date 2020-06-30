import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const intitalState = {};

//const middleware = [thunk];

const store = createStore(rootReducer, intitalState, compose(
    applyMiddleware(thunk)
));



export default store;

