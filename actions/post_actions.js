import {
  GET_POSTS_SUCCESS
} from '../actions/types';

import { getPostsApi } from '../apis/post_apis'

export const getPosts = (params, callback) => dispatch => {
  getPostsApi(params).then (response => {
    if (response.status == 200) {
      let posts = response.data;

      // mark ended
      is_end = posts && (posts.length == 0 || posts.length < params.per_page)

      let payload = {
        posts: posts,
        page: params.page,
        is_end: is_end
      }

      dispatch({type: GET_POSTS_SUCCESS, payload: payload})
    }

    if (callback) {
      callback();
    }
  })
}
