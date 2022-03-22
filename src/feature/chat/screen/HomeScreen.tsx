import notifee, {EventType} from '@notifee/react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {useAppDispatch, useAppSelector} from '../../../app/hook';
import SizedBox from '../../../component/util/SizedBox';
import {BottomTabParamList} from '../../../navigation/type';
import {fontPixel, heightPixel, widthPixel} from '../../../scale/scale';
import {SearchIcon} from '../../../svg/common';
import {chatAction} from '../slice/chatSlice';
import ConversationButton from './HomeScreenComponent/ConversationButton';

const Container = styled(SafeAreaView)`
  background: #fff;
  flex: 1;
`;

const ContentContainer = styled.View`
  background: #fff;
  flex: 1;
`;

const SearchButton = styled.TouchableOpacity`
  align-items: center;
  background: #f5f5f5;
  border-radius: ${widthPixel(20)}px;
  flex-direction: row;
  margin: 0 ${widthPixel(20)}px;
  padding: ${heightPixel(8)}px ${widthPixel(16)}px;
`;

const TextSearchButton = styled.Text`
  color: #757575;
  font-size: ${fontPixel(16)}px;
`;

type Props = BottomTabScreenProps<BottomTabParamList, 'HomeScreen'>;

const HomeScreen = ({navigation}: Props) => {
  const conversations = useAppSelector(s => s.chat.conversations);
  const focusConversationId = useAppSelector(s => s.chat.focusConversationId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(chatAction.getConversations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.PRESS:
          if (focusConversationId) {
            dispatch(
              chatAction.joinConversation({
                conversationId: detail.notification?.data?.conversationId,
              }),
            );
          } else {
            navigation.dispatch(
              CommonActions.navigate(
                'PrivateChatScreen',
                detail.notification?.data,
              ),
            );
          }
          break;
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ContentContainer>
        <FlatList
          data={conversations}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={
            <SearchButton
              onPress={() =>
                navigation.dispatch(CommonActions.navigate('SearchScreen'))
              }>
              <SearchIcon height={widthPixel(15)} width={widthPixel(15)} />
              <SizedBox width={widthPixel(10)} />
              <TextSearchButton>Tìm kiếm</TextSearchButton>
            </SearchButton>
          }
          renderItem={({item}) => <ConversationButton {...item} />}
        />
      </ContentContainer>
    </Container>
  );
};

export default HomeScreen;
