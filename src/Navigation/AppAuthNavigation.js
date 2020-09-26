import React, {useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {navigationRef} from './NavigationService';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import MyProfile from '../Screens/MyProfile/MyProfile';
import Loading from '../Screens/Loading/Loading';
import {useSelector, useDispatch} from 'react-redux';

export default function AppAuthNavigation() {
  const Auth = createStackNavigator();

  const userData = useSelector(state => state.profile);
  const uData = Object.values(userData);
  console.log({uData});

  const dispatch = useDispatch();
  const getAsyncData = async () => {
    try {
      dispatch({type: 'CLEAR_LOGIN', payload: []});
      const value = await AsyncStorage.getItem('@USER_KEY');
      const result = JSON.parse(value);
      console.log({result, value});

      if (value != null) {
        dispatch({
          type: 'USER_LOGIN',
          payload: [result.Users.id, result],
        });
      }
    } catch (e) {
      // saving error
      console.log('error ', e);
    }
  };

  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    getAsyncData();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer theme={DefaultTheme} ref={navigationRef}>
      <Auth.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
        initialRouteName={uData.length > 0 ? 'MyProfile' : 'LoginScreen'}
        headerMode={'screen'}>
        <Auth.Screen
          name={'LoginScreen'}
          options={{headerShown: false}}
          component={LoginScreen}
        />
        <Auth.Screen
          name={'MyProfile'}
          options={{headerShown: false}}
          component={MyProfile}
        />
      </Auth.Navigator>
    </NavigationContainer>
  );
}
