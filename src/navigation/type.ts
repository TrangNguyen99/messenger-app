import {NavigatorScreenParams} from '@react-navigation/native';

export type BottomTabParamList = {
  HomeScreen: undefined;
  StoryScreen: undefined;
};

export type MainParamList = {
  BottomTabNavigator: NavigatorScreenParams<BottomTabParamList>;
  AccountScreen: undefined;
  SearchScreen: undefined;
  PrivateChatScreen: {partnerId: string; name: string; conversationId?: string};
};

export type AuthParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};
