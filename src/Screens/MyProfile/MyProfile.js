import React, {useState} from 'react';
import {Text, View, Image, AsyncStorage,TouchableOpacity} from 'react-native';
import Spacer from '../../Component/AppSpacer/AppSpacer';
import images from '../Assets';
import {useSelector, useDispatch} from 'react-redux';
import { navigateToClearStack } from '../../Navigation/NavigationService';

export default function MyProfile(props) {
  const userData = useSelector(state => state.profile);
  const uData = Object.values(userData)[0];

  const handleLogout = async () => {
    try {
      const value = await AsyncStorage.removeItem('@USER_KEY');
      navigateToClearStack('LoginScreen');
    } catch (e) {
      // saving error
      console.log('error ', e);
    }
  };

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Spacer />
      <View
        style={{
          height: 130,
          width: '94%',
          backgroundColor: '#FFF',
          borderRadius: 5,
          flexDirection: 'row',
          elevation: 5,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            overflow: 'hidden',
            margin: 10,
            height: 90,
            width: 90,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: '#15ddf1',
          }}>
          <Image
            source={images.app_icon}
            style={{height: null, width: null, flex: 1}}
          />
        </View>
        <Text style={{fontSize: 22, fontWeight: 'bold', marginLeft: 10}}>
          {uData.Users.firstname} {uData.Users.lastname}
        </Text>
      </View>
      <Spacer />
      <View
        style={{
          height: 175,
          width: '94%',
          elevation: 5,
          backgroundColor: '#FFF',
          borderRadius: 5,
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 18,
            marginLeft: 40,
            marginTop: 20,
            marginBottom: 10,
          }}>
          Address
        </Text>
        <Text style={{marginLeft: 40, marginTop: -5, width: 250}}>
          {uData.Users.street_address}{' '}
        </Text>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 18,
            marginLeft: 40,
            marginTop: 20,
            marginBottom: 10,
          }}>
          Contact
        </Text>
        <Text style={{marginLeft: 40, marginTop: -5}}>
          {uData.Users.phone_number}
        </Text>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Text
          style={{
            marginVertical: 10,
            padding: 10,
            borderWidth: 0.5,
            borderColor: '#636363',
            width: '90%',
            alignSelf: 'center',
            textAlign: 'center',
            backgroundColor: '#15ddf1',
            color: '#fff',
            borderRadius: 10,
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
