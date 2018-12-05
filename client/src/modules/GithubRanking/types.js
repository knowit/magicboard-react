// @flow

export type Props = {
    row?: string,
    column?: string,
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
