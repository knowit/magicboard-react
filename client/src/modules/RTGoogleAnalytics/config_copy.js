/*
* Duplicate this file and rename it to config.js
*
* The params require that https://console.cloud.google.com/apis credentials for ouath have been setup
* Insert clientId and add approved redirectUri
* Scope can be found here: https://developers.google.com/identity/protocols/googlescopes
*/
const config = {
  clientId: '',
  redirectUri: `${window.location.origin}/oauth2callback`,
  scope: 'https://www.googleapis.com/auth/analytics.readonly',
  authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
};

export default config;
