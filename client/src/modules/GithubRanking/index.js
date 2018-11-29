// @flow

import React from 'react';
import {getGithubData} from './services';
import type {Props, State, User} from './types';
import {Cell, Grid} from '../../containers';
import {Header, Line, LineBold} from './components';

class GithubRanking extends React.Component<Props, State> {
    static defaultProps = {
        row: 'span 7',
        column: 'span 2',
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            organization: undefined,
        };
    }

    async componentDidMount() {
        const organization = await getGithubData(
            this.props.organizationName,
            this.props.githubToken,
        );
        this.setState({
            organization,
        });

        this.intervalId = setInterval(this.tick, 1000 * 60 * 60 * 6);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    tick = async () => {
        const organization = await getGithubData(
            this.props.organizationName,
            this.props.githubToken,
        );
        this.setState({
            organization,
        });
    };

    intervalId: any;

    render() {
        return (
            <Cell row={this.props.row} column={this.props.column}>
                {this.state.organization ? (
                    <Grid nested row="2fr 1fr repeat(10 1fr)">
                        <Header>Toppliste Knowit Github</Header>
                        <Grid
                            nested
                            column="2fr 12fr 3fr"
                            style={{
                                height: 'auto',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Line/>
                            <LineBold>Navn</LineBold>
                            <LineBold>Bidrag</LineBold>
                        </Grid>
                        {this.state.organization.members.map((member: User) => [
                            <Grid
                                nested
                                column="2fr 12fr 3fr"
                                key={member.name}
                                style={{
                                    height: 'auto',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <img src={member.avatar} width="20vw" height="20vw" alt="new"/>
                                <Line>
                                    {member.login} {`(${member.name})`}
                                </Line>
                                <Line>{member.contributions}</Line>
                            </Grid>,
                        ])}
                    </Grid>
                ) : (
                    <div>Loading...</div>
                )}
            </Cell>
        );
    }
}

export default GithubRanking;
