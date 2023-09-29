import {legacy_createStore as createStore , combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension';
import { ProductReducer , productDetailsReducer } from "./reducers/ProductReducers";

const reducer = combineReducers({
    products : ProductReducer,
    productDetails : productDetailsReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store