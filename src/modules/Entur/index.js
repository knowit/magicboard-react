// @flow

import React from 'react';
import ReactMapboxGl, { GeoJSONLayer, Popup } from 'react-mapbox-gl';
import uuidv4 from 'uuid/v4';
import Carousel from 'nuka-carousel';
import { getCitybikeData, getEnturData } from './services';
import { generateBBox, getTransportModeIcon } from './utils';
import type { BBox, Props, State } from './types';
import Cell from '../../containers/Cell';
import { CitybikeLayout, CitybikePaint, Line, StationName } from './components';

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
    return (
      <Cell area={this.props.area}>
        {this.state.enturData && this.state.citybikeData ? (
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
                key={uuidv4()}
                coordinates={feature.geometry.coordinates}
                offset={{
                  'bottom-left': [12, -38],
                  bottom: [0, -38],
                  'bottom-right': [-12, -38],
                }}>
                <StationName>{feature.properties.name}</StationName>
                <Line>
                  <img
                    src={getTransportModeIcon(
                      feature.properties.nextLine.transportMode,
                    )}
                    alt="icon"
                    width="10vw"
                    height="10vw"
                  />
                  {feature.properties.nextLine.publicCode}{' '}
                  {feature.properties.nextLine.frontText}{' '}
                  {feature.properties.nextLine.expectedArrival}
                </Line>
                <div
                  style={{
                    maxWidth: '17vw',
                    overflow: 'hidden',
                    position: 'relative',
                    whiteSpace: 'nowrap',
                  }}>
                  <Carousel
                    withoutControls
                    autoplay
                    easing="easeLinear"
                    autoplayInterval={6000}
                    speed={5000}
                    wrapAround>
                    {feature.properties.lines.map(line => [
                      <Line key={uuidv4()}>
                        <img
                          src={getTransportModeIcon(line.transportMode)}
                          alt="icon"
                          width="10vw"
                          height="10vw"
                        />
                        {line.publicCode} {line.frontText}{' '}
                        {line.expectedArrival}
                      </Line>,
                    ])}
                  </Carousel>
                </div>
              </Popup>,
            ])}
          </Map>
        ) : (
          <div>Loading...</div>
        )}
      </Cell>
    );
  }
}

export default Entur;
