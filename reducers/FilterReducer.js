import {
  FILTER_PERSONAL_CONTACT_CHANGED
} from '../actions/types';

export default (state = {}, action) => {

  switch (action.type) {
    case FILTER_PERSONAL_CONTACT_CHANGED: 
      return  {
        gender: "male",
        age: 10
      }

    default:
      return state;
      
  }
}
  