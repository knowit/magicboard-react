/* eslint-disable no-console */
// @flow

import axios from 'axios';
import type { User, Organization } from './types';

const fetchMemberInfo = async (token: string, member: User) => {
  const info = { name: '', avatar: '' };

  const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.cloak-preview',
  };
  const endpoint = `https://api.github.com/users/${member.login}`;
  await axios
    .get(endpoint, { headers })
    .then(response => {
      info.name = response.data.name;
      info.avatar = response.data.avatar_url;
    })
    .catch(error => {
      console.log(error);
    });
  return info;
};

const fetchMemberCommits = async (token: string, member: User) => {
  let totalCommits = 0;

  const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.cloak-preview',
  };
  const endpoint = `https://api.github.com/search/commits?q=author:${
    member.login
  }`;
  await axios
    .get(endpoint, { headers })
    .then(response => {
      totalCommits = response.data.total_count;
    })
    .catch(error => {
      console.log(error);
    });
  return totalCommits;
};

const fetchMembersData = async (
  token: string,
  argMembers: Array<User>,
  returnMembers: Array<User>,
) => {
  if (argMembers.length === 0) {
    return returnMembers;
  }

  const newArgMembers = argMembers.slice();
  const newReturnMembers = returnMembers.slice();

  const member = newArgMembers[0];
  newArgMembers.shift();

  member.contributions = await fetchMemberCommits(token, member);
  const memberInfo = await fetchMemberInfo(token, member);
  member.name = memberInfo.name;
  member.avatar = memberInfo.avatar;
  newReturnMembers.push(member);

  return fetchMembersData(token, newArgMembers, newReturnMembers);
};

const fetchOrganizationMembers = async (
  token: string,
  organization: Organization,
) => {
  const members = [];

  const endpoint = `https://api.github.com/orgs/${organization.name}/members`;
  await axios
    .get(endpoint, { headers: { Authorization: `token ${token}` } })
    .then(response => {
      response.data.forEach(member => {
        const user: User = {
          login: member.login,
          name: '',
          contributions: 0,
          avatar: '',
        };
        members.push(user);
      });
    })
    .catch(error => {
      console.log(error);
    });

  return members;
};

const getTop10Members = (members: Array<User>) => {
  const returnMembers = members.slice();

  returnMembers.sort(
    (a, b) => parseFloat(b.contributions) - parseFloat(a.contributions),
  );
  return returnMembers.length > 10 ? returnMembers.slice(0, 10) : returnMembers;
};

export const getGithubData = async (
  organizationName: string,
  token: string,
) => {
  const organization: Organization = { name: organizationName, members: [] };
  organization.members = await fetchOrganizationMembers(token, organization)
    .then(members => fetchMembersData(token, members, []))
    .then(members => getTop10Members(members));

  return organization;
};
