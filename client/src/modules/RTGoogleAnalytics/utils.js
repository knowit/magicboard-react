// @flow
import type { RealTimeResult } from '../../ouath2/index';

export const parseRTData = (data: RealTimeResult) => {
  const parsed = {
    currentActiveUsers: data.totalsForAllResults['rt:activeUsers'],
    deviceCategory: {
      desktop: data.rows[0] ? data.rows[0][1] : 0,
      mobile: data.rows[1] ? data.rows[1][1] : 0,
      tablet: data.rows[2] ? data.rows[2][1] : 0,
    },
  };
  return parsed;
};

export const calculatePercentage = (
  categories: { desktop: string, mobile: string, tablet: string },
  total: number,
) => ({
  desktop: Math.round((parseInt(categories.desktop, 10) / total) * 100),
  mobile: Math.round((parseInt(categories.mobile, 10) / total) * 100),
  tablet: Math.round((parseInt(categories.tablet, 10) / total) * 100),
});
