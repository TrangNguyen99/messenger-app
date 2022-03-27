import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {useAppDispatch, useAppSelector} from '../../../app/hook';
import FlexView from '../../../component/util/FlexView';
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

const SearchButton = styled.TouchableOpacity`
  align-items: center;
  background: #f5f5f5;
  border-radius: ${widthPixel(20)}px;
  flex-direction: row;
  margin: 0 ${widthPixel(12)}px;
  padding: ${heightPixel(8)}px ${widthPixel(16)}px;
`;

const TextSearchButton = styled.Text`
  color: #757575;
  font-size: ${fontPixel(16)}px;
`;

const TextEmpty = styled.Text`
  color: #757575;
  font-size: ${fontPixel(16)}px;
`;

type Props = BottomTabScreenProps<BottomTabParamList, 'HomeScreen'>;

const HomeScreen = ({navigation}: Props) => {
  const conversations = useAppSelector(s => s.chat.conversations);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(chatAction.getConversations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FlexView bcw fo>
        <FlatList
          data={conversations}
          keyExtractor={(_, index) => index.toString()}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{flex: 1}}
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
          ListEmptyComponent={
            <FlexView aic fo jcc>
              <TextEmpty>Trống</TextEmpty>
            </FlexView>
          }
        />
      </FlexView>
    </Container>
  );
};

export default HomeScreen;
