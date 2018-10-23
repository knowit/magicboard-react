//@flow
import moment from "moment";

export function shouldAddPlatform(
  platform: string,
  platformFilter: Array<string>
) {
  if (platformFilter == null || platformFilter.length === 0) {
    return true;
  } // If we don't add any interesting platformFilter, then we asume we'll show all
  for (let i = 0; i < platformFilter.length; i++) {
    if (platformFilter[i] === platform) {
      return true;
    }
  }

  return false;
}

export function formatTime(time: string) {
  const diff = moment.duration(moment(time) - moment.now());
  const min = diff.minutes() + diff.hours() * 60;

  if (min === 0) {
    return "now";
  } else if (min === 1) {
    return "1 minute";
  } else {
    return min + " minutes";
  }
}
