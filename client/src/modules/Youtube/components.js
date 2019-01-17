// @flow
import styled from 'react-emotion';
import { fontSize, fontColor } from '../../styles/theme';

export const ColContainer = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 36px;
`;

export const RowContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 36px;
`;

export const IconContainer = styled('img')`
  max-height: ${fontSize.title};
  margin-right: 12px;
`;

export const Header = styled('div')`
  font-size: ${props => (props.small ? fontSize.small : fontSize.title)};
  width: 100%;
  border-bottom: ${props =>
    props.small ? `1px solid ${fontColor.primary}` : ''};
`;

export const SubHeader = styled('div')`
  font-size: ${fontSize.xsmall};
  width: 100%;
  text-align: center;
`;

export const VideoHeader = styled('div')`
  font-size: ${fontSize.xsmall};
  line-height: 1;
  margin: 8px;
`;

export const InfoContainer = styled('div')`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const ViewContainer = styled('div')`
  font-size: ${props => (props.small ? fontSize.xxsmall : fontSize.xsmall)};
  margin-left: ${props => (props.small ? '8px' : '24px')};
  line-height: 1;
`;

export const LikeContainer = styled('div')`
  font-size: ${props => (props.small ? fontSize.xxsmall : fontSize.xsmall)};
  margin-right: ${props => (props.small ? '20px' : '24px')};
  line-height: 1;
`;

export const VideoList = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const VideoContainer = styled('div')`
  display: flex;
  flex-direction: row;
  margin: 12px;
  margin-bottom: 24px;
  width: 100%;
`;

export const ImageContainer = styled('img')`
  margin-right: 4px;
`;

export const VideoInfoContainer = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;
