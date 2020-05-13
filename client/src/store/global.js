import { combineReducers } from 'redux';
import Reducers from '../reducers';

const appReducer = combineReducers({
  ...Reducers,
});

export default appReducer;
