export const storageFactory = {
  accessToken: {
    key: 'ACCESS_TOKEN',
    value: {
      string: (accessToken: string) => accessToken,
    },
  },
  refreshToken: {
    key: 'REFRESH_TOKEN',
    value: {
      string: (refreshToken: string) => refreshToken,
    },
  },
};
