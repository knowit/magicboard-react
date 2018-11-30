// @flow
import React from 'react';
import {connect} from 'react-redux';
import styled from "react-emotion";
import Carousel from 'nuka-carousel';
import {onMount, onUnmount} from 'react-keydown/dist/event_handlers';
import {setBinding} from 'react-keydown/dist/store';
import {boards} from '../../App';
import type {Action} from '../../actions';
import {Cell} from '../index';
import Clock from "../../modules/Clock";

type Props = {
    slideIndex: number,
    noMotionDetected: boolean,
    nextSlide: () => void,
    previousSlide: () => void,
};

class Caroussel extends React.PureComponent<Props> {
    componentDidMount() {
        onMount(this);
    }

    componentWillUnmount() {
        onUnmount(this);
    }

    // disable eslint because setBinding cant find binded
    /* eslint-disable */
    onChangeSlide(event: any) {
        if (event.key === 'ArrowRight') {
            this.props.nextSlide();
        } else if (event.key === 'ArrowLeft') {
            this.props.previousSlide();
        }
    }

    render() {
        return (
            <SleepCell
                background={this.props.noMotionDetected ? 'black' : 'transparent'}
                margin={this.props.noMotionDetected ? '-5%' : '0'}>

                <VerticalContainer>
                    <Clock/>
                    <Carousel withoutControls slideIndex={this.props.slideIndex} style={{visibility: this.props.noMotionDetected ? 'hidden' : 'visible'}}>
                        {boards()}
                    </Carousel>
                </VerticalContainer>

            </SleepCell>
        );
    }
}

setBinding({
    target: Caroussel.prototype,
    fn: Caroussel.prototype.onChangeSlide,
    keys: ['left', 'right'],
});

const ConnectedApp = connect(
    state => ({
        slideIndex: state.rootReducer.slideIndex,
        noMotionDetected: state.rootReducer.noMotionDetected,
    }),
    (dispatch: (action: Action) => void) => ({
        nextSlide: () => dispatch({type: 'NEXT_BOARD'}),
        previousSlide: () => dispatch({type: 'PREVIOUS_BOARD'}),
    }),
)(Caroussel);

const SleepCell = props => (
    <Cell
        {...props}
        style={{
            width: '-webkit-fill-available',
            height: 'auto',
            backgroundColor: props.background,
            margin: props.margin,
        }}
    />
);

const VerticalContainer = styled('div')`
    width: 100%;
    height: 100%;
`;

export default ConnectedApp;
