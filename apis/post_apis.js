import BaseApi from './BaseApi';
import {
  GET_POSTS_SUCCESS
} from '../actions/types';

import axios from 'axios';

export const getPostsApi = (params) => {
  return axios.get(`${BaseApi.baseUrl}/api/v1/posts`, {params: params}).then((response) => response.data);
}
