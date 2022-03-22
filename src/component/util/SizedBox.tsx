import React from 'react';
import {View} from 'react-native';

interface Props {
  height?: number;
  width?: number;
}

const SizedBox = ({height, width}: Props) => {
  return <View style={{height, width}} />;
};

export default SizedBox;
