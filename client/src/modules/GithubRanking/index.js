// @flow

import React from 'react';
import { getGithubData } from './services'

class GithubRanking extends React.Component<> {
  async componentDidMount() {
    const data = await getGithubData();
    console.log(data);
  }

  render() {
    return (
      <div>Loading...</div>
    )
  }
}

export default GithubRanking;
