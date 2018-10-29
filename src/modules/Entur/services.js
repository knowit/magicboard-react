// @flow

import axios from 'axios';
import type { BBox } from './types';

const axiosEnturGraphQL = axios.create({
  baseURL: 'https://api.entur.org/journeyplanner/2.0/index/graphql',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'ET-Client-Name': 'magicboard',
    'ET-Client-ID': 'magicboard',
  },
});

const enturDataToGeoJson = result => {
  const data = result.data.data.stopPlacesByBbox;
  const features = [];

  data.forEach(feature => {
    const lines = [];
    feature.estimatedCalls.forEach(call => {
      lines.push({
        name: call.serviceJourney.journeyPattern.line.name,
        expectedArrival: call.expectedArrivalTime,
        transportMode: call.serviceJourney.journeyPattern.line.transportMode,
        publicCode: call.serviceJourney.journeyPattern.line.publicCode,
      });
    });
    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [feature.longitude, feature.latitude],
      },
      properties: { name: feature.name, lines },
    });
  });
  return { type: 'FeatureCollection', features };
};

const citybikeDataToGeoJson = result => {
  const data = result.data.data.bikeRentalStationsByBbox;
  const features = [];

  data.forEach(feature => {
    const totalBikes = feature.bikesAvailable + feature.spacesAvailable;
    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [feature.longitude, feature.latitude],
      },
      properties: {
        name: feature.name,
        bikesAvailable: feature.bikesAvailable,
        totalBikes,
        icon: 'citybike',
      },
    });
  });
  return { type: 'FeatureCollection', features };
};

const fetchEnturData = (bbox: BBox) => {
  const queryEnturStations = `{
    stopPlacesByBbox(
       minimumLatitude:${bbox.latMin},
       minimumLongitude:${bbox.longMin},
       maximumLatitude:${bbox.latMax},
       maximumLongitude:${bbox.longMax})
       {
        id,
        name,
        latitude,
        longitude,
        estimatedCalls(numberOfDepartures: 5) {
          realtime
          expectedArrivalTime
          date
          destinationDisplay {
            frontText
          }
        serviceJourney {
          journeyPattern {
            line {
              id
              name
              transportMode
              publicCode
            }
          }
        }
      }
    }
  }`;

  axiosEnturGraphQL
    .post('', { query: queryEnturStations })
    .then(result => enturDataToGeoJson(result));
};

const fetchCitybikeData = async (bbox: BBox) => {
  const queryCitybikeStations = `{
    bikeRentalStationsByBbox(
     minimumLatitude:${bbox.latMin},
     minimumLongitude:${bbox.longMin},
     maximumLatitude:${bbox.latMax},
     maximumLongitude:${bbox.longMax}){
        id,
        name,
        latitude,
        longitude,
        bikesAvailable,
        spacesAvailable
     }
    }`;

  return axiosEnturGraphQL
    .post('', { query: queryCitybikeStations })
    .then(result => result);
};

export const getEnturData = async (bbox: BBox) => fetchEnturData(bbox);

export const getCitybikeData = async (bbox: BBox) =>
  fetchCitybikeData(bbox).then(data => citybikeDataToGeoJson(data));
