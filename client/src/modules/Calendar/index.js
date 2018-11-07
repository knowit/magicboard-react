// @flow

import React, {Component} from 'react';


import {Cell} from '../../containers';

import config from './config';
import {getOAuthToken} from '../../ouath2';

import type {RealTimeResult} from '../../ouath2/types';
import RTGoogleAnalytics from "../RTGoogleAnalytics";
import {Button} from "../RTGoogleAnalytics/components";


const POLL_INTERVAL = 1000; // in seconds
// const fagLink = "https://calendar.google.com/calendar/ical/knowit.no_63rtu1seerufqsdhc4avduoggk%40group.calendar.google.com/private-eb08c8c086bf620989522c8d87d813ae/basic.ics";


type Props = {

    apiOptions: string,

    calendarID: string,
};

type State = {
    rtData: ?Object,
    accessToken: ?string,
};


const API_URL = 'https://www.googleapis.com/calendar/v3/calendars/';

class Calendar extends Component<Props, State> {
    static defaultProps = {
        apiOptions: '&metrics=rt:activeUsers&dimensions=rt:deviceCategory',
    };

    constructor(props: Props) {
        console.log("Construction completete");
        super(props);
        this.state = {rtData: undefined, accessToken: undefined};
    }


    componentDidUpdate(prevProps: Props, prevState: State) {
        if (
            this.state.accessToken &&
            prevState.accessToken !== this.state.accessToken
        ) {
            const {accessToken} = this.state;
            this.intervalId = setInterval(
                () => this.polling(accessToken),
                1000 * POLL_INTERVAL,
            );
        }
    }


    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    polling = (accessToken: string) => {
        const url = `${API_URL}${this.props.calendarID}/events`;
        //const url = `${API_URL}${this.props.calendarID}&key=${accessToken}`;
        console.log("URL: ", url);



        var myHeaders = new Headers({
            'Content-length': 0,
            'Authorization': 'Bearer ' + accessToken
        });

        console.log(myHeaders);

        fetch(url, myHeaders)
            .then(result => console.log(result.json()))

        // .then((data: RealTimeResult) => {
        //     this.setState({ rtData: parseRTData(data) });
        // })
        // .catch(error => console.log(error));

    };

    handleClick = async () => {
        const token = await getOAuthToken({...config});
        const accessToken = token.access_token;
        this.setState({accessToken});
        this.polling(accessToken);
    };


    intervalId: *;

    render() {
        return (
        <Cell row="span 2" column="span 2">
            <Button type="button" onClick={this.handleClick}>
                Press here for OAuth
            </Button>
        </Cell>
        )
    }
}

export default Calendar;
