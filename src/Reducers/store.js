import {createStore} from 'redux';
import appReducer from './rootReducers';

const store = createStore(appReducer);

export default store;
