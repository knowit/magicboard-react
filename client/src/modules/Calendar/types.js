// @flow

export type Props = {
  calendars: string[],
  maxResults: number,
};

export type State = {
  calendarData: any,
  accessToken: ?string,
};

export type CalendarRaw = {
  items: [],
};
