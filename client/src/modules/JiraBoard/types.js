export type Issue = {
  summary: string,
  description: string,
  votes: number,
};

export type Props = {
  row?: string,
  column?: string,
  maxIssues: number,
  projectKey: string,
  auth: string,
  header: string,
  subheader: string[],
};

export type State = {
  issues: Issue[],
  issueIndex: number,
};
