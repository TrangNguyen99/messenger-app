import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {userApi} from '../../../api/userApi';
import Avatar from '../../../component/common/Avatar';
import FlexView from '../../../component/util/FlexView';
import SizedBox from '../../../component/util/SizedBox';
import {MainParamList} from '../../../navigation/type';
import {fontPixel, heightPixel, widthPixel} from '../../../scale/scale';

const Container = styled(SafeAreaView)`
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
  const [otherUsers, setOtherUsers] = useState<
    {
      _id: string;
      name: string;
      avatar: string | null;
    }[]
  >([]);

  useEffect(() => {
    (async () => {
      const response = await userApi.getOthers();
      if (response.type === 'success') {
        setOtherUsers(response.data);
      }
    })();
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FlexView bcw fo>
        <FlatList
          data={otherUsers}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <OtherUserButton
              onPress={() =>
                navigation.navigate('PrivateChatScreen', {
                  partner: {
                    _id: item._id,
                    name: item.name,
                    avatar: item.avatar,
                  },
                })
              }>
              <Avatar size={widthPixel(40)} avatar={item.avatar} />
              <SizedBox width={widthPixel(12)} />
              <TextOtherUser>{item.name}</TextOtherUser>
            </OtherUserButton>
          )}
        />
      </FlexView>
    </Container>
  );
};

export default SearchScreen;
