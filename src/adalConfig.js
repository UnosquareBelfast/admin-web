import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: 'eedd1340-df1a-4db2-8a03-b4cfb1fa3e9d',
  clientId: 'b18515e9-8ab9-410e-a720-4f888d0d3a4c',
  endpoints: {
    api: 'b18515e9-8ab9-410e-a720-4f888d0d3a4c',
  },
  cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(
  authContext,
  adalConfig.endpoints.api
);

export const getToken = () => {
  return authContext.getCachedToken(authContext.config.clientId);
};
