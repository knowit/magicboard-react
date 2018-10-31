// @flow

import React from 'react';
import ReactMapboxGl, { GeoJSONLayer, Popup } from 'react-mapbox-gl';
import { getCitybikeData, getEnturData } from './services';
import { generateBBox } from './utils';
import type { BBox, Props, State } from './types';
import './css/mapbox-gl.css';
import Cell from '../../containers/Cell';
import { CitybikeLayout, CitybikePaint, StationName } from "./components";

let Map;

class Entur extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    Map = ReactMapboxGl({
      accessToken: this.props.accessToken,
    });
    this.bbox = generateBBox(this.props);
    this.state = {
      center: [this.props.location[1], this.props.location[0]],
      citybikeData: undefined,
      enturData: undefined,
    };
  }

  async componentDidMount() {
    const citybikeData = await getCitybikeData(this.bbox);
    const enturData = await getEnturData(this.bbox);

    this.setState({
      citybikeData,
      enturData,
    });
  }

  bbox: BBox;

  render() {
    if (!this.state.enturData || !this.state.citybikeData) {
      return <div>Loading...</div>;
    }

    return (
      <Cell area={this.props.area}>
        <Map
          center={this.state.center}
          zoom={[15]}
          style="mapbox://styles/petlov/cjn5p1j4z0kfh2suvku2gjg6y"
          containerStyle={{
            height: '100%',
            width: '100%',
          }}>
          <GeoJSONLayer
            data={this.state.citybikeData}
            symbolLayout={CitybikeLayout}
            symbolPaint={CitybikePaint}
          />
          {this.state.enturData.features.map(feature => [
            <Popup
              coordinates={feature.geometry.coordinates}
              offset={{
                'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
              }}>
              <StationName>{feature.properties.name}</StationName>
            </Popup>
          ])}
        </Map>
      </Cell>
    );
  }
}

export default Entur;
