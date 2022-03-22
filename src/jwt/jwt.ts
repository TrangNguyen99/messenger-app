import jwt_decode from 'jwt-decode';

const decodeRefreshToken = (refreshToken: string) => {
  const decoded: any = jwt_decode(refreshToken);
  return {
    userId: decoded.data.userId,
    deviceId: decoded.data.deviceId,
  };
};

export const jwt = {decodeRefreshToken};
