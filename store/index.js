import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from "../reducers/index";
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'dev',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer);
const persistor = persistStore(store)

console.log({ store, persistor, 'test': true })

export { store, persistor }