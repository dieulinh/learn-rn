import BaseApi from './BaseApi';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actions/types';

import qs from 'qs';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const oauthLoginApi = (provider, token) => {
  return axios.post(`${BaseApi.baseUrl}/api/v1/auth/login`, {
    provider: provider,
    token: token
  }).then((response) => response.data );
};

export const currentUserInfoApi = async () => {
  let appToken = await AsyncStorage.getItem("app_token");
  axios.defaults.headers.common['X-Api-Token'] = appToken;
  
  axios.interceptors.request.use(config => {
    config.paramsSerializer = params => {
      return qs.stringify(params, {
        arrayFormat: "brackets",
        encode: false
      });
    };
  
    return config;
  });

  return axios.get(`${BaseApi.baseUrl}/api/v1/users/current_profile`).then((response) => response.data);
}

