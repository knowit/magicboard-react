// @flow
import moment from 'moment';
import { shouldAddPlatform, formatTime } from './utils';
import type { Stop } from './types';

const fetchDepartures = async (stopItem: Stop) => {
  const timeAhead = moment(moment.now())
    .add(stopItem.timeToThere, 'minute')
    .format()
    .substring(0, 16);

  const dateParam = timeAhead ? `?datetime=${timeAhead}` : '';

  const departure = await fetch(
    `https://reisapi.ruter.no/StopVisit/GetDepartures/${
      stopItem.stopId
    }${dateParam}`,
  );

  return departure.json();
};

const fetchStops = async (stopItem: Stop) => {
  const response = await fetch(
    `https://reisapi.ruter.no/Place/GetStop/${stopItem.stopId}`,
  );
  return response.json();
};

export const generateAllStops = async (stopItem: Stop) => {
  const stop = await fetchStops(stopItem);
  const departures = await fetchDepartures(stopItem);

  const allStopItems = [];
  for (let i = 0; i < 11; i += 1) {
    const journey = departures[i].MonitoredVehicleJourney;
    if (
      shouldAddPlatform(
        journey.MonitoredCall.DeparturePlatformName,
        stopItem.platforms,
      )
    ) {
      const stopName = stopItem.stopName ? stopItem.stopName : stop.Name;
      const formatedTime = formatTime(
        journey.MonitoredCall.ExpectedDepartureTime,
      );

      allStopItems.push({
        stopId: stopItem.stopId,
        stopName,
        lineName: journey.PublishedLineName,
        destinationName: journey.DestinationName,
        time: formatedTime,
        platform: journey.MonitoredCall.DeparturePlatformName,
      });
    }
  }

  return allStopItems;
};
