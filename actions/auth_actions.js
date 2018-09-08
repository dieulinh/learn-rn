import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { oauthLoginApi, currentUserInfoApi } from '../apis/auth_apis'
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actions/types';

export const facebookLogin = () => async dispatch => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync('2094827080561519', {
    permissions: ['public_profile', 'email']
  });

  if (type == 'success') {
    oauthLoginApi('facebook', token).then( async (response) =>{

      console.log("response", response);

      if (response && response.status == 200) {
        const user = response.data;

        let appToken = user.token;

        await AsyncStorage.setItem("app_token", appToken);

        dispatch({ type: LOGIN_SUCCESS, payload: user });
      } else {
        dispatch({ type: LOGIN_FAIL, payload: response });
      }

    });

  } else {

    let payload = {
      message: "Login by Facebook fail."
    };

    dispatch({ type: LOGIN_FAIL, payload: payload });
  }
};

export const getCurrentUserInfo = () => async dispatch => {

  return currentUserInfoApi().then( (response) => {
    if (response.status == 200) {
      dispatch({type: LOGIN_SUCCESS, payload: response.data});
    } else {
      dispatch({type: LOGIN_FAIL, payload: response});
    }
  })
}
