// @flow
import styled from 'react-emotion';
import { fontSize, fontColor } from '../../styles/theme';

export const MainContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 36px;
`;

export const Header = styled('div')`
  font-size: ${fontSize.title};
  width: 100%;
  text-align: center;
  line-height: 1;
  padding: 16px;
`;

export const SubHeader = styled('div')`
  font-size: ${fontSize.small};
  line-height: 1;
  padding: 16px;
`;

export const IssueList = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const IssueContainer = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 24px;
  margin-bottom: 16px;
  border-style: solid;
  border-width: 4px;
  border-color: ${fontColor.tertiary};
  border-radius: 10px;
`;

export const RowContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const IssueSummary = styled('div')`
  font-size: ${fontSize.xsmall};
`;

export const IssueDescription = styled('div')`
  font-size: ${fontSize.xxsmall};
  line-height: 1;
  width: 70%;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* number of lines to show */
`;
