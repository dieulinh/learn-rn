import { GET_EVENTS_SUCCESS } from './types';

import { getEventsApi } from '../apis/event_apis';
import { getPostsApi } from '../apis/post_apis';

export const getEvents = (params, callback) => dispatch => {
  getPostsApi(params).then(response => {
    if (response.status === 200) {
      let events = response.data;
      let payload = {
        events: events,
        page: params.page
      }
      dispatch({type: GET_EVENTS_SUCCESS, payload: payload});
    }
    if (callback) {
      callback();
    }
  })
  .catch(error => {
    console.log(error)
  })
}