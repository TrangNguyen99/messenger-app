import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import {useAppSelector} from '../../../../app/hook';
import Avatar from '../../../../component/common/Avatar';
import FlexView from '../../../../component/util/FlexView';
import SizedBox from '../../../../component/util/SizedBox';
import {fontPixel, heightPixel, widthPixel} from '../../../../scale/scale';
import {Conversation} from '../../slice/chatSlice';

const Container = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: ${heightPixel(12)}px ${widthPixel(12)}px;
`;

const TextPartner = styled.Text`
  color: #424242;
  font-size: ${fontPixel(16)}px;
`;

const TextMessage = styled.Text`
  color: #424242;
  font-size: ${fontPixel(14)}px;
`;

const ConversationButton = ({
  _id,
  type,
  participants,
  finalMessage,
}: Conversation) => {
  const navigation = useNavigation();

  const userId = useAppSelector(s => s.account._id);

  if (type === 'group') {
    return <></>;
  } else {
    const partner =
      participants[0]._id === userId ? participants[1] : participants[0];

    return (
      <Container
        onPress={() =>
          navigation.dispatch(
            CommonActions.navigate('PrivateChatScreen', {
              partner,
              conversationId: _id,
            }),
          )
        }>
        <Avatar size={widthPixel(50)} avatar={partner.avatar} />
        <SizedBox width={widthPixel(12)} />
        <FlexView fo>
          <TextPartner>{partner.name}</TextPartner>
          <TextMessage numberOfLines={1}>{finalMessage.text}</TextMessage>
        </FlexView>
      </Container>
    );
  }
};

export default ConversationButton;
