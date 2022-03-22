import React from 'react';
import styled from 'styled-components/native';
import {useAppSelector} from '../../../../app/hook';
import SizedBox from '../../../../component/util/SizedBox';
import {heightPixel, widthPixel, fontPixel} from '../../../../scale/scale';

interface Props {
  senderId: string;
  text: string;
}

const MyMessageContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin: ${heightPixel(8)}px 0;
`;

const MyMessageTextContainer = styled.View`
  background: #2979ff;
  border-radius: ${widthPixel(20)}px;
  max-width: ${widthPixel(300)}px;
  padding: ${heightPixel(8)}px ${widthPixel(12)}px;
`;

const TextMyMessage = styled.Text`
  color: #fff;
  font-size: ${fontPixel(16)}px;
`;

const PartnerMessageContainer = styled.View`
  flex-direction: row;
  margin: ${heightPixel(8)}px 0;
`;

const PartnerMessageTextContainer = styled.View`
  background: #eee;
  border-radius: ${widthPixel(20)}px;
  max-width: ${widthPixel(300)}px;
  padding: ${heightPixel(8)}px ${widthPixel(12)}px;
`;

const TextPartnerMessage = styled.Text`
  color: #000;
  font-size: ${fontPixel(16)}px;
`;

const MessageComponent = ({senderId, text}: Props) => {
  const userId = useAppSelector(s => s.account._id);

  if (senderId === userId) {
    return (
      <MyMessageContainer>
        <MyMessageTextContainer>
          <TextMyMessage>{text}</TextMyMessage>
        </MyMessageTextContainer>
        <SizedBox width={widthPixel(30)} />
      </MyMessageContainer>
    );
  } else {
    return (
      <PartnerMessageContainer>
        <SizedBox width={widthPixel(30)} />
        <PartnerMessageTextContainer>
          <TextPartnerMessage>{text}</TextPartnerMessage>
        </PartnerMessageTextContainer>
      </PartnerMessageContainer>
    );
  }
};

export default MessageComponent;
