import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../app/hook';
import {authAction} from '../feature/auth/slice/authSlice';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const loggedIn = useAppSelector(s => s.auth.loggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authAction.checkAuthState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loggedIn === null) {
    return <></>;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {loggedIn ? (
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
      ) : (
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
