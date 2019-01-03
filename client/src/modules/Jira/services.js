// @flow
import moment from 'moment';
import { Mode } from './types';
import { dataObject } from './options';
import type { Issue } from './types';
import config from './config';

const MONTHS = [
  'Januar',
  'Februar',
  'Mars',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Desember',
];

// Excludes statuses "Rejected" and "Done" from the issues and issues from other years
const filterIssues = (issues: Issue[], year: number) => {
  const filteredIssues: Issue[] = [];
  for (let i = 0; i < issues.length; i += 1) {
    const date = new Date(issues[i].fields.created);
    if (
      !['Rejected', 'Done'].includes(issues[i].fields.status.name) &&
      date.getFullYear() === year
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

const generateMonthData = (projectKey: string, year: number, auth: string) =>
  fetchJiraIssues(projectKey, year, auth).then((issues: Issue[]) => {
    const issuesPerMonth: number[] = new Array(12).fill(0);

    for (let i = 0; i < issues.length; i += 1) {
      const date = new Date(issues[i].fields.created);
      issuesPerMonth[date.getMonth()] += 1;
    }

    const monthObj = { ...dataObject };
    monthObj.label = `Antall anbud i ${year}`;
    monthObj.data = issuesPerMonth;
    return monthObj;
  });

const generateWeekData = (projectKey: string, year: number, auth: string) =>
  fetchJiraIssues(projectKey, year, auth).then((issues: Issue[]) => {
    const issuesPerWeek: number[] = new Array(53).fill(0);

    for (let i = 0; i < issues.length; i += 1) {
      const momentDate = moment(issues[i].fields.created); // moment has to be used to get week number
      issuesPerWeek[momentDate.week() - 1] += 1;
    }

    const weekObj = { ...dataObject };
    weekObj.label = `Antall anbud i ${year}`;
    weekObj.data = issuesPerWeek;
    return weekObj;
  });

const generateStatusData = (projectKey: string, year: number, auth: string) =>
  fetchJiraIssues(projectKey, year, auth).then((issues: Issue[]) => {
    const issuesPerStatus: number[] = [];
    const xLabels: string[] = [];
    for (let i = 0; i < issues.length; i += 1) {
      if (!xLabels.includes(issues[i].fields.status.name)) {
        xLabels.push(issues[i].fields.status.name);
        issuesPerStatus.push(0);
      }
      issuesPerStatus[xLabels.indexOf(issues[i].fields.status.name)] += 1;
    }

    const statusObj = { ...dataObject };
    statusObj.label = `Status på anbud i ${year}`;
    statusObj.data = issuesPerStatus;
    return { statusObj, xLabels };
  });

export const generateChartData = (
  projectKey: string,
  year: number,
  mode: Mode,
  auth: string,
) => {
  switch (mode) {
    case Mode.MONTH: {
      const issuesTimePromise = generateMonthData(projectKey, year, auth);
      return issuesTimePromise.then(issueData => ({
        labels: MONTHS,
        datasets: [issueData],
      }));
    }
    case Mode.WEEK: {
      const issuesTimePromise = generateWeekData(projectKey, year, auth);
      return issuesTimePromise.then(issueData => ({
        labels: [...Array(54).keys()].slice(1).map(String), // [1...53], week numbers
        datasets: [issueData],
      }));
    }
    case Mode.STATUS: {
      const issuesStatusPromise = generateStatusData(projectKey, year, auth);
      return issuesStatusPromise.then(issueData => ({
        labels: issueData.xLabels,
        datasets: [issueData.statusObj],
      }));
    }
    default: {
      const issuesStatusPromise = generateStatusData(projectKey, year, auth);
      return issuesStatusPromise.then(issueData => ({
        labels: issueData.xLabels,
        datasets: [issueData.statusObj],
      }));
    }
  }
};
