// @flow
import React from 'react';
import Iframe from 'react-iframe';

type Props = {
  url: string,
};
type State = {
  frame: number,
};

class IFrame extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
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
    this.setState(prevState => ({ frame: prevState.frame + 1 }));
  };

  intervalId: *;

  render() {
    return (
      <Iframe
        url={this.props.url}
        width="100%"
        height="100%"
        id="myId"
        display="initial"
        position="relative"
        allowFullScreen
      />
    );
  }
}

export default IFrame;
