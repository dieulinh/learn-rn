import BaseApi from './BaseApi';
import axios from 'axios';

export const getEventsApi = (params) => {
  return axios.get(`${BaseApi.baseUrl}/api/v1/events`, {params: params}).then((response) => response.data);
}
