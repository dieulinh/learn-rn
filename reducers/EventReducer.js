import {
  GET_EVENTS_SUCCESS
} from '../actions/types';

export default (state = {}, action) => {
  
  switch (action.type) {
    case GET_EVENTS_SUCCESS:
      let { page } = action.payload;

      // append events
      let events = page == 1 ? action.payload.events : [...state.events, ...action.payload.events];
      return {
        ...action.payload,
        events: events
      };
    default:
      return state;
  }
}
