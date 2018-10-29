// @flow

import mapboxgl from 'mapbox-gl';
import citybikeIcon from './img/citybike.png';
import type { State } from './types';

export const Map = (container: any, state: State) => {
  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/dark-v9',
    center: state.center,
    zoom: 15,
  });

  map.loadImage(citybikeIcon, (error, image) => {
    if (error) throw error;
    map.addImage('citybike', image);
  });

  map.on('load', () => {
    map.addSource('citybike', {
      type: 'geojson',
      data: state.citybikeData,
    });

    map.addLayer(
      {
        id: 'citybike',
        type: 'symbol',
        source: 'citybike',
        layout: {
          'icon-image': '{icon}',
          'text-field': '{name}\n{bikesAvailable}/{totalBikes} sykler ledig',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-size': 8,
          'text-offset': [0, 0.6],
          'text-anchor': 'top',
          'icon-size': 0.03,
        },
        paint: {
          'text-color': '#fff',
          'text-halo-width': 0.5,
          'text-halo-color': '#000',
        },
      },
      'country-label-lg',
    );
  });

  const mapbox = document.getElementsByClassName('mapboxgl-map')[0];
  mapbox.style.width = '100%';
  mapbox.style.height = '100%';

  const mapCanvasContainer = document.getElementsByClassName(
    'mapboxgl-canvas-container',
  )[0];
  mapCanvasContainer.style.width = 'inherit';
  mapCanvasContainer.style.height = 'inherit';

  const mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0];
  mapCanvas.style.width = 'inherit';
  mapCanvas.style.height = 'inherit';
  mapCanvas.style.position = 'inherit';

  const mapControl = document.getElementsByClassName(
    'mapboxgl-control-container',
  )[0];
  mapControl.style.visibility = 'hidden';

  map.resize();

  return map;
};
