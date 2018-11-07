// @flow

import axios from 'axios';

const organization = "knowit";
const token = '';

const fetchRepos = async () => {
  const repos = [];

  const endpoint = `https://api.github.com/orgs/${organization}/repos?per_page=256`;
  await axios.get(endpoint, { headers: { Authorization: `token ${token}` } }).then(response => {
    response.data.forEach(repo => {
      if (!repo.fork) repos.push(repo.name);
    });
  })
    .catch((error) => {
      console.log(error);
    });

  return repos;
};

const fetchContributors = async (repos, contributors) => {
  const endpoint = `https://api.github.com/repos/${organization}/${repos[0]}/stats/contributors`;
  await axios.get(endpoint, { headers: { Authorization: `token ${token}` } }).then(response => {
    contributors.push(response.data);
    if (repos.length === 1) {
      return contributors
    }
    repos.shift();
    return fetchContributors(repos, contributors);
  })
    .catch((error) => {
      console.log(error);
    });
  return contributors;
};

const calculateContributors = (contributors) => {
  const calculatedContributors = {};

  contributors.forEach(repo => {
    repo.forEach(contributor => {
      if (!calculatedContributors[contributor.author.login]) {
        calculatedContributors[contributor.author.login] = contributor.total;
      }
      else {
        calculatedContributors[contributor.author.login] += contributor.total;
      }
    });
  });

  return calculatedContributors
};

export const getGithubData = async () => {
  const repos = await fetchRepos();

  const contributors = await fetchContributors(repos, []);

  const calculatedContributors = calculateContributors(contributors);

  return calculatedContributors
};