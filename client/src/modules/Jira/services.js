// @flow
import moment from 'moment';
import { dataObject } from './options';
import { Mode } from './types';
import type { Issue } from './types';
import config from './config';

// Excludes statuses "Rejected" and "Done" from the issues and issues from other years
const filterIssues = (issues: Issue[], numMonths: number) => {
  const filteredIssues: Issue[] = [];
  for (let i = 0; i < issues.length; i += 1) {
    const date = moment(issues[i].fields.created);
    if (
      !['Rejected', 'Done'].includes(issues[i].fields.status.name) &&
      date.isAfter(moment().subtract(numMonths, 'months'))
    ) {
      filteredIssues.push(issues[i]);
    }
  }
  return filteredIssues;
};

const fetchJiraIssues = (projectKey: string, year: number, auth: string) => {
  const URL = `https://${
    config.baseUrl
  }/rest/api/2/search?jql=project=${projectKey}&fields=status,created&status/name=Rejected&maxResults=10000`;

  return fetch(config.proxyUrl + URL, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => filterIssues(data.issues, year));
};

const generateTimeData = (issues: Issue[], numMonths: number) => {
  const startDate = moment(issues[issues.length - 1].fields.created);
  const endDate = moment(issues[0].fields.created);

  const xLabels: string[] = [startDate.format('W')];
  const issuesPerTime = new Array(endDate.diff(startDate, 'weeks') + 1).fill(0);

  while (startDate.add(1, 'weeks').diff(endDate) < 0) {
    xLabels.push(startDate.format('W'));
  }

  for (let i = 0; i < issues.length; i += 1) {
    const date = moment(issues[i].fields.created);
    issuesPerTime[xLabels.indexOf(date.format('W'))] += 1;
  }

  const timeObject = { ...dataObject };
  timeObject.label = `Antall anbud per uke siste ${numMonths} måneder`;
  timeObject.data = issuesPerTime;
  return { xLabels, timeObject };
};

const generateStatusData = (issues: Issue[], numMonths: number) => {
  const issuesPerStatus: number[] = [];
  const xLabels: string[] = [];
  for (let i = 0; i < issues.length; i += 1) {
    if (!xLabels.includes(issues[i].fields.status.name)) {
      xLabels.push(issues[i].fields.status.name);
      issuesPerStatus.push(0);
    }
    issuesPerStatus[xLabels.indexOf(issues[i].fields.status.name)] += 1;
  }

  const statusObject = { ...dataObject };
  statusObject.label = `Status på anbud siste ${numMonths} måneder`;
  statusObject.data = issuesPerStatus;
  return { xLabels, statusObject };
};

export const generateChartData = (
  projectKey: string,
  numMonths: number,
  auth: string,
) => {
  const data = {};

  return fetchJiraIssues(projectKey, numMonths, auth).then(issues => {
    const timeData = generateTimeData(issues, numMonths);
    data[Mode.TIME] = {
      labels: timeData.xLabels,
      datasets: [timeData.timeObject],
    };

    const statusData = generateStatusData(issues, numMonths);
    data[Mode.STATUS] = {
      labels: statusData.xLabels,
      datasets: [statusData.statusObject],
    };

    return data;
  });
};
