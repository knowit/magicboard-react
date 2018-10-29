// @flow
import React from 'react';
import mapboxgl from 'mapbox-gl';
import { getCitybikeData } from './services';
import { generateBBox } from './utils';
import type { BBox, Props, State } from './types';
import Cell from '../../containers/Cell';
import { Map } from './map';

class Entur extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    mapboxgl.accessToken = props.accessToken;
    this.bbox = generateBBox(this.props);
    this.state = {
      center: [this.props.location[1], this.props.location[0]],
      citybikeData: undefined,
      enturData: undefined,
    };
  }

  async componentDidMount() {
    const citybikeData = await getCitybikeData(this.bbox);
    this.setState({
      citybikeData,
    });

    this.map = Map(this.mapContainer, this.state);
    this.intervalId = setInterval(this.tick, 1000 * 15);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  tick = async () => {
    const citybikeData = await getCitybikeData(this.bbox);
    this.setState({
      citybikeData,
    });
  };

  map: any;

  intervalId: any;

  mapContainer: any;

  bbox: BBox;

  render() {
    if (this.state.citybikeData && this.map) {
      this.map.getSource('citybike').setData(this.state.citybikeData);
    }
    return (
      <Cell area={this.props.area}>
        <div
          ref={el => {
            this.mapContainer = el;
          }}
        />
      </Cell>
    );
  }
}

export default Entur;
