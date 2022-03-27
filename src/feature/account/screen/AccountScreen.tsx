import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {useAppDispatch, useAppSelector} from '../../../app/hook';
import Avatar from '../../../component/common/Avatar';
import LoadingModal from '../../../component/common/LoadingModal';
import FlexView from '../../../component/util/FlexView';
import SizedBox from '../../../component/util/SizedBox';
import {fontPixel, widthPixel} from '../../../scale/scale';
import {LogoutIcon} from '../../../svg/common';
import {authAction} from '../../auth/slice/authSlice';

const Container = styled(SafeAreaView)`
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
  const avatar = useAppSelector(s => s.account.avatar);

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const onLogout = async () => {
    setLoading(true);
    await dispatch(authAction.logout());
  };

  return (
    <Container>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FlexView bcw fo>
        <FlexView mxa>
          <Avatar size={widthPixel(100)} avatar={avatar ? avatar : null} />
        </FlexView>
        <TextName>{name}</TextName>
        <LogoutButton onPress={onLogout}>
          <LogoutIcon height={widthPixel(40)} width={widthPixel(40)} />
          <SizedBox width={widthPixel(4)} />
          <TextLogout>Đăng xuất</TextLogout>
        </LogoutButton>
      </FlexView>
      <LoadingModal isVisible={loading} />
    </Container>
  );
};

export default AccountScreen;
