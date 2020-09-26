import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  Keyboard,
  StyleSheet,
  CheckBox,
  Alert,
  AsyncStorage,
} from 'react-native';
import images from '../Assets';
import AppTextInput from '../../Component/AppTextInput/AppTextInput';
import Spacer from '../../Component/AppSpacer/AppSpacer';
import {Controller, useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {navigateToClearStack} from '../../Navigation/NavigationService';

export default function LoginScreen(props) {
  const dispatch = useDispatch();
  const {errors, handleSubmit, control, reset} = useForm();
  const [isSelected, setSelection] = useState(false);
  const [isSelected1, setSelection1] = useState(false);

  const onSubmit = async data => {
    Keyboard.dismiss();
    console.log(data);
    if (isSelected1) {
      try {
        const value = await AsyncStorage.removeItem('@USER_KEY');
        dispatch({type: 'CLEAR_LOGIN', payload: []});
        console.log('Value', value);
      } catch (e) {
        // saving error
        console.log('error ', e);
      }
      let body = {
        username: data.username,
        password: data.password,
        url: data.url + '.fiiviq.com',
        multiple_user_login: {
          app_version: '1.0',
          device_model: 'SM-N750',
          device_name: 'samsung',
          device_token: 'asdasdasd',
          device_type: 'android',
          device_uid: '5fd489c904abbaee',
          device_version: '5.1.1',
        },
      };
      let result = await readAPIDATA(body);
      if (result.code == 200) {
        Alert.alert('Message', result.message);
        if (isSelected) {
          try {
            await AsyncStorage.setItem(
              '@USER_KEY',
              JSON.stringify(result.data),
            );
          } catch (e) {
            // saving error
            console.log('error ', e);
          }
        }
        dispatch({
          type: 'USER_LOGIN',
          payload: [result.data.Users.id, result.data],
        });
        navigateToClearStack('MyProfile');
      }
    } else {
      Alert.alert('Warning', 'Please Accept Terms & Condition');
    }
  };

  const readAPIDATA = async body => {
    try {
      const response = await fetch(
        `https://devapi.fiiviq.com/users/commonlogin.json`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(body),
        },
      );
      const result = await response.json();
      console.log(result);

      return result;
    } catch (e) {
      console.log(url, e);
      return {code: 500};
    }
  };

  return (
    <>
      <View style={{height: '30%', width: '100%'}}>
        <Image
          source={images.app_icon}
          style={{height: '100%', width: '100%'}}
          resizeMode={'stretch'}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '50%',
            borderBottomWidth: 3,
            borderBottomColor: '#15ddf1',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 22,
              textAlign: 'center',
              padding: 2,
            }}>
            Login
          </Text>
        </View>
      </View>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Spacer size={20} />
        <Controller
          render={localprops => (
            <AppTextInput
              {...localprops}
              onChangeText={text => localprops.onChange(text)}
              text={'fiiviq.com'}
              source={images.workshp}
            />
          )}
          control={control}
          name="url"
          rules={{
            required: {value: true, message: 'URL is required'},
            minLength: {value: 5, message: 'URL is too short'},
          }}
          defaultValue=""
        />
        {errors.url && (
          <Text style={styles.textStyle}>{errors.url.message}</Text>
        )}
        <Spacer size={20} />
        <Controller
          render={localprops => (
            <AppTextInput
              {...localprops}
              onChangeText={text => localprops.onChange(text)}
              source={images.user}
            />
          )}
          control={control}
          name="username"
          rules={{
            required: {value: true, message: 'Username is required'},
            pattern: {
              value: /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
              message: 'Username is invalid',
            },
          }}
          defaultValue=""
        />
        {errors.username && (
          <Text style={styles.textStyle}>{errors.username.message}</Text>
        )}
        <Spacer size={20} />
        <Controller
          render={localprops => (
            <AppTextInput
              {...localprops}
              secureTextEntry={true}
              onChangeText={text => localprops.onChange(text)}
              source={images.password}
            />
          )}
          control={control}
          name="password"
          rules={{
            required: {value: true, message: 'Password is required'},
            minLength: {value: 8, message: 'Pasword is too short'},
          }}
          defaultValue=""
        />
        {errors.password && (
          <Text style={styles.textStyle}>{errors.password.message}</Text>
        )}
        <Spacer />
        <View style={styles.checkboxContainer}>
          <CheckBox value={isSelected} onValueChange={setSelection} />
          <Text style={styles.label}>Remember me?</Text>
        </View>
        <Spacer size={5} />
        <View style={styles.checkboxContainer}>
          <CheckBox value={isSelected1} onValueChange={setSelection1} />
          <Text style={styles.label}>I accept the Terms and Condition</Text>
        </View>
        <Spacer size={20} />
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{
            backgroundColor: '#2991B8',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Text style={{fontWeight: 'bold', color: 'white', padding: 15}}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    color: 'red',
  },
  checkboxContainer: {
    flexDirection: 'row',
    // marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    margin: 8,
  },
});
