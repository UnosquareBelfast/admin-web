import * as Msal from 'msal';

export default new Msal.UserAgentApplication(
  'b18515e9-8ab9-410e-a720-4f888d0d3a4c',
  null,
  null,
  {
    cacheLocation: 'localStorage',
    redirectUri: process.env.AZURE_REDIRECT,
    navigateToLoginRequestUrl: false,
  }
);
