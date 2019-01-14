// @flow

import config from '../Jira/config';
import { Issue } from './types';

const getStateData = data => {
  const issueArray: Issue[] = [];
  for (let i = 0; i < data.issues.length; i += 1) {
    if (!['Rejected', 'Done'].includes(data.issues[i].fields.status.name)) {
      issueArray.push({
        summary: data.issues[i].fields.summary,
        description: data.issues[i].fields.description,
        votes: data.issues[i].fields.votes.votes,
      });
    }
  }
  return issueArray;
};

export const fetchJiraIssues = (projectKey: string, auth: string) => {
  const URL = `https://${
    config.baseUrl
  }/rest/api/2/search?jql=project=${projectKey}+order+by+votes&fields=summary,description,votes,status&maxResults=10000`;

  return fetch(config.proxyUrl + URL, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => getStateData(data));
};

/* export const fetchProjectName = (projectKey: string, auth: string) => {
    const URL = `https://${
        config.baseUrl
        }/rest/api/2/project/${projectKey}`;

    return fetch(config.proxyUrl + URL, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
}; */
