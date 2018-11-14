export const TimeInterval = Object.freeze({
    MONTH: Symbol("month"),
    WEEK: Symbol("week"),
});
export type Props = {
    projectKey: string, // Always SALG?
    year: number,
};
export type State = {
    data: ?Object,
    options: ?Object,
    timeInterval: TimeInterval,
};