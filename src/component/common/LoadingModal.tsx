import LottieView from 'lottie-react-native';
import React from 'react';
import Modal from 'react-native-modal';
import FlexView from '../util/FlexView';

interface Props {
  isVisible: boolean;
}

const LoadingModal = ({isVisible}: Props) => {
  return (
    <Modal isVisible={isVisible}>
      <FlexView aic fo jcc>
        <LottieView
          source={require('../../lottie/loading.json')}
          autoPlay={true}
          loop={true}
        />
      </FlexView>
    </Modal>
  );
};

export default LoadingModal;
