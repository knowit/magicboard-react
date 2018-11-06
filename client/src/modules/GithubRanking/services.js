// @flow

import axios from 'axios';

const organization = "knowit";

const fetchRepos = async () => {
  const repos = [];

  const endpoint = `https://api.github.com/orgs/${organization}/repos?per_page=256`;
  const token = '';
  await axios.get(endpoint, { headers: { Authorization: token } }).then(response => {
    response.data.forEach(repo => {
      repos.push(repo.name);
    });
  })
    .catch((error) => {
      console.log(error);
    });

  return repos;
};

const fetchCommits = async (repos) => {
  const personCommits = {};

  repos.forEach(repo => {
    const endpoint = `https://api.github.com/repos/${organization}/${repo}/stats/contributors`;
    const token = '6e1d16608cc6555cc3ac43b6eb1b7e8f636f0064';
    axios.get(endpoint, { headers: { Authorization: token } }).then(response => {
      /* response.data.forEach(person => {

        if (!personCommits[person.author.login]) {
          personCommits[person.author.login] = person.total;
        } else {
          personCommits[person.author.login] += person.total;
        }
      });*/

      console.log(response);
    })
      .catch((error) => {
        console.log(error);
      });
  });

  return personCommits;
};

export const getGithubData = async () => fetchRepos().then(repos => {fetchCommits(repos)});