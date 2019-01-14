type Header = {
  columnType: string,
  dataType: string,
  name: string,
};

type Profile = {
  accountId: string,
  profileId: string,
  profileName: string,
  tableId: string,
  webPropertyId: string,
};

type Query = {
  dimensions: string,
  ids: string,
  'max-results': number,
  metrics: Array<string>,
};

export type Result = {
  columnHeaders: Array<Header>,
  id: string,
  kind: string,
  profileInfo: Profile,
  query: Query,
  rows: Array<*>,
  selfLink: string,
  totalResults: number,
  totalsForAllResults: {
    'rt:activeUsers': string,
  },
};

export type OAuthConfig = {
  clientId: string,
  redirectUri: string,
  authorizationUrl: string,
  scope: string,
  clientSecret: string,
};
