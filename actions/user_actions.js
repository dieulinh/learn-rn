import {
  GET_USERS_SUCCESS
} from '../actions/types';

import { getUsersApi } from '../apis/user_apis'

export const getUsers = (params, callback) => dispatch => {
  getUsersApi(params).then (response => {
    if (response.status == 200) {
      let users = response.data;

      // mark ended
      let is_end = users && (users.length == 0 || users.length < params.per_page)

      let payload = {
        users: users,
        page: params.page,
        is_end: is_end,
        keyword: params.keyword
      }

      dispatch({type: GET_USERS_SUCCESS, payload: payload})
    }

    if (callback) {
      callback();
    }
  })
}
