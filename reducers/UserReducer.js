import {
  GET_USERS_SUCCESS
} from '../actions/types';

import { uniqBy } from 'lodash';

export default (state = {}, action) => {
action
  switch (action.type) {
    case GET_USERS_SUCCESS:
      let { page, keyword } = action.payload;

      // append users
      let users = page == 1 ? action.payload.users : [...state.users, ...action.payload.users];
      users = uniqBy(users, (user) => user.id);

      return {
        ...state,
        ...action.payload,
        users: users
      };
    default:
      return state;

  }
}
