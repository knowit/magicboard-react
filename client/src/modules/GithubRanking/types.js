// @flow

export type Props = {
  organizationName: string,
  githubToken: string,
};

export type User = {
  login: string,
  name: string,
  contributions: number,
  avatar: string,
};

export type Organization = {
  name: string,
  members: Array<User>,
};

export type State = {
  organization: any,
};
