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
import Avatar from '../../../component/common/Avatar';
import FlexView from '../../../component/util/FlexView';
import SizedBox from '../../../component/util/SizedBox';
import {MainParamList} from '../../../navigation/type';
import {fontPixel, heightPixel, widthPixel} from '../../../scale/scale';
import {BlueBackIcon, SendMessageIcon} from '../../../svg/common';
import {chatAction} from '../slice/chatSlice';
import MessageComponent from './PrivateChatScreenComponent/MessageComponent';

const Container = styled(SafeAreaView)`
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

const TextInput = styled.TextInput`
  color: #000;
  font-size: ${fontPixel(18)}px;
  padding: 0;
`;

type Props = NativeStackScreenProps<MainParamList, 'PrivateChatScreen'>;

const PrivateChatScreen = ({navigation, route}: Props) => {
  const conversationId = useAppSelector(s => s.chat.focusConversationId);
  const partner = useAppSelector(s => s.chat.partner);
  const messages = useAppSelector(s => s.chat.messages);

  const [text, setText] = useState('');

  const dispatch = useAppDispatch();

  const sendMessage = async () => {
    if (!text) {
      return;
    }

    const resultAction = await dispatch(chatAction.createMessage({text}));
    const result = unwrapResult(resultAction);
    if (result.type === 'success') {
      setText('');
    } else {
      Alert.alert('Thông báo', 'Error: ' + result.message);
    }
  };

  useEffect(() => {
    dispatch(chatAction.setPartner(route.params.partner));

    if (route.params.conversationId) {
      dispatch(
        chatAction.setConversationId({
          conversationId: route.params.conversationId,
        }),
      );
    } else {
      dispatch(
        chatAction.createPrivateConversation({
          partnerId: route.params.partner._id,
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
        await dispatch(chatAction.getMessages());
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  return (
    <Container>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FlexView bcw fo>
        <Header style={styles.shadow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BlueBackIcon height={widthPixel(20)} width={widthPixel(20)} />
          </TouchableOpacity>
          <SizedBox width={widthPixel(10)} />
          <Avatar
            size={widthPixel(40)}
            avatar={partner.avatar ? partner.avatar : null}
          />
          <SizedBox width={widthPixel(10)} />
          <TextName>{partner.name}</TextName>
        </Header>
        <FlatList
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          inverted={true}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <MessageComponent {...item} />}
        />
        <FlexView aic bcw fdr ph={widthPixel(12)} pv={heightPixel(8)}>
          <FlexView
            bc="#f5f5f5"
            br={widthPixel(20)}
            fo
            ph={widthPixel(20)}
            pv={heightPixel(8)}>
            <TextInput
              placeholder="Aa"
              value={text}
              onChangeText={v => setText(v)}
            />
          </FlexView>
          <SizedBox width={widthPixel(15)} />
          <TouchableOpacity onPress={sendMessage}>
            <SendMessageIcon height={widthPixel(25)} width={widthPixel(25)} />
          </TouchableOpacity>
        </FlexView>
      </FlexView>
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
