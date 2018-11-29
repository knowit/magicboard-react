// @flow
import React from 'react';
import {Bar} from 'react-chartjs-2';
import {generateChartData} from './services';
import {Cell} from '../../containers';
import type {Props, State} from './types';
import {options} from './options';

const TIME_INTERVAL = 1000 * 60;

class Jira extends React.Component<Props, State> {
    static defaultProps = {
        row: 'span 2',
        column: 'span 5',
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            data: undefined,
            modeIndex: 0,
        };
    }

    componentDidMount() {
        generateChartData(
            this.props.projectKey,
            this.props.year,
            this.props.modeArray[this.state.modeIndex],
            this.props.auth,
        ).then(data => {
            this.setState(prevState => ({
                data,
                modeIndex:
                    prevState.modeIndex < this.props.modeArray.length - 1
                        ? prevState.modeIndex + 1
                        : 0,
            }));
        });

        this.intervalId = setInterval(this.tick, TIME_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    tick = () => {
        generateChartData(
            this.props.projectKey,
            this.props.year,
            this.props.modeArray[this.state.modeIndex],
            this.props.auth,
        ).then(data => {
            this.setState(prevState => ({
                data,
                modeIndex:
                    prevState.modeIndex < this.props.modeArray.length - 1
                        ? prevState.modeIndex + 1
                        : 0,
            }));
        });
    };

    intervalId: any;

    render() {
        return (
            <Cell row={this.props.row} column={this.props.column}>
                {this.state.data ? (
                    <Bar data={this.state.data} options={options}/>
                ) : (
                    <div>Loading...</div>
                )}
            </Cell>
        );
    }
}

export default Jira;
