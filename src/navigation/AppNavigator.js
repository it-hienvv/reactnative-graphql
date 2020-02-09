import React, {useEffect, useState, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DrawerNavigator from './DrawerNavigator';
import AuthStackNavigator from './AuthNavigator';
import SplashScreen from '../screens/Splash';
import OnBoardingScreen from '../screens/OnBoarding';

import {CTX} from '../tools/context';

const Stack = createStackNavigator();

export default function AppStackNavigator() {
  const [loading, setLoading] = useState(true);

  const skipContext = useContext(CTX);
  const {skip} = skipContext;

  const authContext = useContext(CTX);
  const {token} = authContext;

  // console.log(loading, skip, token);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      headerMode="none"
      screenOptions={{
        animationTypeForReplace: 'push',
      }}>
      {loading ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : !skip ? (
        <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
      ) : !token ? (
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
      ) : (
        <Stack.Screen name="Dashboard" component={DrawerNavigator} />
      )}
    </Stack.Navigator>
  );
}
