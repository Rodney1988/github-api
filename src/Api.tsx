import { Octokit } from 'octokit';
import { GithubUser } from './types/userTypes';
import { GithubRepo } from './types/repoTypes';

const octokit = new Octokit();

export const fetchGithubUsers = async (
  name: string | null,
  followers: string | null
) => {
  const usersResponse = await octokit.rest.search.users({
    q: `${name}+followers:>${followers}`,
    per_page: 5,
  });
  return usersResponse.data.items as GithubUser[];
};

export const getRepos = async (name: string, page: number) => {
  const response = await octokit.rest.repos.listForUser({
    username: name,
    per_page: 2,
    page: page,
  });
  return response.data as GithubRepo[];
};
