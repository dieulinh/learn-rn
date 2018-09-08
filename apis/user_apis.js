import { BASE_URL } from './base';
import {
  GET_USERS_SUCCESS
} from '../actions/types';

import axios from 'axios';

export const getUsersApi = (params) => {
  return axios.get(`${BASE_URL}/api/v1/users`, {params: params}).then((response) => response.data);
}
