import {Component} from "react";
import React from "react";
import styled from "react-emotion";
import {Cell, Header} from "../Calendar/components";
import {Grid} from "../../containers";
import {fontSize, margin} from "../../styles/theme";
import LaughingSanta from './laughingSanta';

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
    row: 'span 8',
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
    getNumberOfCorrectAnswers().then((numbCorrectAnwswers) => {
      this.setState({
        numbCorrectAnwswers
      })
    });

    getNumberOfUsers().then((numbUsers) => {
      this.setState({
        numbUsers
      })
    });

    this.numberOfCorrectAnswersInterval = setInterval(
      () => {
        getNumberOfCorrectAnswers().then((numbCorrectAnwswers) => {
          this.setState({
            numbCorrectAnwswers
          })
        })
      },
      1000 * SECOND,
    );

    this.numberOfUsersInterval = setInterval(
      () => {
        getNumberOfUsers().then((numbUsers) => {
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
    const {numbUsers, numbCorrectAnwswers} = this.state;


    if (numbUsers && numbCorrectAnwswers) {
      return (
        <Cell row={this.props.row} column={this.props.column}>
          <Grid nested row="repeat(7,1fr)" column="repeat(2, 1fr)">
            <Cell row="span 1" column="span 2" background="transparent" center>
              <Header align="center"><RedSpan>Jule</RedSpan>kale<GreenSpan>nder</GreenSpan></Header>
            </Cell>

            <Cell row="span 1" column="span 1" background="transparent" center>
              <HeaderFont align="center">Users</HeaderFont>
            </Cell>
            <Cell row="span 1" column="span 1" background="transparent" center>
              <HeaderFont align="center">Completed luker</HeaderFont>
            </Cell>

            <Cell row="span 1" column="span 1" background="transparent" center>
              <Active align="center">{numbUsers}</Active>
            </Cell >
            <Cell row="span 1" column="span 1" background="transparent" center>
              <Active align="center">{numbCorrectAnwswers}</Active>
            </Cell>

            <Cell row="span 2" column="span 2" background="transparent">
              <LaughingSanta/>
            </Cell>
          </Grid>
        </Cell>
      )
    }

    
      return null;
    
  }
}

export default Julekalender;


