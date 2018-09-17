import {
  GET_EVENTS_SUCCESS
} from '../actions/types';

import { uniqBy } from 'lodash';

export default (state = {}, action) => {
  
  switch (action.type) {
    case GET_EVENTS_SUCCESS:
      let { page } = action.payload;

      console.log("action GET_EVENT_SUCCESS", action);

      // append events
      let events = page == 1 ? action.payload.events : [...state.events, ...action.payload.events];
      events = uniqBy(events, (event) => event.id);

      return {
        ...action.payload,
        events: events
      };
    default:
      return state;

  }
}
