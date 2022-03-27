/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ColorValue, View} from 'react-native';

interface Props {
  children: React.ReactNode;

  bcw?: boolean;
  bc?: ColorValue;

  mxa?: boolean;

  fdr?: boolean;
  jcc?: boolean;
  aic?: boolean;
  fo?: boolean;

  ph?: number;
  pv?: number;

  br?: number;
}

const FlexView = ({
  children,
  bcw,
  bc,
  mxa,
  fdr,
  jcc,
  aic,
  fo,
  ph,
  pv,
  br,
}: Props) => {
  return (
    <View
      style={[
        bcw
          ? {
              backgroundColor: '#fff',
            }
          : {},

        bc
          ? {
              backgroundColor: bc,
            }
          : {},

        mxa
          ? {
              marginLeft: 'auto',
              marginRight: 'auto',
            }
          : {},

        {
          flexDirection: fdr ? 'row' : undefined,
          justifyContent: jcc ? 'center' : undefined,
          alignItems: aic ? 'center' : undefined,
          flex: fo ? 1 : undefined,

          paddingHorizontal: ph ? ph : undefined,
          paddingVertical: pv ? pv : undefined,

          borderRadius: br ? br : undefined,
        },
      ]}>
      {children}
    </View>
  );
};

export default FlexView;
