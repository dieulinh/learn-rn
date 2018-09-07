import { BASE_URL } from './base';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actions/types';

import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const oauthLoginApi = (provider, token) => {
  return axios.post(`${BASE_URL}/api/v1/auth/login`, {
    provider: provider,
    token: token
  }).then((response) => {
    json = response.data

    if (json && json.status == 200) {
      const user = json.data;

      let appToken = user.token;

      axios.defaults.headers.common['X-Api-Token'] = appToken;

      AsyncStorage.setItem("app_token", appToken);

      return { type: LOGIN_SUCCESS, payload: user };
    } else {
      return { type: LOGIN_FAIL, payload: json };
    }

  });
};

export const currentUserInfoApi = async () => {
  let appToken = await AsyncStorage.getItem("app_token");
  axios.defaults.headers.common['X-Api-Token'] = appToken;
  return axios.get(`${BASE_URL}/api/v1/users/current_profile`).then((response) => response.data);
}

