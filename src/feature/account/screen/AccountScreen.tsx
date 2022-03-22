import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {useAppDispatch, useAppSelector} from '../../../app/hook';
import LoadingModal from '../../../component/common/LoadingModal';
import FlexBox from '../../../component/util/FlexBox';
import SizedBox from '../../../component/util/SizedBox';
import {fontPixel, widthPixel} from '../../../scale/scale';
import {DefaultAvatarIcon, LogoutIcon} from '../../../svg/common';
import {authAction} from '../../auth/slice/authSlice';

const Container = styled(SafeAreaView)`
  background: #fff;
  flex: 1;
`;

const ContentContainer = styled.View`
  background: #fff;
  flex: 1;
`;

const TextName = styled.Text`
  color: #000;
  font-size: ${fontPixel(24)}px;
  font-weight: bold;
  text-align: center;
`;

const LogoutButton = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 0 ${widthPixel(16)}px;
`;

const TextLogout = styled.Text`
  font-size: ${fontPixel(18)}px;
  font-weight: bold;
`;

const AccountScreen = () => {
  const name = useAppSelector(s => s.account.name);

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const onLogout = async () => {
    setLoading(true);
    await dispatch(authAction.logout());
  };

  return (
    <Container>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ContentContainer>
        <FlexBox ma>
          <DefaultAvatarIcon height={widthPixel(100)} width={widthPixel(100)} />
        </FlexBox>
        <TextName>{name}</TextName>
        <LogoutButton onPress={onLogout}>
          <LogoutIcon height={widthPixel(40)} width={widthPixel(40)} />
          <SizedBox width={widthPixel(4)} />
          <TextLogout>Đăng xuất</TextLogout>
        </LogoutButton>
      </ContentContainer>
      <LoadingModal isVisible={loading} />
    </Container>
  );
};

export default AccountScreen;
