// import {createStore, applyMiddleware, compose} from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './Reducer/index';

// const initialState={};

// const middleWare=[thunk];

// const store= createStore(rootReducer, initialState, compose(
//     applyMiddleware(...middleWare),
//     )
// );

// export default store;

import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./Reducer";
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {key: 'root', storage: storage,};
const persistedReducer = persistReducer(persistConfig, reducers);
const store= createStore(persistedReducer, {}, applyMiddleware(reduxThunk));
const persistor = persistStore(store);
export {store, persistor}