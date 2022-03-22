import LottieView from 'lottie-react-native';
import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

interface Props {
  isVisible: boolean;
}

const LoadingModal = ({isVisible}: Props) => {
  return (
    <Modal isVisible={isVisible}>
      <Container>
        <LottieView
          source={require('../../lottie/loading.json')}
          autoPlay={true}
          loop={true}
        />
      </Container>
    </Modal>
  );
};

export default LoadingModal;
