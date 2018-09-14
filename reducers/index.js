import { combineReducers } from 'redux';
import auth from './AuthReducer';
import post from './PostReducer';
import user from './UserReducer';
import filter from './FilterReducer';
import event from './EventReducer';

export default combineReducers({
  auth, post, user, filter, event
});
