// @flow

export type User = {
  name: string,
  contributions: number,
  avatar: string
};

export type Organization = {
  name: string,
  members: User[]
}

export type State = {
  organization: any
};