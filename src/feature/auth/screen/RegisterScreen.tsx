import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {unwrapResult} from '@reduxjs/toolkit';
import React, {useState} from 'react';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {Alert, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import * as yup from 'yup';
import {useAppDispatch} from '../../../app/hook';
import LoadingModal from '../../../component/common/LoadingModal';
import FlexView from '../../../component/util/FlexView';
import SizedBox from '../../../component/util/SizedBox';
import {AuthParamList} from '../../../navigation/type';
import {fontPixel, heightPixel, widthPixel} from '../../../scale/scale';
import {authAction} from '../slice/authSlice';

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

const RegisterButton = styled.TouchableOpacity`
  background: #2979ff;
  border-radius: ${widthPixel(4)}px;
  margin: auto;
  padding: ${heightPixel(6)}px 0;
  width: 80%;
`;

const TextRegisterButton = styled.Text`
  color: #fff;
  font-size: ${fontPixel(16)}px;
  font-weight: bold;
  text-align: center;
`;

const LoginButton = styled.TouchableOpacity`
  margin: auto;
`;

const TextLoginButton = styled.Text`
  color: #1565c0;
  font-size: ${fontPixel(16)}px;
  font-weight: bold;
`;

interface FormData {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().required().trim().min(2).max(20),
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(20),
});

type Props = NativeStackScreenProps<AuthParamList, 'RegisterScreen'>;

const RegisterScreen = ({navigation}: Props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const {control, handleSubmit} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async data => {
    setLoading(true);
    const resultAction = await dispatch(authAction.register(data));
    setLoading(false);
    const result = unwrapResult(resultAction);
    setTimeout(() => {
      Alert.alert('Th??ng b??o', result.message);
    }, 1000);
  };

  const onError: SubmitErrorHandler<FormData> = error => {
    const messages = [];
    for (const entry of Object.entries(error)) {
      messages.push(entry[1].message);
    }
    Alert.alert('Th??ng b??o', 'Error: ' + messages.join(', '));
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
            name="name"
            render={({field: {onBlur, onChange, value}}) => (
              <TextInputContainer>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="T??n t??i kho???n"
                  placeholderTextColor="#9e9e9e"
                />
              </TextInputContainer>
            )}
          />
          <SizedBox height={heightPixel(15)} />
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
                  placeholder="M???t kh???u"
                  placeholderTextColor="#9e9e9e"
                  secureTextEntry={true}
                />
              </TextInputContainer>
            )}
          />
          <SizedBox height={heightPixel(15)} />
          <RegisterButton onPress={handleSubmit(onSubmit, onError)}>
            <TextRegisterButton>????ng k??</TextRegisterButton>
          </RegisterButton>
          <SizedBox height={heightPixel(40)} />
          <LoginButton onPress={() => navigation.navigate('LoginScreen')}>
            <TextLoginButton>???? c?? t??i kho???n?</TextLoginButton>
          </LoginButton>
        </KeyboardAwareScrollView>
      </FlexView>
      <LoadingModal isVisible={loading} />
    </Container>
  );
};

export default RegisterScreen;
