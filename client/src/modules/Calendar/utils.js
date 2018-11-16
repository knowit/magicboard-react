// @flow

export function convertDateTimeToInTime(dateTime: string) {
  const dateNow = new Date();
  const dateEvent = new Date(dateTime);
  const timeDiff = Math.abs(dateEvent.getTime() - dateNow.getTime());
  const dayDifference = Math.floor(timeDiff / (1000 * 3600 * 24));
  if (dayDifference > 0) {
    if (dayDifference === 1) {
      return `${dayDifference} Day`;
    }

    return `${dayDifference} Days`;
  }

  const hourDifference = Math.floor(timeDiff / (1000 * 3600));
  if (hourDifference > 0) {
    if (dayDifference === 1) {
      return `${hourDifference} Hour`;
    }

    return `${hourDifference} Hours`;
  }

  const minuteDifference = Math.floor(timeDiff / (1000 * 60));
  if (dayDifference === 1) {
    return `${minuteDifference} Minute`;
  }

  return `${dayDifference} Minutes`;
}
