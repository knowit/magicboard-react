// @flow
import styled from 'react-emotion';
import { fontSize, fontColor } from '../../styles/website_theme';

export const ColContainer = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const RowContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const Header = styled('div')`
  font-size: ${fontSize.title};
  width: 100%;
`;

export const SubHeader = styled('div')`
  font-size: ${fontSize.small};
  width: 100%;
  border-bottom: ${`1px solid ${fontColor.primary}`};
`;

export const Grid = styled('div')`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(2, 1fr);
  margin: 8px;
`;

export const ImageContainer = styled('img')`
  width: 100%;
  height: 100px;
  overflow: hidden;
`;

export const ProfileImageContainer = styled('img')`
  border-radius: 50%;
  max-height: ${fontSize.small};
  margin-right: 4px;
`;

export const ClapImageContainer = styled('img')`
  max-height: ${fontSize.small};
  margin-right: 4px;
`;

export const Title = styled('div')`
  font-size: ${fontSize.xsmall};
  line-height: 1;
`;

export const SubTitle = styled('div')`
  font-size: ${fontSize.xxsmall};
  line-height: 1;
`;

export const InfoContainer = styled('div')`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: space-between;
  margin-top: 12px;
`;

export const ItemContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
