
import {createStore, AnyAction, Store, combineReducers} from 'redux';
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import { reducer } from './reducers';
import { RootState } from './reducers';

// create a makeStore function
const makeStore = (context: Context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});