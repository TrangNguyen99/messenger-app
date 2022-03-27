import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../feature/chat/screen/HomeScreen';
import HomeScreenHeader from '../feature/chat/screen/HomeScreenComponent/HomeScreenHeader';
import StoryScreen from '../feature/story/screen/StoryScreen';
import {fontPixel} from '../scale/scale';
import {
  ChatTabActiveIcon,
  ChatTabIcon,
  StoryTabActiveIcon,
  StoryTabIcon,
} from '../svg/common';
import {BottomTabParamList} from './type';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: fontPixel(14),
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Đoạn chat',
          tabBarIcon: ({focused, size}) => {
            return focused ? (
              <ChatTabActiveIcon height={size} width={size} />
            ) : (
              <ChatTabIcon height={size} width={size} />
            );
          },
          header: ({options}) => {
            return <HomeScreenHeader title={`${options.title}`} />;
          },
        }}
      />
      <Tab.Screen
        name="StoryScreen"
        component={StoryScreen}
        options={{
          title: 'Danh bạ',
          tabBarIcon: ({focused, size}) => {
            return focused ? (
              <StoryTabActiveIcon height={size} width={size} />
            ) : (
              <StoryTabIcon height={size} width={size} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
