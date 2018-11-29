// @flow
import React from 'react';
import {Line} from 'react-chartjs-2';
import {Cell} from '../../containers';
import {generateChartData} from './services';
import 'chartjs-plugin-datalabels';

type Props = {
    row?: string,
    column?: string,
    symbol: string,
    apikey: string,
    type: string,
    numberOfDatapoints: number,
};

type State = {
    data: ?Object,
    options: ?Object,
};

class Stock extends React.Component<Props, State> {
    static defaultProps = {
        row: 'span 2',
        column: 'span 5',
    };

    constructor() {
        super();
        this.state = {
            data: undefined,
            options: undefined,
        };
    }

    async componentDidMount() {
        const response = await generateChartData(this.props);
        this.setState({
            data: response.data,
            options: response.options,
        });
    }

    render() {
        return (
            <Cell row={this.props.row} column={this.props.column}>
                {this.state.data ? (
                    <Line data={this.state.data} options={this.state.options}/>
                ) : (
                    <div>Loading...</div>
                )}
            </Cell>
        );
    }
}

export default Stock;
