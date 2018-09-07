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

  // let token = 'EAAdxOZCAAs28BACZAPWpbKZAQ59W79SOY02CemMsEHecK5eY4b43XGWOwM1g2jCqCbsVZC71o8c87hRsEzjIdlAECAs8sKHXFySvxFgbk2YH5RNxZAS7yhkGKVrHHFcMYZCM2UYjZCzvANFXYlu6x5sOTdde6w1WJyr0bGAzYEEamXVRz3tuALQt35JZBbAKdyZAUpqZAt5qfPaAZDZD';

  if (type == 'success') {
    oauthLoginApi('facebook', token).then((loginResultAction) =>{
      dispatch(loginResultAction);
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
