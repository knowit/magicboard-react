// @flow

import React from 'react';
import ReactMapboxGl, { GeoJSONLayer, Popup } from 'react-mapbox-gl';
import uuidv4 from 'uuid/v4';
import Carousel from 'nuka-carousel';
import { getCitybikeData, getEnturData } from './services';
import { generateBBox, getTransportModeIcon } from './utils';
import type {
  BBox,
  EnturFeature,
  Props,
  PublicTransportArrival,
  State,
} from './types';
import Cell from '../../containers/Cell';
import { CitybikeLayout, CitybikePaint, Line, StationName } from './components';
import './entur.css';

let Map;

class Entur extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    Map = ReactMapboxGl({
      accessToken: this.props.accessToken,
      attributionControl: false
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

    this.intervalId = setInterval(this.tick, 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  tick = async () => {
    const citybikeData = await getCitybikeData(this.bbox);
    const enturData = await getEnturData(this.bbox);

    this.setState({
      citybikeData,
      enturData,
    });
  };

  intervalId: any;

  bbox: BBox;

  render() {
    return (
      <Cell row="span 7" column="span 5">
        {this.state.enturData && this.state.citybikeData ? (
          <Map
            center={this.state.center}
            zoom={[16]}
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
            {this.state.enturData.features.map((feature: EnturFeature) => [
              <Popup
                key={uuidv4()}
                coordinates={feature.geometry.coordinates}
              >
                <StationName>{feature.properties.name}</StationName>
                <Line>
                  <img
                    src={getTransportModeIcon(
                      feature.properties.nextPublicTransportArrival
                        .transportMode,
                    )}
                    alt="icon"
                    width="10vw"
                    height="10vw"
                  />
                  {feature.properties.nextPublicTransportArrival.publicCode}{' '}
                  {feature.properties.nextPublicTransportArrival.frontText}{' '}
                  {
                    feature.properties.nextPublicTransportArrival
                      .expectedArrival
                  }
                </Line>
                <div
                  style={{
                    maxWidth: '13vw',
                    overflow: 'hidden',
                    position: 'relative',
                    whiteSpace: 'nowrap',
                  }}>
                  <Carousel
                    withoutControls
                    autoplay
                    easing="easeLinear"
                    autoplayInterval={3100}
                    speed={3000}
                    wrapAround
                    width="13vw">
                    {feature.properties.publicTransportArrivals.map(
                      (arrival: PublicTransportArrival) => [
                        <Line key={uuidv4()}>
                          <img
                            src={getTransportModeIcon(arrival.transportMode)}
                            alt="icon"
                            width="10vw"
                            height="10vw"
                          />
                          {arrival.publicCode} {arrival.frontText}{' '}
                          {arrival.expectedArrival}
                        </Line>,
                      ],
                    )}
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
