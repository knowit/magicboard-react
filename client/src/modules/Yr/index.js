// @flow
import React, {Component} from 'react';
import uuidv4 from 'uuid/v4';
import {getYrData} from './services';
import {Grid, Cell} from '../../containers/index';
import type {Props, State} from './types';
import {getWeatherDescription} from './utils';
import {images} from './images';
import {DescriptionNow, Forecast, TempNow} from './components';

class Yr extends Component<Props, State> {
    static defaultProps = {
        row: 'span 3',
        column: 'span 4',
        locationId: '1-73738',
        language: 'nb-NO',
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            weather: undefined,
        };
    }

    async componentDidMount() {
        const response = await getYrData(this.props.locationId);
        this.setState({weather: response});
        this.intervalId = setInterval(this.tick, 1000 * 60 * 10);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    tick = async () => {
        const response = await getYrData(this.props.locationId);
        this.setState({weather: response});
    };

    intervalId: any;

    render() {
        return this.state.weather ? (
            <Cell row={this.props.row} column={this.props.column}>
                <Grid nested row=" 3.5fr 1fr 1fr 1fr">
                    {this.state.weather.map((weather, index) => [
                        index === 0 ? (
                            <Grid key={uuidv4()} nested column="1fr 1fr">
                                <Grid nested row="1fr 1fr">
                                    <TempNow>{`${weather.temp}°`}</TempNow>
                                    <DescriptionNow>
                                        {getWeatherDescription(weather)}
                                    </DescriptionNow>
                                </Grid>
                                <img
                                    src={images[weather.symbol]}
                                    alt="logo"
                                    width="100%"
                                    height="100%"
                                />
                            </Grid>
                        ) : (
                            <Grid key={uuidv4()} nested column="3.5fr 1fr 2fr 3fr">
                                <Forecast>
                                    {new Intl.DateTimeFormat(this.props.language, {
                                        month: 'long',
                                        day: '2-digit',
                                    }).format(new Date(weather.start))}
                                </Forecast>
                                <img
                                    src={images[weather.symbol]}
                                    alt="logo"
                                    width="100%"
                                    height="100%"
                                />
                                <Forecast>{`${weather.temp}°`}</Forecast>
                                <Forecast>{`${weather.precipitation}mm nedbør`}</Forecast>
                            </Grid>
                        ),
                    ])}
                </Grid>
            </Cell>
        ) : (
            <div>Loading...</div>
        );
    }
}

export default Yr;
