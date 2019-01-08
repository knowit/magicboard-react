// @flow
import React from 'react';
import TextLoop from 'react-text-loop';
import type { Props, State } from './types';
import { Cell } from '../../containers';
import { fetchJiraIssues } from './services';
import {
  MainContainer,
  Header,
  SubHeader,
  RowContainer,
  IssueList,
  IssueContainer,
  IssueSummary,
  IssueDescription,
} from './components';

const DATA_INTERVAL = 1000 * 60 * 60;
const ROTATE_INTERVAL = 1000 * 20;

class JiraBoard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      issues: undefined,
      issueIndex: 0,
    };
  }

  componentDidMount() {
    this.dataTick();

    this.dataInterval = setInterval(this.dataTick, DATA_INTERVAL);
    this.rotateInterval = setInterval(this.rotateTick, ROTATE_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.dataInterval);
    clearInterval(this.rotateInterval);
  }

  dataTick = () => {
    fetchJiraIssues(this.props.projectKey, this.props.auth).then(data => {
      this.setState({
        issues: data,
      });
    });
  };

  rotateTick = () => {
    this.setState(prevState => ({
      issueIndex:
        prevState.issueIndex < prevState.issues.length - this.props.maxIssues
          ? prevState.issueIndex + this.props.maxIssues
          : 0,
    }));
  };

  dataInterval: *;

  rotateInterval: *;

  render() {
    const issueItems = [];

    if (this.state.issues) {
      for (
        let i = this.state.issueIndex;
        i <
        Math.min(
          this.state.issues.length,
          this.props.maxIssues + this.state.issueIndex,
        );
        i += 1
      ) {
        issueItems.push(
          <IssueContainer key={i}>
            <RowContainer>
              <IssueSummary>{this.state.issues[i].summary}</IssueSummary>
              <IssueSummary>{`Votes: ${
                this.state.issues[i].votes
              }`}</IssueSummary>
            </RowContainer>
            <IssueDescription>
              {this.state.issues[i].description}
            </IssueDescription>
          </IssueContainer>,
        );
      }
    } else {
      return (
        <Cell row={this.props.row} column={this.props.column}>
          <div>Loading...</div>
        </Cell>
      );
    }

    return (
      <Cell row={this.props.row} column={this.props.column}>
        <MainContainer>
          <Header>{this.props.header}</Header>
          <TextLoop interval={10000} mask={1}>
            <SubHeader>{this.props.subheader[0]}</SubHeader>
            <SubHeader>{this.props.subheader[1]}</SubHeader>
          </TextLoop>
          <IssueList>{issueItems}</IssueList>
        </MainContainer>
      </Cell>
    );
  }
}

export default JiraBoard;
