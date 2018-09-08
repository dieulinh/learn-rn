import {
  GET_POSTS_SUCCESS
} from '../actions/types';

export default (state = {}, action) => {

  switch (action.type) {
    case GET_POSTS_SUCCESS:
      let { page } = action.payload;

      // append posts
      let posts = page == 1 ? action.payload.posts : [...state.posts, ...action.payload.posts];

      return {
        ...action.payload,
        posts: posts
      };

    default:
      return state;

  }
}
