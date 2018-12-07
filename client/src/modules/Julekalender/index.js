import {Component} from "react";
import React from "react";
import styled from "react-emotion";
import {Cell, Header} from "../Calendar/components";
import {Grid} from "../../containers";
import {fontSize, margin} from "../../styles/theme";

const SECOND = 1000;

type Props = {
  row?: string,
  column?: string,
}

type State = {
  numbUsers: ?number,
  numbCorrectAnwswers: ?number,
};

const Active = styled('div')`
  margin-top: ${margin.small};
  margin-bottom: ${margin.small};
  font-size: ${fontSize.medium};
  text-align: center;
`;

const HeaderFont = styled('div')`
  margin-top: ${margin.small};
  margin-bottom: ${margin.small};
  font-size: ${fontSize.xsmall};
  text-align: center;
`;


const RedSpan = styled('span')`
  color: red
`;

const GreenSpan = styled('span')`
  color: #3C8D0D
`;


async function getNumberOfUsers() {

  return fetch('https://api.graph.cool/simple/v1/k0dekalender', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query: '{ _allUsersMeta { count }}'}),
  })
    .then(res => res.json())
    .then(({data: {_allUsersMeta: {count}}}) => count)
}

function getNumberOfCorrectAnswers() {
  return fetch('https://api.graph.cool/simple/v1/k0dekalender', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query: '{ _allSolutionsMeta(filter:{solved:true}) { count }}'}),
  })
    .then(res => res.json())
    .then(({data: {_allSolutionsMeta: {count}}}) => count)
}


class Julekalender extends Component<Props, State> {
  static defaultProps = {
    row: 'span 2',
    column: 'span 3',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      numbUsers: undefined,
      numbCorrectAnwswers: undefined,
    };
  }

  componentDidMount() {
    getNumberOfUsers().then((numbCorrectAnwswers) => {
      this.setState({
        numbCorrectAnwswers
      })
    });

    getNumberOfCorrectAnswers().then((numbUsers) => {
      this.setState({
        numbUsers
      })
    });

    this.numberOfCorrectAnswersInterval = setInterval(
      () => {
        getNumberOfUsers().then((numbCorrectAnwswers) => {
          this.setState({
            numbCorrectAnwswers
          })
        })
      },
      1000 * SECOND,
    );

    this.numberOfUsersInterval = setInterval(
      () => {
        getNumberOfCorrectAnswers().then((numbUsers) => {
          this.setState({
            numbUsers
          })
        })
      },
      1000 * SECOND,
    );
  }

  componentWillUnmount() {
    this.numberOfUsersInterval.clear();
    this.numberOfCorrectAnswersInterval.clear();
  }

  numberOfUsersInterval: *
  ;

  numberOfCorrectAnswersInterval: *
  ;

  render() {
    const {numbCorrectAnwswers, numbUsers} = this.state;


    if (numbUsers && numbCorrectAnwswers) {
      return (
        <Cell row={this.props.row} column={this.props.column}>
          <Grid nested row="1fr 7fr" column="1fr">
          <Header><RedSpan>Jule</RedSpan>kale<GreenSpan>nder</GreenSpan></Header>
            <Grid nested row="repeat(2fr, 1fr)">
              <Grid nested column="1fr 1fr" >
                <HeaderFont>Number of users</HeaderFont>
                <HeaderFont>Number of completed luker</HeaderFont>
              </Grid>
              <Grid nested column="1fr 1fr" >
                <Active>{numbUsers}</Active>
                <Active>{numbCorrectAnwswers}</Active>
              </Grid>
            </Grid>
          </Grid>
        </Cell>
      )
    }

    
      return null;
    
  }
}

export default Julekalender;


