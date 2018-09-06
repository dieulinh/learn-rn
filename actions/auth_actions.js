import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { oauthLoginApi } from '../apis/auth_apis'

export const facebookLogin = () => async dispatch => {
  // const { type, token } = await Facebook.logInWithReadPermissionsAsync('2094827080561519', {
  //   permissions: ['public_profile', 'email']
  // });

  let token = 'EAAdxOZCAAs28BACZAPWpbKZAQ59W79SOY02CemMsEHecK5eY4b43XGWOwM1g2jCqCbsVZC71o8c87hRsEzjIdlAECAs8sKHXFySvxFgbk2YH5RNxZAS7yhkGKVrHHFcMYZCM2UYjZCzvANFXYlu6x5sOTdde6w1WJyr0bGAzYEEamXVRz3tuALQt35JZBbAKdyZAUpqZAt5qfPaAZDZD';

  if (token) {

    oauthLoginApi('facebook', token).then((actionParams) =>{
      dispatch(actionParams);
    });

  }
};
