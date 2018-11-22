import qs from 'querystring';
import type OAuthConfig from './types';

const WINDOW_WIDTH = 1080;
const WINDOW_HEIGHT = 640;

export const getOAuthToken = (payload: OAuthConfig) => {
  const { redirectUri, clientId, authorizationUrl, scope } = payload;

  const params = {
    scope,
    client_id: clientId,
    redirect_uri: redirectUri,
    display: 'popup',
    response_type: 'token',
  };

  const options = {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    top: window.screenY + (window.outerHeight - WINDOW_HEIGHT) / 2.5,
    left: window.screenX + (window.outerWidth - WINDOW_WIDTH) / 2,
  };

  const popupUrl = `${authorizationUrl}?${qs.stringify(params)}`;

  const popup = window.open(popupUrl, '_blank', qs.stringify(options, ','));

  return new Promise((resolve, reject) => {
    const uri = new URL(redirectUri);
    const redirectUriPath = uri.host + uri.pathname;

    const polling = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(polling);
        reject(new Error('The popup popup was closed'));
      }
      try {
        const popupUrlPath = popup.location.host + popup.location.pathname;

        if (popupUrlPath === redirectUriPath) {
          if (popup.location.search || popup.location.hash) {
            const query = qs.parse(
              popup.location.search.substring(1).replace(/\/$/, ''),
            );
            const hash = qs.parse(
              popup.location.hash.substring(1).replace(/[/$]/, ''),
            );
            const result = Object.assign({}, query, hash);

            if (result.error) {
              reject(new Error(result.error));
            } else {
              resolve(result);
            }
          } else {
            reject(
              new Error(
                'OAuth redirect has occurred but no query or hash parameters were found.',
              ),
            );
          }
          // cleanup
          clearInterval(polling);
          popup.close();
        }
      } catch (error) {
        // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // A hack to get around same-origin security policy errors in Internet Explorer.
      }
    }, 500);
  });
};
