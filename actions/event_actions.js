import {
  GET_EVENTS_SUCCESS
} from './types';

import { getEventsApi } from '../apis/event_apis'

export const getEvents = (params, callback) => (dispatch) => {
  getEventsApi(params).then(response => {

    if (response.status == 200) {
      let events = response.data;

      // mark ended
      let is_end = events && (events.length == 0 || events.length < params.per_page)

      let payload = {
        events: events,
        page: params.page,
        is_end: is_end,
        keyword: params.keyword
      }

      dispatch({ type: GET_EVENTS_SUCCESS, payload: payload })
    }

    if (callback) {
      callback();
    }
  })
}