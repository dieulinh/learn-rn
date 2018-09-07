import {
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actions/types';

export default (state = {}, action) => {

  switch (action.type) {
    case LOGIN_SUCCESS:
      let user = action.payload;

      return {
        app_token: user.token,
        current_user: user
      };
    case LOGIN_FAIL:

      return {
        app_token: null,
        current_user: null
      };
    default:
      return state;

  }
}
