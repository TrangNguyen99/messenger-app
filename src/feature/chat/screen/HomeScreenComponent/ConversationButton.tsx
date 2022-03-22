import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import {useAppSelector} from '../../../../app/hook';
import FlexBox from '../../../../component/util/FlexBox';
import SizedBox from '../../../../component/util/SizedBox';
import {heightPixel, widthPixel} from '../../../../scale/scale';
import {DefaultAvatarIcon} from '../../../../svg/common';
import {Conversation} from '../../slice/chatSlice';

const Container = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: ${heightPixel(8)}px ${widthPixel(12)}px;
`;

const TextPartner = styled.Text``;

const TextMessage = styled.Text``;

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
              partnerId: partner._id,
              name: partner.name,
              conversationId: _id,
            }),
          )
        }>
        <DefaultAvatarIcon height={widthPixel(50)} width={widthPixel(50)} />
        <SizedBox width={widthPixel(4)} />
        <FlexBox fo>
          <TextPartner>{partner.name}</TextPartner>
          <TextMessage>{finalMessage.text}</TextMessage>
        </FlexBox>
      </Container>
    );
  }
};

export default ConversationButton;
