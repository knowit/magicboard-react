// @flow

import React from 'react';
import { getGithubData } from './services'
import type { State, User } from './types'
import { Cell, Grid } from "../../containers";
import styled from "react-emotion";
import { fontSize } from "../../styles/theme";


class GithubRanking extends React.Component<State> {
  constructor() {
    super();
    this.state = {
      organization: undefined
    };
  }

  async componentDidMount() {
    const organization = await getGithubData();
    this.setState({
      organization
    })
  }

  render() {
    return (
      <Cell row="span 6" column="span 2">
        {this.state.organization ? (
          <Grid nested row='repeat(10, 1fr)'>
            {this.state.organization.members.map((member: User) => [
              <Grid nested column='1fr 4fr 3fr' key={member.name} style={{
                height: "auto",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <img
                  src={member.avatar}
                  width="20vw"
                  height="20vw"
                  alt="new"
                />
                <Line>
                  {member.name}
                </Line>
                <Line>
                  {member.contributions}
                </Line>
              </Grid>
            ])}
          </Grid>
        ) : (
          <div>Loading...</div>
        )
        }
      </Cell>
    )
  }
}

const Line = styled('div')`
  font-size: ${fontSize.small};
  height: -webkit-fill-available
  display: flex
  align-items: center
`;

export default GithubRanking;
