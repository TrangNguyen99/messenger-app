import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import SizedBox from '../../../../component/util/SizedBox';
import {fontPixel, heightPixel, widthPixel} from '../../../../scale/scale';
import {DefaultAvatarIcon} from '../../../../svg/common';

const Container = styled.View`
  align-items: center;
  background: #fff;
  flex-direction: row;
  padding: ${heightPixel(8)}px ${widthPixel(8)}px;
`;

const Title = styled.Text`
  color: #000;
  font-size: ${fontPixel(24)}px;
  font-weight: bold;
`;

const HomeScreenHeader = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(CommonActions.navigate('AccountScreen'))
        }>
        <DefaultAvatarIcon height={widthPixel(40)} width={widthPixel(40)} />
      </TouchableOpacity>
      <SizedBox width={widthPixel(8)} />
      <Title>Đoạn chat</Title>
    </Container>
  );
};

export default HomeScreenHeader;
