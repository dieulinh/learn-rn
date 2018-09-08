import { BASE_URL } from './base';
import {
  GET_POSTS_SUCCESS
} from '../actions/types';

import axios from 'axios';

export const getPostsApi = (params) => {
  return axios.get(`${BASE_URL}/api/v1/posts`, {params: params}).then((response) => response.data);
}
