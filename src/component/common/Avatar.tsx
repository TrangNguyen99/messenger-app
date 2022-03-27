import React from 'react';
import {Image} from 'react-native';
import {DefaultAvatarIcon} from '../../svg/common';

interface Props {
  size: number;
  avatar: string | null;
}

const Avatar = ({size, avatar}: Props) => {
  if (avatar) {
    return (
      <Image
        source={{uri: avatar}}
        style={{
          borderRadius: size / 2,
          height: size,
          width: size,
        }}
      />
    );
  }

  return <DefaultAvatarIcon height={size} width={size} />;
};

export default Avatar;
