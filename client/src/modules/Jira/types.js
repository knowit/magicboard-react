export const Mode = Object.freeze({
  MONTH: Symbol('month'),
  WEEK: Symbol('week'),
  STATUS: Symbol('status'),
});
export type Issue = {
  expand: string,
  id: string,
  key: string,
  self: string,
  fields: {
    created: string,
    status: {
      description: string,
      iconUrl: string,
      id: string,
      name: string,
      self: string,
      statusCategory: {
        colorName: string,
        id: number,
        key: string,
        name: string,
        self: string,
      },
    },
  },
};

export type Props = {
  projectKey: string, // Always SALG?
  year: number,
  modeArray: Mode[],
};
export type State = {
  data: ?(Object[]),
  modeIndex: number,
  frame: number,
};
