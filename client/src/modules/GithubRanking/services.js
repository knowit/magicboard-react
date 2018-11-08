// @flow

import axios from 'axios';
import type { User, Organization } from "./types";

const token = 'ef6a4bd178dc469ba86a5c6b246a5c08fef9479e';

const fetchMemberAvatar = async (memberName: User) => {
  let avatarUrl = "";

  const headers = { Authorization: `token ${token}`, Accept: "application/vnd.github.cloak-preview"};
  const endpoint = `https://api.github.com/users/${memberName}`;
  await axios.get(endpoint, { headers }).then(response => {
    avatarUrl = response.data.avatar_url;
  })
    .catch((error) => {
      console.log(error);
    });
  return avatarUrl;
};

const fetchMemberCommits = async (memberName: string) => {
  let totalCommits = 0;

  const headers = { Authorization: `token ${token}`, Accept: "application/vnd.github.cloak-preview"};
  const endpoint = `https://api.github.com/search/commits?q=author:${memberName}`;
  await axios.get(endpoint, { headers }).then(response => {
    totalCommits = response.data.total_count;
  })
    .catch((error) => {
      console.log(error);
    });
  return totalCommits;
};

const fetchMembersData = async (argMembers, returnMembers) => {
  if(argMembers.length === 0){
    return returnMembers;
  }

  const member: User = argMembers[0];
  argMembers.shift();

  member.contributions = await fetchMemberCommits(member.name);
  member.avatar = await fetchMemberAvatar(member.name);
  returnMembers.push(member);

  return fetchMembersData(argMembers, returnMembers);
};

const fetchOrganizationMembers = async (organization: Organization) => {
  const members = [];

  const endpoint = `https://api.github.com/orgs/${organization.name}/members`;
  await axios.get(endpoint, { headers: { Authorization: `token ${token}` } }).then(response => {
    response.data.forEach(member => {
      const user: User = { name: member.login, contributions: 0};
      members.push(user);
    });
  })
    .catch((error) => {
      console.log(error);
    });

  return members;
};

export const getGithubData = async () => {
  const organization: Organization = { name: "knowit", members: []};
  organization.members = await fetchOrganizationMembers(organization).then(members => fetchMembersData(members, []));

  return organization;
};