// @flow

import axios from 'axios';
import type {
  BBox,
  CitybikeFeature,
  EnturFeature,
  PublicTransportArrival,
} from './types';

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
  const enturFeatures = [];

  const currentTime = new Date();

  data.forEach(dataFeature => {
    const publicTransportArrivals = [];
    dataFeature.estimatedCalls.forEach(dataPublicTransportArrival => {
      const expectedArrival = new Date(
        dataPublicTransportArrival.expectedArrivalTime,
      );
      const timeDifferenceInMinutes = Math.floor(
        (expectedArrival - currentTime) / 1000 / 60,
      );

      if (timeDifferenceInMinutes < 60) {
        const expectedArrivalInMinutes =
          timeDifferenceInMinutes <= 0
            ? 'nå'
            : `${timeDifferenceInMinutes} min`;

        const publicTransportArrival: PublicTransportArrival = {
          frontText: dataPublicTransportArrival.destinationDisplay.frontText,
          expectedArrival: expectedArrivalInMinutes,
          transportMode:
            dataPublicTransportArrival.serviceJourney.journeyPattern.line
              .transportMode,
          publicCode:
            dataPublicTransportArrival.serviceJourney.journeyPattern.line
              .publicCode,
        };
        publicTransportArrivals.push(publicTransportArrival);
      }
    });
    if (publicTransportArrivals.length > 0) {
      const enturFeature: EnturFeature = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [dataFeature.longitude, dataFeature.latitude],
        },
        properties: {
          name: dataFeature.name,
          nextPublicTransportArrival: publicTransportArrivals[0],
          publicTransportArrivals: publicTransportArrivals.slice(
            1,
            publicTransportArrivals.length,
          ),
        },
      };
      enturFeatures.push(enturFeature);
    }
  });
  return { type: 'FeatureCollection', features: enturFeatures };
};

const citybikeDataToGeoJson = result => {
  const data = result.data.data.bikeRentalStationsByBbox;
  const citybikeFeatures = [];

  data.forEach(dataFeature => {
    const totalBikes = dataFeature.bikesAvailable + dataFeature.spacesAvailable;
    const citybikeFeature: CitybikeFeature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [dataFeature.longitude, dataFeature.latitude],
      },
      properties: {
        name: dataFeature.name,
        bikesAvailable: dataFeature.bikesAvailable,
        totalBikes,
        icon: 'bicycle',
      },
    };
    citybikeFeatures.push(citybikeFeature);
  });
  return { type: 'FeatureCollection', features: citybikeFeatures };
};

const fetchEnturData = (bbox: BBox) => {
  const queryEnturStations = `{
    stopPlacesByBbox(
       minimumLatitude:${bbox.latMin},
       minimumLongitude:${bbox.longMin},
       maximumLatitude:${bbox.latMax},
       maximumLongitude:${bbox.longMax})
       {
        name,
        latitude,
        longitude,
        estimatedCalls(numberOfDepartures: 5) {
          expectedArrivalTime
          date
          destinationDisplay {
            frontText
          }
          serviceJourney {
            journeyPattern {
              line {
                transportMode
                publicCode
            }
          }
        }
      }
    }
  }`;

  return axiosEnturGraphQL
    .post('', { query: queryEnturStations })
    .then(result => result);
};

const fetchCitybikeData = async (bbox: BBox) => {
  const queryCitybikeStations = `{
    bikeRentalStationsByBbox(
     minimumLatitude:${bbox.latMin},
     minimumLongitude:${bbox.longMin},
     maximumLatitude:${bbox.latMax},
     maximumLongitude:${bbox.longMax}){
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

export const getEnturData = async (bbox: BBox) =>
  fetchEnturData(bbox).then(data => enturDataToGeoJson(data));

export const getCitybikeData = async (bbox: BBox) =>
  fetchCitybikeData(bbox).then(data => citybikeDataToGeoJson(data));
