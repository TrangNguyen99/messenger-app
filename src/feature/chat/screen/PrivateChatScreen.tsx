import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {unwrapResult} from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {useAppDispatch, useAppSelector} from '../../../app/hook';
import SizedBox from '../../../component/util/SizedBox';
import {MainParamList} from '../../../navigation/type';
import {fontPixel, heightPixel, widthPixel} from '../../../scale/scale';
import {
  BlueBackIcon,
  DefaultAvatarIcon,
  SendMessageIcon,
} from '../../../svg/common';
import {chatAction} from '../slice/chatSlice';
import MessageComponent from './PrivateChatScreenComponent/MessageComponent';

const Container = styled(SafeAreaView)`
  background: #fff;
  flex: 1;
`;

const ContentContainer = styled.View`
  background: #fff;
  flex: 1;
`;

const Header = styled.View`
  align-items: center;
  background: #fff;
  flex-direction: row;
  padding: ${heightPixel(8)}px ${widthPixel(12)}px;
`;

const TextName = styled.Text`
  color: #000;
  font-size: ${fontPixel(16)}px;
  font-weight: bold;
`;

const ChatInputContainer = styled.View`
  align-items: center;
  flex-direction: row;
  padding: ${heightPixel(8)}px ${widthPixel(12)}px;
`;

const TextInputContainer = styled.View`
  background: #f5f5f5;
  border-radius: ${widthPixel(20)}px;
  flex: 1;
  padding: ${heightPixel(8)}px ${widthPixel(20)}px;
`;

const TextInput = styled.TextInput`
  color: #000;
  font-size: ${fontPixel(18)}px;
  padding: 0;
`;

type Props = NativeStackScreenProps<MainParamList, 'PrivateChatScreen'>;

const PrivateChatScreen = ({navigation, route}: Props) => {
  const conversationId = useAppSelector(s => s.chat.focusConversationId);
  const messages = useAppSelector(s => s.chat.messages);

  const [text, setText] = useState('');

  const dispatch = useAppDispatch();

  const sendMessage = async () => {
    const resultAction = await dispatch(
      chatAction.createMessage({
        conversationId,
        text,
        partnerId: route.params.partnerId,
        partnerName: route.params.name,
      }),
    );
    const result = unwrapResult(resultAction);
    if (result.type === 'success') {
      setText('');
    } else {
      Alert.alert('Thông báo', 'Error: ' + result.message);
    }
  };

  useEffect(() => {
    if (route.params.conversationId) {
      dispatch(
        chatAction.joinConversation({
          conversationId: route.params.conversationId,
        }),
      );
    } else {
      dispatch(
        chatAction.createPrivateConversation({
          partnerId: route.params.partnerId,
        }),
      );
    }

    return () => {
      dispatch(chatAction.leaveConversation());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      if (conversationId) {
        await dispatch(chatAction.getMessages({conversationId}));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  return (
    <Container>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ContentContainer>
        <Header style={styles.shadow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BlueBackIcon height={widthPixel(20)} width={widthPixel(20)} />
          </TouchableOpacity>
          <SizedBox width={widthPixel(10)} />
          <DefaultAvatarIcon height={widthPixel(40)} width={widthPixel(40)} />
          <SizedBox width={widthPixel(10)} />
          <TextName>{route.params.name}</TextName>
        </Header>
        <FlatList
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <MessageComponent senderId={item.senderId} text={item.text} />
          )}
          inverted={true}
          showsVerticalScrollIndicator={false}
        />
        <ChatInputContainer>
          <TextInputContainer>
            <TextInput
              placeholder="Aa"
              value={text}
              onChangeText={v => setText(v)}
            />
          </TextInputContainer>
          <SizedBox width={widthPixel(15)} />
          <TouchableOpacity onPress={sendMessage}>
            <SendMessageIcon height={widthPixel(25)} width={widthPixel(25)} />
          </TouchableOpacity>
        </ChatInputContainer>
      </ContentContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default PrivateChatScreen;
