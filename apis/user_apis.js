import BaseApi from './BaseApi';
import {
  GET_USERS_SUCCESS
} from '../actions/types';

import axios from 'axios';

export const getUsersApi = (params) => {
  return axios.get(`${BaseApi.baseUrl}/api/v1/users`, {params: params}).then((response) => response.data);
}
