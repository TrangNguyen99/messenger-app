import React from 'react';
import {View} from 'react-native';

interface Props {
  children: React.ReactNode;
  ma?: boolean;
  fdr?: boolean;
  jcc?: boolean;
  aic?: boolean;
  fo?: boolean;
}

const FlexBox = ({children, ma, fdr, jcc, aic, fo}: Props) => {
  return (
    <View
      style={[
        ma
          ? // eslint-disable-next-line react-native/no-inline-styles
            {
              marginLeft: 'auto',
              marginRight: 'auto',
            }
          : {},
        // eslint-disable-next-line react-native/no-inline-styles
        {
          flexDirection: fdr ? 'row' : undefined,
          justifyContent: jcc ? 'center' : undefined,
          alignItems: aic ? 'center' : undefined,
          flex: fo ? 1 : undefined,
        },
      ]}>
      {children}
    </View>
  );
};

export default FlexBox;
