// @flow

export type Props = {
    row?: string,
    column?: string,
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
