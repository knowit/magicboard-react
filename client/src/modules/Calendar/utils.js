// @flow

export function convertDateTimeToInTime(dateTime: string) {
  const dateNow = new Date();
  const dateEvent = new Date(dateTime);
  const timeDiff = dateEvent.getTime() - dateNow.getTime();
  const dayDifference = Math.floor(timeDiff / (1000 * 3600 * 24));
  if(timeDiff < 0){
    return'Now'
  }

  if (dayDifference > 0) {
    if (dayDifference === 1) {
      return `${dayDifference} Day`;
    }

    return `${dayDifference} Days`;
  }


  const hourDifference = Math.floor(timeDiff / (1000 * 3600));
  if (hourDifference > 0) {
    if (hourDifference === 1) {
      return `${hourDifference} Hour`;
    }

    return `${hourDifference} Hours`;
  }

  const minuteDifference = Math.floor(timeDiff / (1000 * 60));
  if (minuteDifference === 1) {
    return `${minuteDifference} Minute`;
  }


  return `${minuteDifference} Minutes`;
}
