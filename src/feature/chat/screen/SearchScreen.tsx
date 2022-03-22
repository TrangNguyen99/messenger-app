import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {userApi} from '../../../api/userApi';
import SizedBox from '../../../component/util/SizedBox';
import {MainParamList} from '../../../navigation/type';
import {fontPixel, heightPixel, widthPixel} from '../../../scale/scale';
import {DefaultAvatarIcon} from '../../../svg/common';

const Container = styled(SafeAreaView)`
  background: #fff;
  flex: 1;
`;

const ContentContainer = styled.View`
  background: #fff;
  flex: 1;
`;

const OtherUserButton = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  margin: ${heightPixel(8)}px ${widthPixel(12)}px;
`;

const TextOtherUser = styled.Text`
  color: #000;
  font-size: ${fontPixel(16)}px;
  font-weight: bold;
`;

type Props = NativeStackScreenProps<MainParamList, 'SearchScreen'>;

const SearchScreen = ({navigation}: Props) => {
  const [otherUsers, setOtherUsers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const response = await userApi.getAllOtherUsers();
      if (response.type === 'success') {
        setOtherUsers(response.data);
      }
    })();
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ContentContainer>
        <FlatList
          data={otherUsers}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <OtherUserButton
              onPress={() =>
                navigation.navigate('PrivateChatScreen', {
                  partnerId: item._id,
                  name: item.name,
                })
              }>
              <DefaultAvatarIcon
                height={widthPixel(40)}
                width={widthPixel(40)}
              />
              <SizedBox width={widthPixel(12)} />
              <TextOtherUser>{item.name}</TextOtherUser>
            </OtherUserButton>
          )}
        />
      </ContentContainer>
    </Container>
  );
};

export default SearchScreen;
