// @flow
import React from 'react';
import Iframe from 'react-iframe';
import Cell from '../../containers/Cell';
import type {Props, State} from './types';

class IFrame extends React.Component<Props, State> {
    static defaultProps = {
        row: 'span 2',
        column: 'span 5',
    };

    constructor() {
        super();
        this.state = {
            currentUrlIndex: 0,
            frame: 0,
        };
    }

    componentDidMount() {
        this.intervalId = setInterval(this.tick, 1000 * 60 * 5);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    tick = () => {
        this.setState(prevState => ({
            currentUrlIndex:
                prevState.currentUrlIndex + 1 < this.props.url.length
                    ? prevState.currentUrlIndex + 1
                    : 0,
            frame: prevState.frame + 1,
        }));
    };

    intervalId: *;

    render() {
        return (
            <Cell row={this.props.row} column={this.props.column}>
                <Iframe
                    url={this.props.url[this.state.currentUrlIndex]}
                    width="100%"
                    height="100%"
                    id="myId"
                    display="initial"
                    position="relative"
                    allowFullScreen
                />
            </Cell>
        );
    }
}

export default IFrame;
