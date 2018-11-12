// @flow

const config = {
  clientId: '',
  redirectUri: `${window.location.origin}/oauth2callback`,
  scope: 'https://www.googleapis.com/auth/calendar.events.readonly',
  authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
};

export default config;
