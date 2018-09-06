import { BASE_URL } from './base';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actions/types';

import axios from 'axios';

export const oauthLoginApi = (provider, token) => {
  return axios.post(`${BASE_URL}/api/v1/auth/login`, {
    provider: 'facebook',
    token: token
  }).then((response) => {

    if (response.data && response.data.status == 200) {
      user = response.data.data;
      appToken = user.token;

      return { type: LOGIN_SUCCESS, payload: user };
    } else {
      return { type: LOGIN_FAIL, payload: response.data };
    }

  });
};

