const config = {
  clientId: '301245748754-u6bbkcmgivnrqf1l2des5e6utkn1841u.apps.googleusercontent.com',
  redirectUri: `${window.location.origin}/oauth2callback`,
  scope: 'https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/analytics.readonly',
  authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
  clientSecret: 'R5J0h02l4M_ANBgWgn6YTfax',
};

export default config;