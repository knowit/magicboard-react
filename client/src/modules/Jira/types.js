export const Mode = Object.freeze({
  MONTH: Symbol('month'),
  WEEK: Symbol('week'),
  STATUS: Symbol('status'),
});
export type Props = {
  projectKey: string, // Always SALG?
  year: number,
  modeArray: Mode[],
};
export type State = {
  data: ?Object,
  options: ?Object,
  modeIndex: number,
};
