// @flow

export type Props = {
  row?: string,
  column?: string,
  calendars: string[],
  maxResults: number,
  accessToken?: string,
  fetching: boolean,
  getAuthentication: any,
};

export type State = {
  calendarData: any,
};

export type CalendarRaw = {
  items: [],
};
