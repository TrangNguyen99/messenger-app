import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AccountScreen from '../feature/account/screen/AccountScreen';
import PrivateChatScreen from '../feature/chat/screen/PrivateChatScreen';
import SearchScreen from '../feature/chat/screen/SearchScreen';
import BottomTabNavigator from './BottomTabNavigator';
import {MainParamList} from './type';

const Stack = createNativeStackNavigator<MainParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabNavigator">
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{title: 'Tôi', headerShadowVisible: false}}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: 'Tìm kiếm',
        }}
      />
      <Stack.Screen
        name="PrivateChatScreen"
        component={PrivateChatScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
