import {
  GET_USERS_SUCCESS
} from '../actions/types';

export default (state = {}, action) => {

  switch (action.type) {
    case GET_USERS_SUCCESS:
      let { page } = action.payload;

      // append users
      let users = page == 1 ? action.payload.users : [...state.users, ...action.payload.users];

      return {
        ...action.payload,
        users: users
      };

    default:
      return state;

  }
}
