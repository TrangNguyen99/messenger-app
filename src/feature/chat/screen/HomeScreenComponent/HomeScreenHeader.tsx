import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useAppSelector} from '../../../../app/hook';
import Avatar from '../../../../component/common/Avatar';
import FlexView from '../../../../component/util/FlexView';
import SizedBox from '../../../../component/util/SizedBox';
import {fontPixel, heightPixel, widthPixel} from '../../../../scale/scale';

interface Props {
  title: string;
}

const Title = styled.Text`
  color: #000;
  font-size: ${fontPixel(24)}px;
  font-weight: bold;
`;

const HomeScreenHeader = ({title}: Props) => {
  const avatar = useAppSelector(s => s.account.avatar);

  const navigation = useNavigation();

  return (
    <FlexView aic bcw fdr ph={widthPixel(12)} pv={heightPixel(20)}>
      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(CommonActions.navigate('AccountScreen'))
        }>
        <Avatar size={widthPixel(30)} avatar={avatar ? avatar : null} />
      </TouchableOpacity>
      <SizedBox width={widthPixel(20)} />
      <Title>{title}</Title>
    </FlexView>
  );
};

export default HomeScreenHeader;
