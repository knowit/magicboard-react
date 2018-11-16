// @flow
import moment from 'moment';
import { Mode } from './types';

const AUTH = 'Basic c2FsZy1zdGF0aXN0aWtrOnJnRFU3NVptWlJXbkRkRg=='; // Access to https://support.knowit.no, user: salg-statistikk
const PROXYURL = 'https://aqueous-oasis-75157.herokuapp.com/'; // Owned by bjornar.dalsnes@knowit.no

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
const filterIssues = (issues: ?(Object[]), year: number) => {
  const filteredIssues: ?(Object[]) = [];

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

const fetchJiraIssues = (projectKey: string, year: number) => {
  const URL = `https://support.knowit.no/rest/api/2/search?jql=project=${projectKey}&fields=status,created&status/name=Rejected&maxResults=10000`;

  return fetch(PROXYURL + URL, {
    method: 'GET',
    headers: {
      Authorization: AUTH,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => filterIssues(data.issues, year));
};

const generateMonthData = (projectKey: string, year: number) =>
  fetchJiraIssues(projectKey, year).then(issues => {
    const issuesPerMonth: number[] = new Array(12).fill(0);

    for (let i = 0; i < issues.length; i += 1) {
      const date = new Date(issues[i].fields.created);
      issuesPerMonth[date.getMonth()] += 1;
    }
    return issuesPerMonth;
  });

const generateWeekData = (projectKey: string, year: number) =>
  fetchJiraIssues(projectKey, year).then(issues => {
    const issuesPerWeek: number[] = new Array(53).fill(0);

    for (let i = 0; i < issues.length; i += 1) {
      const momentDate = moment(issues[i].fields.created); // moment has to be used to get week number
      issuesPerWeek[momentDate.week()] += 1;
    }
    return issuesPerWeek;
  });

const generateStatusData = (projectKey: string, year: number) =>
  fetchJiraIssues(projectKey, year).then(issues => {
    const issuesPerStatus: number[] = [];
    const xLabels: string[] = [];

    for (let i = 0; i < issues.length; i += 1) {
      if (!xLabels.includes(issues[i].fields.status.name)) {
        xLabels.push(issues[i].fields.status.name);
        issuesPerStatus.push(0);
      }
      issuesPerStatus[xLabels.indexOf(issues[i].fields.status.name)] += 1;
    }
    return { issuesPerStatus, xLabels };
  });

export const generateChartData = (
  projectKey: string,
  year: number,
  mode: Mode,
) => {
  let issuesPromise;
  let xLabels;

  if (mode === Mode.WEEK) {
    issuesPromise = generateWeekData(projectKey, year);
    xLabels = [...Array(54).keys()].slice(1); // [1...53], week numbers
  } else if (mode === Mode.MONTH) {
    issuesPromise = generateMonthData(projectKey, year);
    xLabels = MONTHS;
  } else if (mode === Mode.STATUS) {
    issuesPromise = generateStatusData(projectKey, year);
  }

  return issuesPromise.then(issueCount => {
    const data = {
      labels: mode !== Mode.STATUS ? xLabels : issueCount.xLabels,
      datasets: [
        {
          label:
            mode !== Mode.STATUS
              ? `Antall anbud i ${year}`
              : `Status på anbud i ${year}`,
          backgroundColor: 'rgba(65, 149, 165, 0.2)',
          borderColor: 'rgb(65, 149, 165)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: mode !== Mode.STATUS ? issueCount : issueCount.issuesPerStatus,
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              fontSize: 14,
              fontColor: 'white',
            },
          },
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              fontSize: 20,
              fontColor: 'white',
            },
          },
        ],
      },
      legend: {
        labels: {
          // This more specific font property overrides the global property
          fontColor: 'white',
          fontSize: 18,
        },
      },
    };
    return { data, options };
  });
};
