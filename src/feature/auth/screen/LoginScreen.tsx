import {yupResolver} from '@hookform/resolvers/yup';
import {unwrapResult} from '@reduxjs/toolkit';
import React, {useState} from 'react';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {Alert, Platform, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import * as yup from 'yup';
import {useAppDispatch} from '../../../app/hook';
import {authAction} from '../slice/authSlice';
import DeviceInfo from 'react-native-device-info';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthParamList} from '../../../navigation/type';
import {fontPixel, heightPixel, widthPixel} from '../../../scale/scale';
import SizedBox from '../../../component/util/SizedBox';
import LoadingModal from '../../../component/common/LoadingModal';
import FlexView from '../../../component/util/FlexView';

const Container = styled(SafeAreaView)`
  background: #fff;
  flex: 1;
`;

const TextInputContainer = styled.View`
  border-bottom-color: #2979ff;
  border-bottom-width: ${heightPixel(1)}px;
  margin: auto;
  padding: ${heightPixel(4)}px 0;
  width: 80%;
`;

const TextInput = styled.TextInput`
  color: #212121;
  font-size: ${fontPixel(18)}px;
  padding: 0;
`;

const LoginButton = styled.TouchableOpacity`
  background: #2979ff;
  border-radius: ${widthPixel(4)}px;
  margin: auto;
  padding: ${heightPixel(6)}px 0;
  width: 80%;
`;

const TextLoginButton = styled.Text`
  color: #fff;
  font-size: ${fontPixel(16)}px;
  font-weight: bold;
  text-align: center;
`;

const RegisterButton = styled.TouchableOpacity`
  background: #43a047;
  border-radius: ${widthPixel(4)}px;
  margin: auto;
  padding: ${heightPixel(6)}px ${widthPixel(8)}px;
`;

const TextRegisterButton = styled.Text`
  color: #fff;
  font-size: ${fontPixel(16)}px;
  font-weight: bold;
`;

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(20),
});

type Props = NativeStackScreenProps<AuthParamList, 'LoginScreen'>;

const LoginScreen = ({navigation}: Props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const {control, handleSubmit} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async data => {
    const platform = Platform.OS;
    const deviceId = DeviceInfo.getDeviceId();
    setLoading(true);
    const resultAction = await dispatch(
      authAction.login({...data, deviceId, platform}),
    );
    setLoading(false);
    const result = unwrapResult(resultAction);
    if (result.type === 'error') {
      setTimeout(() => {
        Alert.alert('Thông báo', 'Error: ' + result.message);
      }, 1000);
    }
  };

  const onError: SubmitErrorHandler<FormData> = error => {
    const messages = [];
    for (const entry of Object.entries(error)) {
      messages.push(entry[1].message);
    }
    Alert.alert('Thông báo', 'Error: ' + messages.join(', '));
  };

  return (
    <Container>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FlexView bcw fo>
        <KeyboardAwareScrollView>
          <SizedBox height={heightPixel(50)} />
          <Controller
            control={control}
            defaultValue=""
            name="email"
            render={({field: {onBlur, onChange, value}}) => (
              <TextInputContainer>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Email"
                  placeholderTextColor="#9e9e9e"
                />
              </TextInputContainer>
            )}
          />
          <SizedBox height={heightPixel(15)} />
          <Controller
            control={control}
            defaultValue=""
            name="password"
            render={({field: {onBlur, onChange, value}}) => (
              <TextInputContainer>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#9e9e9e"
                  secureTextEntry={true}
                />
              </TextInputContainer>
            )}
          />
          <SizedBox height={heightPixel(15)} />
          <LoginButton onPress={handleSubmit(onSubmit, onError)}>
            <TextLoginButton>Đăng nhập</TextLoginButton>
          </LoginButton>
          <SizedBox height={heightPixel(40)} />
          <RegisterButton onPress={() => navigation.navigate('RegisterScreen')}>
            <TextRegisterButton>Tạo tài khoản mới</TextRegisterButton>
          </RegisterButton>
        </KeyboardAwareScrollView>
      </FlexView>
      <LoadingModal isVisible={loading} />
    </Container>
  );
};

export default LoginScreen;
